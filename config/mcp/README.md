# MCP Configuration Files

This directory contains template configuration files for setting up MCP servers (Milvus and Playwright) across different AI assistants.

## Files

- `claude.json` - Configuration for Claude Code
- `cursor.json` - Configuration for Cursor IDE
- `cline.json` - Configuration for Cline (VS Code extension)

## MCP Servers Configured

### 1. Milvus MCP Server
Vector database for semantic codebase search and documentation indexing.

### 2. Playwright MCP Server
Browser automation for web scraping, testing, and data collection.

### 3. Chrome DevTools MCP Server
Advanced browser debugging, performance analysis, and network inspection using Chrome DevTools Protocol.

### 4. Context7 MCP Server
Up-to-date, version-specific documentation and code examples for any library or framework.

### 5. Sequential Thinking MCP Server
Step-by-step reasoning and problem-solving with revision and branching capabilities.

## Important: Update Paths (Milvus Only)

Before using the Milvus MCP configuration, you **MUST** update two paths:

### 1. Update `uv` command path

Find your `uv` installation path:
```bash
which uv
```

Common paths:
- `/usr/local/bin/uv` (most common)
- `~/.local/bin/uv` (user install)
- `/opt/homebrew/bin/uv` (Apple Silicon Mac)

Update the Milvus `"command"` field in each config file to match your path.

### 2. Update MCP server directory path

The configs assume the Milvus MCP server is cloned to:
```
/Users/cherifkhater/mcp-servers/mcp-server-milvus
```

If you cloned it elsewhere, update the `"--directory"` argument in the Milvus `"args"` array.

**Note**: Playwright, Chrome DevTools, Context7, and Sequential Thinking MCP require no path configuration - all use `npx` to auto-download and run.

## Installation Instructions

### Claude Code

```bash
# Copy to Claude's config directory
cp config/mcp/claude.json ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Or if you already have other MCP servers, manually merge all sections
```

### Cursor IDE

```bash
# Copy to Cursor's config directory
cp config/mcp/cursor.json ~/.cursor/mcp.json

# Or manually merge if you have existing MCP servers
```

### Cline (VS Code)

Don't copy this file directly. Instead:

1. Open VS Code with Cline extension
2. Click "MCP Servers" icon in Cline panel
3. Click "Configure MCP Servers"
4. Copy the contents of `config/mcp/cline.json`
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

## Documentation

- **Milvus Setup**: See `docs/setup/_MILVUS_MCP_GUIDE.md` for detailed Milvus configuration
- **Playwright Setup**: See `docs/setup/PLAYWRIGHT_MCP_SETUP.md` for Playwright browser automation guide
- **Chrome DevTools Setup**: See `docs/setup/CHROME_DEVTOOLS_MCP_SETUP.md` for Chrome DevTools debugging and performance analysis
- **Context7 Setup**: See `docs/setup/CONTEXT7_MCP_SETUP.md` for up-to-date documentation integration
- **Sequential Thinking Setup**: See `docs/setup/SEQUENTIAL_THINKING_MCP_SETUP.md` for structured problem-solving

## Troubleshooting

### Milvus Issues
See `docs/setup/_MILVUS_MCP_GUIDE.md` for detailed troubleshooting steps.

### Playwright Issues
See `docs/setup/PLAYWRIGHT_MCP_SETUP.md` troubleshooting section.

### Chrome DevTools Issues
See `docs/setup/CHROME_DEVTOOLS_MCP_SETUP.md` troubleshooting section.

### Context7 Issues
See `docs/setup/CONTEXT7_MCP_SETUP.md` troubleshooting section.

### Sequential Thinking Issues
See `docs/setup/SEQUENTIAL_THINKING_MCP_SETUP.md` troubleshooting section.
