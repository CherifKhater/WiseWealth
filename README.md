# WiseWealth

AI-powered personal finance management platform.

## 🚧 Project Status

**Status**: Initial setup phase
**Tech Stack**: To be decided (see `_PROJECT_CONTEXT.md`)
**Architecture**: Under evaluation (see `_PROJECT_CONTEXT.md`)

## 📚 Documentation

This project uses a **multi-assistant sync strategy** to maintain context across different AI code assistants.

### Core Documentation Files

| File | Purpose | Update Frequency |
|------|---------|------------------|
| [_PROJECT_CONTEXT.md](./_PROJECT_CONTEXT.md) | Master project context, conventions, tasks | Weekly |
| [_CODEBASE_INDEX.md](./_CODEBASE_INDEX.md) | File locations and code organization | Per feature |
| [_INDEXING_STRATEGY.md](./_INDEXING_STRATEGY.md) | How indexing works across tools | As needed |
| [_SYNC_SUMMARY.md](./_SYNC_SUMMARY.md) | Quick reference for sync strategy | As needed |

### AI Assistant Setup

This project is configured to work with multiple AI code assistants:

- **Claude Code**: Reads `CLAUDE.md` (symlinked to `_PROJECT_CONTEXT.md`)
- **Cursor**: Reads `.cursorrules` (symlinked to `_PROJECT_CONTEXT.md`)
- **Cline**: Reads `.clinerules` (symlinked to `_PROJECT_CONTEXT.md`)
- **Gemini**: Reads `GEMINI.md` (symlinked to `_PROJECT_CONTEXT.md`)
- **Other tools**: Read `_PROJECT_CONTEXT.md` directly

All assistants share the same project context via symbolic links - **no manual syncing required!**

## 🚀 Getting Started

### Prerequisites

**For Milvus MCP (Codebase Indexing):**
- Docker Desktop (for Milvus vector database)
- Python 3.10+ (for indexing scripts)
- Node.js 18+ (for Gemini CLI, if using)

**For Project Development:**
To be determined based on tech stack selection. See `_PROJECT_CONTEXT.md` for options being considered.

### Quick Setup: Milvus MCP for Codebase Indexing

```bash
# Run automated setup script
npm run mcp:setup

# Or manual setup:

# 1. Start Milvus database
npm run milvus:up

# 2. Clone MCP server
mkdir -p ~/mcp-servers
cd ~/mcp-servers
git clone https://github.com/zilliztech/mcp-server-milvus.git

# 3. Install Python dependencies
pip3 install pymilvus sentence-transformers uv

# 4. Configure AI assistants
# See config/ directory for templates and _MILVUS_MCP_GUIDE.md for instructions

# 5. Index codebase
npm run index

# 6. Restart your AI assistants
```

### Project Installation (when tech stack is decided)

```bash
# Project setup pending - tech stack not yet decided
# See _PROJECT_CONTEXT.md for planned setup instructions
```

## 🤖 Working with AI Assistants

### Milvus MCP Integration ✨

This project uses **Milvus vector database with MCP server** for semantic codebase search across all AI assistants!

**Supported assistants:**
- Claude Code ✅
- Cursor IDE ✅
- Cline (VS Code) ✅
- Gemini CLI ✅

**Features:**
- 🔍 Semantic code search (find code by meaning, not just keywords)
- 🤝 Shared index across all AI tools
- 📚 Includes both code and documentation
- 🚀 Natural language queries

**Example queries:**
- "Find all authentication logic"
- "Where do we handle API errors?"
- "Show me database query functions"

### For Developers

When working with any AI code assistant:

1. **Read context first**: AI assistants automatically load `_PROJECT_CONTEXT.md`
2. **Use semantic search**: Ask AI assistants to search via Milvus MCP for better results
3. **Update tasks**: Keep the "Current Tasks" section in `_PROJECT_CONTEXT.md` up to date
4. **Tag important code**: Use `// INDEX: TAG` comments (see `_INDEXING_STRATEGY.md`)
5. **Re-index regularly**: Run `npm run index` after major changes
6. **Update the manual index**: Add major features to `_CODEBASE_INDEX.md`

### For AI Assistants

When you (AI assistant) start working on this project:

1. **Read** `_PROJECT_CONTEXT.md` for project overview, conventions, and current tasks
2. **Use Milvus MCP** for code search when available (semantic search is better than grep)
3. **Check** `_CODEBASE_INDEX.md` for high-level navigation
4. **Follow** coding conventions strictly (see `_PROJECT_CONTEXT.md`)
5. **Update** task status as you work (mark tasks as in-progress/completed)

## 📁 Project Structure

```
WiseWealth/
├── _PROJECT_CONTEXT.md        # Master context (read this first!)
├── _CODEBASE_INDEX.md         # Code navigation reference
├── _INDEXING_STRATEGY.md      # Indexing across AI tools
├── _SYNC_SUMMARY.md           # Quick sync reference
├── .cursorrules → _PROJECT_CONTEXT.md
├── .clinerules → _PROJECT_CONTEXT.md
├── CLAUDE.md → _PROJECT_CONTEXT.md
├── GEMINI.md → _PROJECT_CONTEXT.md
├── AGENTS.md → _PROJECT_CONTEXT.md
└── (source code to be added)
```

## 🛠 Development

### Milvus MCP Commands

```bash
# Milvus database management
npm run milvus:up         # Start Milvus database
npm run milvus:down       # Stop Milvus database
npm run milvus:logs       # View Milvus logs
npm run milvus:status     # Check Milvus status

# Codebase indexing
npm run index             # Index both code and docs
npm run index:code        # Index only source code
npm run index:docs        # Index only documentation

# Setup
npm run mcp:setup         # Run automated Milvus MCP setup
```

### Project Commands

To be determined based on tech stack selection.

### Code Conventions

See `_PROJECT_CONTEXT.md` → Coding Conventions section.

### Git Workflow

```bash
# Commit format: <type>(<scope>): <subject>
# Examples:
git commit -m "feat(auth): add OAuth login"
git commit -m "docs(context): update tech stack decisions"
```

## 📝 Contributing

### Before You Start

1. Read `_PROJECT_CONTEXT.md` thoroughly
2. Check current tasks and priorities
3. Update the task list with what you're working on
4. Follow the coding conventions

### While Working

1. Add `// INDEX: TAG` comments to important functions/classes
2. Update `_CODEBASE_INDEX.md` when adding major features
3. Keep context files up to date

### Before Committing

1. Run tests (when implemented)
2. Check code quality (linting, formatting)
3. Update relevant documentation
4. Update task status in `_PROJECT_CONTEXT.md`

## 🔗 Links

- **Project Context**: [_PROJECT_CONTEXT.md](./_PROJECT_CONTEXT.md)
- **Codebase Index**: [_CODEBASE_INDEX.md](./_CODEBASE_INDEX.md)
- **Indexing Strategy**: [_INDEXING_STRATEGY.md](./_INDEXING_STRATEGY.md)
- **Sync Summary**: [_SYNC_SUMMARY.md](./_SYNC_SUMMARY.md)

## 📄 License

To be determined.

---

**Last Updated**: 2025-11-16
**Status**: Initial setup phase
**Version**: 0.1.0
