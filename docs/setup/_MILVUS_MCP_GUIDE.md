# Milvus MCP Setup Guide

<!-- Version: 1.0 | Last Updated: 2025-11-16 -->

> **Purpose**: Complete guide for setting up Milvus vector database with MCP server to enable shared codebase indexing across all AI assistants (Claude Code, Cursor, Cline, Gemini CLI).

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Install Milvus Database](#phase-1-install-milvus-database)
4. [Phase 2: Install Milvus MCP Server](#phase-2-install-milvus-mcp-server)
5. [Phase 3: Configure AI Assistants](#phase-3-configure-ai-assistants)
6. [Phase 4: Index Your Codebase](#phase-4-index-your-codebase)
7. [Usage Examples](#usage-examples)
8. [Troubleshooting](#troubleshooting)
9. [Maintenance](#maintenance)

---

## 🎯 Overview

### What This Setup Provides

**Shared Vector Database**: All AI assistants query the same Milvus database
- Semantic code search across all tools
- Consistent context retrieval
- Better understanding of large codebases
- Natural language queries

### Architecture

```
Your Codebase
     ↓ (indexed by scripts)
Milvus Vector Database (Docker)
     ↓ (accessed via MCP)
┌────┼────┬────┬────┐
│    │    │    │    │
Claude Cursor Cline Gemini
Code   IDE  (VSCode) CLI
```

All assistants use the **same MCP server** connecting to the **same Milvus instance**.

---

## ✅ Prerequisites

### Required Software

- **Docker Desktop**: [Download](https://www.docker.com/products/docker-desktop)
  - Version 20.10+ required
  - Ensure Docker is running before setup

- **Python 3.10+**: [Download](https://www.python.org/downloads/)
  - Check version: `python3 --version`

- **Node.js 18+**: [Download](https://nodejs.org/)
  - Required for Gemini CLI
  - Check version: `node --version`

- **Git**: Should already be installed
  - Check version: `git --version`

### Optional but Recommended

- **uv** (Python package installer): `pip install uv`
  - Faster than pip, recommended by Milvus MCP team

---

## 🚀 Phase 1: Install Milvus Database

### Step 1: Start Milvus with Docker Compose

The `docker-compose.yml` file in the project root contains the complete Milvus setup.

```bash
# Navigate to project root
cd /Users/cherifkhater/AIProjects/FinalProjects/WiseWealth

# Start Milvus (downloads images on first run)
docker-compose up -d

# Verify all containers are running
docker-compose ps

# Expected output:
# milvus-standalone  running  0.0.0.0:19530->19530/tcp
# milvus-etcd        running
# milvus-minio       running  0.0.0.0:9000-9001->9000-9001/tcp
```

### Step 2: Verify Milvus is Running

```bash
# Check Milvus health
curl http://localhost:9091/healthz

# Expected output: OK or similar health check response

# View Milvus logs
docker logs milvus-standalone
```

### Step 3: Access MinIO Console (Optional)

Milvus uses MinIO for object storage. You can access the console:

```
URL: http://localhost:9001
Username: minioadmin
Password: minioadmin
```

### Data Persistence

Milvus data is stored in `./volumes/` directory:
```
volumes/
├── etcd/      # Metadata
├── minio/     # Vector data
└── milvus/    # Milvus internal data
```

**Important**: This directory is gitignored. Back it up separately if needed.

---

## 🔧 Phase 2: Install Milvus MCP Server

### Step 1: Clone the MCP Server Repository

```bash
# Create a directory for MCP servers (recommended location)
mkdir -p ~/mcp-servers
cd ~/mcp-servers

# Clone the official Milvus MCP server
git clone https://github.com/zilliztech/mcp-server-milvus.git
cd mcp-server-milvus
```

### Step 2: Install Dependencies

**Option A: Using uv (Recommended)**
```bash
# Install uv if you haven't
pip install uv

# Test the server
uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530

# If you see MCP server output, it's working!
# Press Ctrl+C to stop
```

**Option B: Using pip**
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Test the server
python src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
```

### Step 3: Note the Server Path

You'll need the full path to the server for configuration:

```bash
# Get the full path
pwd
# Example output: /Users/cherifkhater/mcp-servers/mcp-server-milvus

# Full server path (use this in configs):
# /Users/cherifkhater/mcp-servers/mcp-server-milvus/src/mcp_server_milvus/server.py
```

---

## 🤖 Phase 3: Configure AI Assistants

### Configuration Files Overview

Each AI assistant has its own MCP configuration file:

| Assistant | Config File Location (macOS) |
|-----------|------------------------------|
| **Claude Code** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Cursor IDE** | `~/.cursor/mcp.json` |
| **Cline (VS Code)** | Configured via VS Code extension UI |
| **Gemini CLI** | Managed via `gemini mcp add` command |

---

### 🔵 Claude Code Configuration

**File**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "milvus": {
      "command": "/usr/local/bin/uv",
      "args": [
        "--directory",
        "/Users/cherifkhater/mcp-servers/mcp-server-milvus",
        "run",
        "src/mcp_server_milvus/server.py",
        "--milvus-uri",
        "http://localhost:19530"
      ],
      "env": {
        "MILVUS_URI": "http://localhost:19530",
        "MILVUS_DB": "default"
      }
    }
  }
}
```

**Setup Steps:**

```bash
# 1. Create directory if it doesn't exist
mkdir -p ~/Library/Application\ Support/Claude

# 2. Edit the config file (use your preferred editor)
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json

# 3. Paste the JSON configuration above
# 4. Update the path to match your uv installation:
which uv  # Find uv path, usually /usr/local/bin/uv or ~/.local/bin/uv

# 5. Save and close the editor (Ctrl+X, then Y, then Enter for nano)

# 6. Restart Claude Code completely

# 7. Verify MCP server is loaded
claude mcp list

# Expected output should include "milvus" server
```

---

### 🟣 Cursor IDE Configuration

**File**: `~/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "milvus": {
      "command": "/usr/local/bin/uv",
      "type": "stdio",
      "args": [
        "--directory",
        "/Users/cherifkhater/mcp-servers/mcp-server-milvus",
        "run",
        "src/mcp_server_milvus/server.py",
        "--milvus-uri",
        "http://localhost:19530"
      ],
      "env": {
        "MILVUS_URI": "http://localhost:19530",
        "MILVUS_DB": "default"
      }
    }
  }
}
```

**Setup Steps:**

```bash
# 1. Create the config file
touch ~/.cursor/mcp.json

# 2. Edit the file
nano ~/.cursor/mcp.json

# 3. Paste the JSON configuration above
# 4. Verify uv path (same as Claude Code setup)
# 5. Save and close

# 6. Restart Cursor IDE

# 7. Verify in Cursor:
# Go to Settings (Cmd+,) → Search for "MCP"
# You should see "milvus" listed under MCP Servers
```

---

### 🟢 Cline (VS Code) Configuration

**Setup via UI:**

1. **Open VS Code** with Cline extension installed
2. **Open Cline panel** (usually on the left sidebar)
3. **Click "MCP Servers"** icon at the top of Cline panel
4. **Click "Configure MCP Servers"** button
5. **Add server configuration**:

```json
{
  "mcpServers": {
    "milvus": {
      "command": "/usr/local/bin/uv",
      "args": [
        "--directory",
        "/Users/cherifkhater/mcp-servers/mcp-server-milvus",
        "run",
        "src/mcp_server_milvus/server.py",
        "--milvus-uri",
        "http://localhost:19530"
      ],
      "env": {
        "MILVUS_URI": "http://localhost:19530",
        "MILVUS_DB": "default"
      },
      "alwaysAllow": ["milvus-vector-search", "milvus-hybrid-search"]
    }
  }
}
```

6. **Save configuration**
7. **Restart VS Code**
8. **Verify**: In Cline MCP panel, you should see "milvus" server listed

---

### 🔴 Gemini CLI Configuration

**Prerequisites:**

```bash
# Install/update Gemini CLI
npm install -g @google/gemini-cli@latest

# Verify installation
gemini --version
```

**Setup via Command:**

```bash
# Add Milvus MCP server to Gemini CLI
gemini mcp add milvus \
  --command "/usr/local/bin/uv" \
  --args "--directory,/Users/cherifkhater/mcp-servers/mcp-server-milvus,run,src/mcp_server_milvus/server.py,--milvus-uri,http://localhost:19530"

# Verify server is added
gemini mcp list

# Expected output should include "milvus"

# Test the connection
gemini chat
# Then in the chat, type: "List available MCP tools"
# You should see milvus-related tools listed
```

**Alternative: Manual Configuration**

If the command-line method doesn't work, you can manually edit the config:

```bash
# Edit Gemini CLI config file (location may vary)
# Check Gemini CLI docs for exact location
nano ~/.gemini/config.json
```

---

## 📊 Phase 4: Index Your Codebase

### Indexing Scripts

Two Python scripts are provided to index your codebase and documentation:

1. **`scripts/index-codebase.py`** - Indexes source code files
2. **`scripts/index-docs.py`** - Indexes documentation (.md files)

### Run Indexing

```bash
# Navigate to project root
cd /Users/cherifkhater/AIProjects/FinalProjects/WiseWealth

# Install required Python packages
pip install pymilvus sentence-transformers

# Index your codebase
python scripts/index-codebase.py

# Index documentation
python scripts/index-docs.py

# Check what was indexed
# You can use the MinIO console or query Milvus directly
```

### What Gets Indexed

**Codebase indexing** (`index-codebase.py`):
- All `.ts`, `.tsx`, `.js`, `.jsx` files in `src/`
- File content split into chunks
- Function/class definitions extracted
- Embeddings generated using sentence-transformers

**Documentation indexing** (`index-docs.py`):
- All `.md` files in project root
- `_PROJECT_CONTEXT.md`, `_CODEBASE_INDEX.md`, etc.
- Documentation split by sections
- Embeddings for semantic search

### Re-indexing

Run the scripts again to update the index after making significant code changes:

```bash
# Add to package.json for easy access
npm run index  # Runs both indexing scripts
```

---

## 💡 Usage Examples

### With Claude Code

```
User: "Search the codebase for authentication logic"

Claude: [Uses milvus-vector-search tool]
Found authentication code in:
- src/lib/auth/AuthService.ts:24
- src/app/api/auth/route.ts:12
- src/hooks/useAuth.ts:8
```

### With Cursor IDE

```
User: "Find where we handle errors"

Cursor: [Queries Milvus MCP]
Error handling is implemented in:
- src/lib/utils/errorHandler.ts
- src/components/ErrorBoundary.tsx
- src/app/api/middleware/errorMiddleware.ts
```

### With Cline (VS Code)

```
User: "Show me all components related to user profile"

Cline: [Uses Milvus hybrid search]
User profile components:
- src/components/features/UserProfile.tsx
- src/components/features/ProfileSettings.tsx
- src/components/ui/Avatar.tsx
```

### With Gemini CLI

```bash
gemini chat

User: "What files contain database queries?"

Gemini: [Searches Milvus index]
Database queries found in:
- src/lib/db/queries.ts
- src/app/api/users/route.ts
- src/app/api/transactions/route.ts
```

---

## 🔧 Troubleshooting

### Milvus Container Not Starting

```bash
# Check container logs
docker logs milvus-standalone

# Common issues:
# - Port 19530 already in use
docker ps -a | grep 19530  # Check what's using the port

# - Insufficient resources
# Increase Docker memory limit to at least 4GB
# Docker Desktop → Settings → Resources → Memory
```

### MCP Server Not Connecting

```bash
# Verify Milvus is running
curl http://localhost:19530/healthz

# Test MCP server manually
cd ~/mcp-servers/mcp-server-milvus
uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530

# If error about missing dependencies:
pip install pymilvus mcp

# Check uv path in config matches actual path
which uv
```

### AI Assistant Not Seeing MCP Tools

**Claude Code:**
```bash
# Restart Claude Code completely (quit and reopen)
# Verify config file syntax
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | python -m json.tool

# Check MCP server list
claude mcp list
```

**Cursor:**
```bash
# Check config syntax
cat ~/.cursor/mcp.json | python -m json.tool

# Restart Cursor completely
# Check Settings → MCP Servers
```

**Cline:**
- Open Cline MCP panel
- Check if server shows as "connected" (green dot)
- Click "Restart" button next to server if needed

**Gemini CLI:**
```bash
# List configured servers
gemini mcp list

# Remove and re-add if issues
gemini mcp remove milvus
# Then add again with correct config
```

### Indexing Script Errors

```bash
# If "no module named pymilvus"
pip3 install pymilvus sentence-transformers

# If connection refused
# Make sure Milvus is running:
docker-compose ps

# If embedding model download fails
# Ensure you have internet connection
# The sentence-transformers model will download on first run (~500MB)
```

---

## 🔄 Maintenance

### Daily Operations

**Start Milvus:**
```bash
cd /Users/cherifkhater/AIProjects/FinalProjects/WiseWealth
docker-compose up -d
```

**Stop Milvus:**
```bash
docker-compose down
```

**Check Status:**
```bash
docker-compose ps
docker-compose logs milvus
```

### Weekly Maintenance

**Re-index after significant changes:**
```bash
python scripts/index-codebase.py
python scripts/index-docs.py
```

**Check disk usage:**
```bash
du -sh volumes/
```

### Backup

**Backup Milvus data:**
```bash
# Stop Milvus
docker-compose down

# Backup volumes directory
tar -czf milvus-backup-$(date +%Y%m%d).tar.gz volumes/

# Restart Milvus
docker-compose up -d
```

**Restore from backup:**
```bash
# Stop Milvus
docker-compose down

# Remove current data
rm -rf volumes/

# Extract backup
tar -xzf milvus-backup-YYYYMMDD.tar.gz

# Restart Milvus
docker-compose up -d
```

### Updates

**Update Milvus:**
```bash
# Edit docker-compose.yml
# Change image version: milvusdb/milvus:v2.4.0 → milvusdb/milvus:v2.5.0

# Pull new image and restart
docker-compose pull
docker-compose up -d
```

**Update MCP Server:**
```bash
cd ~/mcp-servers/mcp-server-milvus
git pull origin main

# Restart all AI assistants
```

---

## 📚 Additional Resources

### Official Documentation
- [Milvus Documentation](https://milvus.io/docs)
- [Milvus MCP Server GitHub](https://github.com/zilliztech/mcp-server-milvus)
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)

### Community Resources
- [Milvus Discord](https://discord.gg/8uyFbECzPX)
- [MCP GitHub Discussions](https://github.com/modelcontextprotocol/specification/discussions)

### WiseWealth Project Docs
- [Project Context](./_PROJECT_CONTEXT.md)
- [Indexing Strategy](./_INDEXING_STRATEGY.md)
- [Codebase Index](./_CODEBASE_INDEX.md)

---

## 🎯 Quick Reference

### Essential Commands

```bash
# Start Milvus
docker-compose up -d

# Stop Milvus
docker-compose down

# View logs
docker logs -f milvus-standalone

# Re-index codebase
python scripts/index-codebase.py

# Test MCP server
cd ~/mcp-servers/mcp-server-milvus
uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530

# Check MCP in Claude Code
claude mcp list

# Check MCP in Gemini CLI
gemini mcp list
```

### Configuration File Locations

```
~/Library/Application Support/Claude/claude_desktop_config.json  # Claude Code
~/.cursor/mcp.json                                                # Cursor
~/.gemini/config.json                                            # Gemini CLI
# Cline: Configure via VS Code extension UI
```

---

**Last Updated**: 2025-11-16
**Maintained By**: [Your Name / Team]
**Version**: 1.0
