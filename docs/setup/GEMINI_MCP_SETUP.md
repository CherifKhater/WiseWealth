# Gemini CLI - Milvus MCP Setup

**Quick setup guide for configuring Milvus MCP in Gemini CLI**

---

## 🚀 Quick Setup (Method 1: Command Line)

### Step 1: Add Milvus MCP Server

```bash
gemini mcp add milvus \
  --command "/Users/cherifkhater/Library/Python/3.9/bin/uv" \
  --args "--directory,/Users/cherifkhater/mcp-servers/mcp-server-milvus,run,src/mcp_server_milvus/server.py,--milvus-uri,http://localhost:19530"
```

### Step 2: Verify Installation

```bash
# List configured MCP servers
gemini mcp list

# Expected output should include "milvus"
```

### Step 3: Test in Chat

```bash
# Start Gemini chat
gemini chat

# Then ask:
"List available MCP tools"
# You should see Milvus-related tools

# Test search:
"Search the documentation for tech stack information"
```

---

## 📋 Alternative Setup (Method 2: Manual Config)

If the command-line method doesn't work, manually edit the config:

### Find Your Gemini Config File

```bash
# Common locations:
# macOS: ~/.config/gemini/config.json
# or: ~/.gemini/config.json

# Find it:
ls -la ~/.config/gemini/config.json
ls -la ~/.gemini/config.json
```

### Add This Configuration

```json
{
  "mcpServers": {
    "milvus": {
      "command": "/Users/cherifkhater/Library/Python/3.9/bin/uv",
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

---

## ✅ Verification Checklist

Before testing, ensure:

- [ ] Milvus is running: `make status` or `docker-compose ps`
- [ ] Milvus is healthy: `make health`
- [ ] Collections exist: `make verify`
- [ ] MCP server path is correct: `ls ~/mcp-servers/mcp-server-milvus/src/mcp_server_milvus/server.py`
- [ ] uv is installed: `/Users/cherifkhater/Library/Python/3.9/bin/uv --version`

---

## 🧪 Test Commands

Once configured, test with these queries:

```bash
gemini chat

# Test 1: List tools
> "What MCP tools do you have access to?"

# Test 2: Search docs
> "Search the documentation for Milvus setup instructions"

# Test 3: Search code
> "Find indexing scripts in the codebase"

# Test 4: Project info
> "What are the coding conventions for this project?"
```

---

## 🔧 Troubleshooting

### Issue: "gemini: command not found"

**Solution**: Install Gemini CLI first

```bash
npm install -g @google/gemini-cli@latest

# Or with specific version:
npm install -g @google/gemini-cli

# Verify:
gemini --version
```

### Issue: MCP server not connecting

**Check 1**: Verify Milvus is running
```bash
make status
# All containers should be "Up" and "healthy"
```

**Check 2**: Test MCP server manually
```bash
cd ~/mcp-servers/mcp-server-milvus
/Users/cherifkhater/Library/Python/3.9/bin/uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
# Should start without errors
# Press Ctrl+C to stop
```

**Check 3**: Verify uv path
```bash
which uv
# Should show: /Users/cherifkhater/Library/Python/3.9/bin/uv
# If different, update the config with the correct path
```

### Issue: "No such file or directory" error

**Solution**: Check MCP server installation
```bash
ls -la ~/mcp-servers/mcp-server-milvus/

# If missing, clone it:
cd ~/mcp-servers
git clone https://github.com/zilliztech/mcp-server-milvus.git
```

### Issue: MCP tools not showing in Gemini

**Solutions**:
1. Restart Gemini CLI session
2. Check config file syntax (must be valid JSON)
3. Verify all paths are absolute (not relative)
4. Check Gemini CLI version (needs MCP support)

---

## 📊 What You Should See

### Successful MCP List Output

```bash
$ gemini mcp list

Configured MCP Servers:
  ✓ milvus
    Command: /Users/cherifkhater/Library/Python/3.9/bin/uv
    Status: Ready
```

### Successful Tool Query

```bash
$ gemini chat
> "What MCP tools do you have access to?"

Gemini:
I have access to the following MCP tools:

- milvus-vector-search: Semantic search across indexed codebase and documentation
- milvus-hybrid-search: Combined semantic and keyword search
- milvus-get-collections: List available Milvus collections
- milvus-collection-info: Get information about a specific collection

[Additional tools may be listed]
```

### Successful Search

```bash
> "Search the docs for coding conventions"

Gemini:
[Uses milvus-vector-search tool]

I found information about coding conventions in your documentation:

From CLAUDE.md (Coding Conventions section):
- Use PascalCase for component files
- Use camelCase for variables and functions
- Indentation: 2 spaces
- File naming conventions...

[Shows relevant excerpts from your indexed docs]
```

---

## 🎯 Quick Reference

### Essential Commands

```bash
# Add MCP server
gemini mcp add milvus --command "..." --args "..."

# List MCP servers
gemini mcp list

# Remove MCP server (if needed)
gemini mcp remove milvus

# Start chat
gemini chat

# Start chat with specific model
gemini chat --model gemini-2.0-flash-exp
```

### Configuration Paths

```bash
# Gemini config location (varies):
~/.config/gemini/config.json
~/.gemini/config.json

# MCP server location:
~/mcp-servers/mcp-server-milvus/

# uv executable:
/Users/cherifkhater/Library/Python/3.9/bin/uv

# Milvus URI:
http://localhost:19530
```

---

## 📚 Your Indexed Data

You have access to:

```
✓ wisewealth_codebase: 9 code chunks
  - Indexing scripts
  - Python code samples

✓ wisewealth_docs: 440 documentation sections
  - _PROJECT_CONTEXT.md
  - CLAUDE.md
  - GEMINI.md
  - _MILVUS_MCP_GUIDE.md
  - And 5 more documentation files
```

All searchable semantically via Gemini CLI with MCP!

---

## 🔄 Sync with Other Assistants

You now have the same MCP server configured across:

```
Claude Code ──┐
              ├──→ Same Milvus Database
Gemini CLI ───┘     (Shared Knowledge)

Benefits:
✓ Consistent search results
✓ Shared indexed knowledge
✓ No duplicate indexing needed
✓ Update once, available everywhere
```

---

## 💡 Pro Tips

### Tip 1: Start Milvus Before Using Gemini

```bash
# Before starting Gemini chat:
make up

# Then use Gemini:
gemini chat
```

### Tip 2: Re-index After Code Changes

```bash
# After making changes:
make index

# Then Gemini will have the latest code
gemini chat
```

### Tip 3: Check MCP Status

```bash
# If searches aren't working:
make status    # Check Milvus is running
gemini mcp list  # Check MCP is configured
```

### Tip 4: Use Specific Queries

```bash
# Better queries for semantic search:
✓ "Find error handling code"
✓ "Show me authentication logic"
✓ "What's our database schema?"

# Less effective:
✗ "Show me code"
✗ "Find stuff"
```

---

## 🆘 Getting Help

If you run into issues:

1. **Check Milvus**: `make status`
2. **Check Collections**: `make verify`
3. **Check MCP Config**: `gemini mcp list`
4. **Review Logs**: `make logs`
5. **Restart Milvus**: `make restart`

For detailed help, see:
- Full guide: `_MILVUS_MCP_GUIDE.md`
- Commands: `.commands.md`
- MCP explained: `MILVUS_MCP_EXPLAINED.md`

---

**Last Updated**: 2025-11-17

---

**Ready to test?**

```bash
# Ensure Milvus is running
make up

# Configure Gemini MCP (use command above)
gemini mcp add milvus ...

# Test it!
gemini chat
> "Search the docs for tech stack decisions"
```

Good luck! 🚀
