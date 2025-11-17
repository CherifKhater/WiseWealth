# 🚀 Quick Start Guide

**Updated**: 2025-11-16

---

## ⚡ 5-Minute Setup

### ✅ Step 1: Install Python Dependencies

```bash
# Use pip3 on macOS (not pip)
pip3 install pymilvus sentence-transformers uv

# Or use npm script
npm run deps:install
```

**Note**: This will download ~500MB of packages including PyTorch. First install takes 2-5 minutes.

---

### ✅ Step 2: Start Milvus Database

```bash
# Start Milvus (Docker must be running)
npm run milvus:up

# Wait 10-15 seconds for startup

# Verify it's running
npm run milvus:status

# Expected output: milvus-standalone, milvus-etcd, milvus-minio (all "Up")
```

**Troubleshooting**: If Docker is not running, start Docker Desktop first.

---

### ✅ Step 3: Clone MCP Server

```bash
# Create directory for MCP servers
mkdir -p ~/mcp-servers

# Clone Milvus MCP server
cd ~/mcp-servers
git clone https://github.com/zilliztech/mcp-server-milvus.git

# Return to project
cd ~/AIProjects/FinalProjects/WiseWealth
```

---

### ✅ Step 4: Configure AI Assistants

Pick your assistant(s) and configure:

<details>
<summary><b>Claude Code</b> (Click to expand)</summary>

```bash
# Check your uv path
which uv

# Copy template
cp config/claude-mcp-config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Edit if needed (update uv path if different)
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Restart Claude Code

# Verify
claude mcp list
# Should show "milvus" server
```

</details>

<details>
<summary><b>Cursor IDE</b> (Click to expand)</summary>

```bash
# Check your uv path
which uv

# Copy template
cp config/cursor-mcp-config.json ~/.cursor/mcp.json

# Edit if needed (update uv path if different)
nano ~/.cursor/mcp.json

# Restart Cursor

# Verify in Settings → MCP Servers
```

</details>

<details>
<summary><b>Cline (VS Code)</b> (Click to expand)</summary>

1. Open VS Code with Cline extension
2. Click "MCP Servers" icon in Cline panel
3. Click "Configure MCP Servers"
4. Copy contents of `config/cline-mcp-config.json`
5. Update paths if needed (uv location, MCP server directory)
6. Save and restart VS Code
7. Verify in Cline MCP panel

</details>

<details>
<summary><b>Gemini CLI</b> (Click to expand)</summary>

```bash
# Install Gemini CLI
npm install -g @google/gemini-cli@latest

# Find uv path
which uv

# Add Milvus MCP (update path from which uv)
gemini mcp add milvus \
  --command "/usr/local/bin/uv" \
  --args "--directory,$HOME/mcp-servers/mcp-server-milvus,run,src/mcp_server_milvus/server.py,--milvus-uri,http://localhost:19530"

# Verify
gemini mcp list
```

</details>

---

### ✅ Step 5: Index Your Codebase

```bash
# Index both code and documentation
npm run index

# Or separately:
npm run index:code  # Index source code
npm run index:docs  # Index documentation
```

**Expected output**:
- Scans for files
- Generates embeddings (first run downloads a 400MB model)
- Inserts into Milvus
- Shows summary statistics

**Time**: ~1-2 minutes for initial index (depending on codebase size)

---

## 🎯 Test It Out!

Ask your configured AI assistant:

```
"Find all authentication-related code"
"Where do we handle database errors?"
"Show me documentation about indexing strategies"
```

The assistant will use **Milvus MCP** for semantic search! 🎉

---

## 🛠 Daily Usage

### Start Working

```bash
# Start Milvus database
npm run milvus:up

# That's it! Now use your AI assistants
```

### End of Day

```bash
# Stop Milvus to save resources
npm run milvus:down
```

### After Major Changes

```bash
# Re-index codebase
npm run index
```

---

## 📊 Useful Commands

### Milvus Management

```bash
npm run milvus:up        # Start Milvus
npm run milvus:down      # Stop Milvus
npm run milvus:logs      # View logs
npm run milvus:status    # Check status
```

### Indexing

```bash
npm run index            # Index everything
npm run index:code       # Index only code
npm run index:docs       # Index only docs
npm run deps:install     # Install Python deps
```

### Troubleshooting

```bash
# Check if Milvus is healthy
curl http://localhost:9091/healthz

# View detailed logs
docker logs -f milvus-standalone

# Restart Milvus
npm run milvus:down && npm run milvus:up
```

---

## 🆘 Common Issues

### "pip: command not found"
**Solution**: Use `pip3` instead of `pip` on macOS
```bash
pip3 install pymilvus sentence-transformers uv
```

### "Docker is not running"
**Solution**: Start Docker Desktop application

### "Connection refused" when indexing
**Solution**: Make sure Milvus is running
```bash
npm run milvus:status
npm run milvus:up  # if not running
```

### MCP server not showing in AI assistant
**Solutions**:
1. Verify config file location is correct
2. Check `uv` path matches `which uv` output
3. Restart AI assistant completely (quit and reopen)
4. Check logs for errors

### "No module named 'pymilvus'"
**Solution**: Install Python dependencies
```bash
pip3 install pymilvus sentence-transformers
```

---

## 📚 Full Documentation

- **Complete Setup**: `_MILVUS_MCP_GUIDE.md`
- **How It Works**: `_INDEXING_STRATEGY.md`
- **Project Context**: `_PROJECT_CONTEXT.md`
- **Detailed Reference**: `SETUP_COMPLETE.md`

---

## ✨ What's Next?

1. ✅ Start using semantic search with your AI assistants
2. ✅ Add `// INDEX: TAG` comments to important code
3. ✅ Re-index weekly during active development
4. ✅ Configure additional AI assistants as needed

---

**You're all set!** 🚀 Start coding with AI-powered semantic search across all your tools.
