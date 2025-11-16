#!/usr/bin/env python3
"""
Codebase Indexing Script for Milvus

This script indexes your source code files into Milvus vector database
to enable semantic code search across all AI assistants.

Usage:
    python scripts/index-codebase.py

Requirements:
    pip install pymilvus sentence-transformers
"""

import os
import sys
from pathlib import Path
from typing import List, Dict, Tuple
from pymilvus import (
    connections,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
    utility
)
from sentence_transformers import SentenceTransformer

# Configuration
MILVUS_HOST = "localhost"
MILVUS_PORT = "19530"
COLLECTION_NAME = "wisewealth_codebase"
EMBEDDING_DIM = 384  # all-MiniLM-L6-v2 dimension

# Project root directory
PROJECT_ROOT = Path(__file__).parent.parent

# File extensions to index
CODE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.py', '.json']

# Directories to index
CODE_DIRS = ['src', 'scripts']

# Directories to exclude
EXCLUDE_DIRS = [
    'node_modules',
    'dist',
    'build',
    '.next',
    'coverage',
    '__pycache__',
    '.git',
    'volumes'
]

def init_milvus():
    """Initialize connection to Milvus and create collection if needed."""
    print("Connecting to Milvus...")
    connections.connect("default", host=MILVUS_HOST, port=MILVUS_PORT)
    print(f"✓ Connected to Milvus at {MILVUS_HOST}:{MILVUS_PORT}")

    # Check if collection exists
    if utility.has_collection(COLLECTION_NAME):
        print(f"Collection '{COLLECTION_NAME}' already exists. Dropping it...")
        collection = Collection(COLLECTION_NAME)
        collection.drop()

    # Create collection schema
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name="file_path", dtype=DataType.VARCHAR, max_length=500),
        FieldSchema(name="content", dtype=DataType.VARCHAR, max_length=10000),
        FieldSchema(name="file_type", dtype=DataType.VARCHAR, max_length=20),
        FieldSchema(name="line_start", dtype=DataType.INT32),
        FieldSchema(name="line_end", dtype=DataType.INT32),
        FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=EMBEDDING_DIM)
    ]

    schema = CollectionSchema(
        fields=fields,
        description="WiseWealth codebase index"
    )

    print(f"Creating collection '{COLLECTION_NAME}'...")
    collection = Collection(name=COLLECTION_NAME, schema=schema)

    # Create index for vector field
    print("Creating vector index...")
    index_params = {
        "metric_type": "L2",
        "index_type": "IVF_FLAT",
        "params": {"nlist": 128}
    }
    collection.create_index(field_name="embedding", index_params=index_params)

    print("✓ Collection created successfully")
    return collection

def should_process_file(file_path: Path) -> bool:
    """Check if file should be processed."""
    # Check extension
    if file_path.suffix not in CODE_EXTENSIONS:
        return False

    # Check if in excluded directory
    for exclude_dir in EXCLUDE_DIRS:
        if exclude_dir in file_path.parts:
            return False

    return True

def split_into_chunks(content: str, max_chars: int = 2000) -> List[Tuple[str, int, int]]:
    """
    Split file content into chunks.
    Returns list of (chunk_text, start_line, end_line)
    """
    lines = content.split('\n')
    chunks = []
    current_chunk = []
    current_chars = 0
    start_line = 1

    for i, line in enumerate(lines, 1):
        line_chars = len(line)

        if current_chars + line_chars > max_chars and current_chunk:
            # Save current chunk
            chunks.append((
                '\n'.join(current_chunk),
                start_line,
                i - 1
            ))
            # Start new chunk
            current_chunk = [line]
            current_chars = line_chars
            start_line = i
        else:
            current_chunk.append(line)
            current_chars += line_chars

    # Add last chunk
    if current_chunk:
        chunks.append((
            '\n'.join(current_chunk),
            start_line,
            len(lines)
        ))

    return chunks

def process_file(file_path: Path, model: SentenceTransformer) -> List[Dict]:
    """Process a single file and return list of entries to index."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"✗ Error reading {file_path}: {e}")
        return []

    # Get relative path from project root
    rel_path = file_path.relative_to(PROJECT_ROOT)

    # Split into chunks
    chunks = split_into_chunks(content)

    entries = []
    for chunk_content, start_line, end_line in chunks:
        # Generate embedding
        embedding = model.encode(chunk_content).tolist()

        entry = {
            'file_path': str(rel_path),
            'content': chunk_content[:9999],  # Limit to VARCHAR max length
            'file_type': file_path.suffix,
            'line_start': start_line,
            'line_end': end_line,
            'embedding': embedding
        }
        entries.append(entry)

    return entries

def index_codebase():
    """Main function to index the entire codebase."""
    print("=" * 60)
    print("WiseWealth Codebase Indexing")
    print("=" * 60)

    # Initialize Milvus
    collection = init_milvus()

    # Load embedding model
    print("\nLoading embedding model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("✓ Model loaded")

    # Find all files to index
    print("\nScanning for code files...")
    files_to_index = []

    for code_dir in CODE_DIRS:
        dir_path = PROJECT_ROOT / code_dir
        if not dir_path.exists():
            print(f"⚠ Directory {code_dir} not found, skipping...")
            continue

        for file_path in dir_path.rglob('*'):
            if file_path.is_file() and should_process_file(file_path):
                files_to_index.append(file_path)

    print(f"✓ Found {len(files_to_index)} files to index")

    # Process files
    print("\nIndexing files...")
    all_entries = []

    for i, file_path in enumerate(files_to_index, 1):
        rel_path = file_path.relative_to(PROJECT_ROOT)
        print(f"[{i}/{len(files_to_index)}] Processing {rel_path}...")

        entries = process_file(file_path, model)
        all_entries.extend(entries)
        print(f"  ✓ Added {len(entries)} chunks")

    # Insert into Milvus
    if all_entries:
        print(f"\nInserting {len(all_entries)} entries into Milvus...")

        # Prepare data for insertion
        data = [
            [entry['file_path'] for entry in all_entries],
            [entry['content'] for entry in all_entries],
            [entry['file_type'] for entry in all_entries],
            [entry['line_start'] for entry in all_entries],
            [entry['line_end'] for entry in all_entries],
            [entry['embedding'] for entry in all_entries],
        ]

        collection.insert(data)
        collection.flush()
        print("✓ Data inserted successfully")

        # Load collection to memory
        print("Loading collection...")
        collection.load()
        print("✓ Collection loaded")

        # Print stats
        print("\n" + "=" * 60)
        print("Indexing Complete!")
        print("=" * 60)
        print(f"Total files indexed: {len(files_to_index)}")
        print(f"Total chunks created: {len(all_entries)}")
        print(f"Collection name: {COLLECTION_NAME}")
        print(f"Embedding dimension: {EMBEDDING_DIM}")
        print("\nYou can now use semantic search across all AI assistants!")
    else:
        print("\n⚠ No files were indexed")

    connections.disconnect("default")

if __name__ == "__main__":
    try:
        index_codebase()
    except KeyboardInterrupt:
        print("\n\n✗ Indexing cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ Error during indexing: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
