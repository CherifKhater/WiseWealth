#!/usr/bin/env python3
"""
Documentation Indexing Script for Milvus

This script indexes your project documentation files into Milvus vector database
to enable semantic documentation search across all AI assistants.

Usage:
    python scripts/index-docs.py

Requirements:
    pip install pymilvus sentence-transformers
"""

import os
import sys
import re
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
COLLECTION_NAME = "wisewealth_docs"
EMBEDDING_DIM = 384  # all-MiniLM-L6-v2 dimension

# Project root directory
PROJECT_ROOT = Path(__file__).parent.parent

# Documentation files to index (relative to project root)
DOC_FILES = [
    '_PROJECT_CONTEXT.md',
    '_CODEBASE_INDEX.md',
    '_INDEXING_STRATEGY.md',
    '_SYNC_SUMMARY.md',
    '_MILVUS_MCP_GUIDE.md',
    'README.md',
    'CLAUDE.md',
    'GEMINI.md',
    'AGENTS.md'
]

# Also index any markdown files in docs/ directory
DOC_DIRS = ['docs']

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
        FieldSchema(name="section_title", dtype=DataType.VARCHAR, max_length=500),
        FieldSchema(name="content", dtype=DataType.VARCHAR, max_length=10000),
        FieldSchema(name="doc_type", dtype=DataType.VARCHAR, max_length=50),
        FieldSchema(name="heading_level", dtype=DataType.INT32),
        FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=EMBEDDING_DIM)
    ]

    schema = CollectionSchema(
        fields=fields,
        description="WiseWealth documentation index"
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

def split_by_sections(content: str, file_path: Path) -> List[Tuple[str, str, int]]:
    """
    Split markdown content by sections.
    Returns list of (section_title, content, heading_level)
    """
    sections = []
    current_section = []
    current_title = file_path.stem
    current_level = 0

    lines = content.split('\n')

    for line in lines:
        # Check for markdown heading
        heading_match = re.match(r'^(#{1,6})\s+(.+)$', line)

        if heading_match:
            # Save previous section
            if current_section:
                sections.append((
                    current_title,
                    '\n'.join(current_section).strip(),
                    current_level
                ))

            # Start new section
            level = len(heading_match.group(1))
            title = heading_match.group(2).strip()
            current_title = title
            current_level = level
            current_section = [line]
        else:
            current_section.append(line)

    # Add last section
    if current_section:
        sections.append((
            current_title,
            '\n'.join(current_section).strip(),
            current_level
        ))

    return sections

def process_doc_file(file_path: Path, model: SentenceTransformer) -> List[Dict]:
    """Process a documentation file and return list of entries to index."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"✗ Error reading {file_path}: {e}")
        return []

    # Get relative path from project root
    rel_path = file_path.relative_to(PROJECT_ROOT)

    # Determine doc type
    doc_type = "general"
    if "_PROJECT_CONTEXT" in file_path.name:
        doc_type = "project_context"
    elif "_CODEBASE_INDEX" in file_path.name:
        doc_type = "codebase_index"
    elif "_INDEXING_STRATEGY" in file_path.name:
        doc_type = "indexing_strategy"
    elif "_MILVUS_MCP_GUIDE" in file_path.name:
        doc_type = "milvus_guide"
    elif "README" in file_path.name:
        doc_type = "readme"

    # Split into sections
    sections = split_by_sections(content, file_path)

    entries = []
    for section_title, section_content, heading_level in sections:
        # Skip very short sections
        if len(section_content) < 50:
            continue

        # Truncate content if too long
        truncated_content = section_content[:9999]

        # Generate embedding
        embedding = model.encode(section_content).tolist()

        entry = {
            'file_path': str(rel_path),
            'section_title': section_title[:499],
            'content': truncated_content,
            'doc_type': doc_type,
            'heading_level': heading_level,
            'embedding': embedding
        }
        entries.append(entry)

    return entries

def index_docs():
    """Main function to index all documentation."""
    print("=" * 60)
    print("WiseWealth Documentation Indexing")
    print("=" * 60)

    # Initialize Milvus
    collection = init_milvus()

    # Load embedding model
    print("\nLoading embedding model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("✓ Model loaded")

    # Find all documentation files
    print("\nScanning for documentation files...")
    files_to_index = []

    # Add specified doc files
    for doc_file in DOC_FILES:
        file_path = PROJECT_ROOT / doc_file
        if file_path.exists():
            files_to_index.append(file_path)
        else:
            print(f"⚠ {doc_file} not found, skipping...")

    # Add files from doc directories
    for doc_dir in DOC_DIRS:
        dir_path = PROJECT_ROOT / doc_dir
        if dir_path.exists():
            for file_path in dir_path.rglob('*.md'):
                if file_path not in files_to_index:
                    files_to_index.append(file_path)

    print(f"✓ Found {len(files_to_index)} documentation files")

    # Process files
    print("\nIndexing documentation...")
    all_entries = []

    for i, file_path in enumerate(files_to_index, 1):
        rel_path = file_path.relative_to(PROJECT_ROOT)
        print(f"[{i}/{len(files_to_index)}] Processing {rel_path}...")

        entries = process_doc_file(file_path, model)
        all_entries.extend(entries)
        print(f"  ✓ Added {len(entries)} sections")

    # Insert into Milvus
    if all_entries:
        print(f"\nInserting {len(all_entries)} entries into Milvus...")

        # Prepare data for insertion
        data = [
            [entry['file_path'] for entry in all_entries],
            [entry['section_title'] for entry in all_entries],
            [entry['content'] for entry in all_entries],
            [entry['doc_type'] for entry in all_entries],
            [entry['heading_level'] for entry in all_entries],
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
        print(f"Total sections created: {len(all_entries)}")
        print(f"Collection name: {COLLECTION_NAME}")
        print(f"Embedding dimension: {EMBEDDING_DIM}")
        print("\nYou can now search documentation across all AI assistants!")

        # Print breakdown by doc type
        print("\nBreakdown by document type:")
        doc_types = {}
        for entry in all_entries:
            doc_type = entry['doc_type']
            doc_types[doc_type] = doc_types.get(doc_type, 0) + 1

        for doc_type, count in sorted(doc_types.items()):
            print(f"  {doc_type}: {count} sections")
    else:
        print("\n⚠ No documentation was indexed")

    connections.disconnect("default")

if __name__ == "__main__":
    try:
        index_docs()
    except KeyboardInterrupt:
        print("\n\n✗ Indexing cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ Error during indexing: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
