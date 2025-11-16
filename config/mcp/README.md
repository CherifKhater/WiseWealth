# MCP Configuration Files

This directory contains template configuration files for setting up Milvus MCP server across different AI assistants.

## Files

- `claude-mcp-config.json` - Configuration for Claude Code
- `cursor-mcp-config.json` - Configuration for Cursor IDE
- `cline-mcp-config.json` - Configuration for Cline (VS Code extension)

## Important: Update Paths

Before using these configurations, you **MUST** update two paths:

### 1. Update `uv` command path

Find your `uv` installation path:
```bash
which uv
```

Common paths:
- `/usr/local/bin/uv` (most common)
- `~/.local/bin/uv` (user install)
- `/opt/homebrew/bin/uv` (Apple Silicon Mac)

Update the `"command"` field in each config file to match your path.

### 2. Update MCP server directory path

The configs assume the Milvus MCP server is cloned to:
```
/Users/cherifkhater/mcp-servers/mcp-server-milvus
```

If you cloned it elsewhere, update the `"--directory"` argument in the `"args"` array.

## Installation Instructions

### Claude Code

```bash
# Copy to Claude's config directory
cp config/claude-mcp-config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Or if you already have other MCP servers, manually merge the "milvus" section
```

### Cursor IDE

```bash
# Copy to Cursor's config directory
cp config/cursor-mcp-config.json ~/.cursor/mcp.json

# Or manually merge if you have existing MCP servers
```

### Cline (VS Code)

Don't copy this file directly. Instead:

1. Open VS Code with Cline extension
2. Click "MCP Servers" icon in Cline panel
3. Click "Configure MCP Servers"
4. Copy the contents of `config/cline-mcp-config.json`
5. Paste into the configuration editor
6. Save

### Gemini CLI

Gemini CLI uses commands instead of config files:

```bash
# Update paths in this command first!
gemini mcp add milvus \
  --command "/usr/local/bin/uv" \
  --args "--directory,/Users/cherifkhater/mcp-servers/mcp-server-milvus,run,src/mcp_server_milvus/server.py,--milvus-uri,http://localhost:19530"
```

## Verification

After configuring, verify the MCP server is loaded:

**Claude Code:**
```bash
claude mcp list
```

**Cursor:**
Check Settings → MCP Servers

**Cline:**
Check MCP Servers panel in Cline

**Gemini CLI:**
```bash
gemini mcp list
```

## Troubleshooting

See `_MILVUS_MCP_GUIDE.md` for detailed troubleshooting steps.
