# Codebase Indexing Strategy

<!-- Version: 1.0 | Last Updated: 2025-11-16 -->

> **Purpose**: Document how different AI assistants can share and sync codebase indexing information.

---

## 🎯 Current Approach: Multi-Layer Strategy

We use a **layered approach** to maximize compatibility across different AI assistants:

### Layer 1: Manual Index Files ✅ (Implemented)
- **File**: `_CODEBASE_INDEX.md`
- **Compatible with**: All AI assistants
- **Maintenance**: Manual updates
- **Best for**: High-level navigation, onboarding new assistants

### Layer 2: Code Comments & Tags ⏳ (To implement)
- **Method**: Add special comment markers in code
- **Compatible with**: All AI assistants that read source files
- **Best for**: Marking important code sections

### Layer 3: Milvus MCP Server ✅ (Implemented)
- **Method**: Vector database with MCP for semantic code search
- **Compatible with**: Claude Code, Cursor, Cline, Gemini CLI
- **Best for**: Large codebases, semantic search, shared indexing across all tools
- **Status**: Fully set up and ready to use

### Layer 4: Custom Indexing Scripts ✅ (Implemented)
- **Method**: Python scripts to generate vector embeddings
- **Compatible with**: All assistants via Milvus MCP
- **Best for**: Keeping codebase index up-to-date

---

## 📋 Strategy Details

### ✅ Layer 1: Manual Index Files (Current)

**Files:**
- `_CODEBASE_INDEX.md` - Human-readable codebase map
- `_PROJECT_CONTEXT.md` - Project-wide context
- Assistant-specific files (`CLAUDE.md`, `GEMINI.md`, etc.)

**Advantages:**
- ✅ Works with ALL AI assistants
- ✅ Human-readable and maintainable
- ✅ No special setup required
- ✅ Version controlled

**Disadvantages:**
- ❌ Requires manual updates
- ❌ Can become outdated
- ❌ Limited detail

**How to use:**
```markdown
# In code, reference the index
"See _CODEBASE_INDEX.md for file locations"

# Update weekly or after major changes
git commit -m "docs(index): update codebase index"
```

---

### ⏳ Layer 2: Code Comments & Tags

**Implementation:**

Add special markers in your code that AI assistants can search for:

```typescript
// ===== INDEX: AUTH-MAIN =====
// This is the primary authentication module
// Related: src/lib/auth/session.ts, src/app/api/auth/
export class AuthService {
  // ...
}

// ===== INDEX: DATABASE-QUERY =====
// Main database query utilities
// Dependencies: prisma, @/lib/db
export async function queryTransactions() {
  // ...
}

// ===== INDEX: AI-INTEGRATION =====
// OpenAI/Claude API integration point
// Environment: OPENAI_API_KEY, ANTHROPIC_API_KEY
export async function analyzeFinancialData() {
  // ...
}
```

**Tag Categories:**
- `INDEX: AUTH-*` - Authentication related
- `INDEX: DB-*` - Database operations
- `INDEX: API-*` - API endpoints
- `INDEX: UI-*` - UI components
- `INDEX: UTIL-*` - Utility functions
- `INDEX: AI-*` - AI/ML integration
- `INDEX: SECURITY-*` - Security-sensitive code
- `INDEX: PERFORMANCE-*` - Performance-critical sections

**Advantages:**
- ✅ Always in sync with code
- ✅ Searchable with Grep/Ripgrep
- ✅ Works with all assistants
- ✅ Zero external dependencies

**How to use:**
```bash
# AI assistants can search for tags
grep -r "INDEX: AUTH" src/

# Or use Claude Code's Grep tool
# Pattern: "INDEX: AUTH"
```

---

### ✅ Layer 3: Milvus MCP Server (Implemented)

**What is Milvus MCP?**

Milvus is a vector database that stores code and documentation as semantic embeddings. The MCP (Model Context Protocol) server allows all AI assistants to query this database using natural language.

**Architecture:**

```
Your Codebase + Docs
     ↓ (indexed by Python scripts)
Milvus Vector Database (Docker)
     ↓ (accessed via MCP server)
┌────┼────┬────┬────┐
│    │    │    │    │
Claude Cursor Cline Gemini
Code   IDE  (VSCode) CLI
```

**Collections:**
- `wisewealth_codebase` - Source code indexed by chunks
- `wisewealth_docs` - Documentation indexed by sections

**Setup Files:**
- `docker-compose.yml` - Milvus database setup
- `config/claude-mcp-config.json` - Claude Code MCP configuration
- `config/cursor-mcp-config.json` - Cursor IDE MCP configuration
- `config/cline-mcp-config.json` - Cline MCP configuration
- `scripts/index-codebase.py` - Code indexing script
- `scripts/index-docs.py` - Documentation indexing script

**Quick Start:**

```bash
# 1. Start Milvus database
docker-compose up -d

# 2. Clone MCP server
mkdir -p ~/mcp-servers
cd ~/mcp-servers
git clone https://github.com/zilliztech/mcp-server-milvus.git

# 3. Configure AI assistants (see config/ directory)
# Copy appropriate config to each assistant's location

# 4. Index your codebase
pip3 install pymilvus sentence-transformers
python scripts/index-codebase.py
python scripts/index-docs.py

# 5. Restart AI assistants
```

**Advantages:**
- ✅ Semantic search (find code by meaning, not just keywords)
- ✅ Shared across ALL assistants (Claude, Cursor, Cline, Gemini)
- ✅ Persistent index (doesn't need rebuilding)
- ✅ Scales to large codebases
- ✅ Natural language queries

**Disadvantages:**
- ❌ Requires Docker running (resource usage)
- ❌ Initial setup more complex
- ❌ Need to re-index after major changes

**Usage Examples:**

```
User: "Find all authentication-related code"
AI: [Queries Milvus via MCP]
    → Returns: src/lib/auth/AuthService.ts:24
               src/hooks/useAuth.ts:10
               src/app/api/auth/route.ts:5

User: "Where do we handle database errors?"
AI: [Semantic search in Milvus]
    → Returns: src/lib/db/errorHandler.ts:15
               src/lib/utils/dbHelpers.ts:42
```

**When to Re-index:**
- After adding new major features
- Weekly for active development
- Before important code reviews
- After significant refactoring

**Complete Guide:**
See `_MILVUS_MCP_GUIDE.md` for full setup and troubleshooting.

---

### 🔮 Layer 3 (Alternative): MCP (Model Context Protocol) Servers

**What is MCP?**
MCP allows AI assistants to access shared context servers. Think of it as a "universal API" for AI context.

**Compatible Tools:**
- ✅ Claude Code (native support)
- ✅ Cline (via MCP)
- ⚠️ Cursor (limited MCP support as of 2025)
- ❌ GitHub Copilot (no MCP support)

**Setup Example:**

1. **Install an MCP server for filesystem indexing:**

```json
// claude_desktop_config.json or similar
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/WiseWealth"]
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/index.db"]
    }
  }
}
```

2. **Create a custom MCP server for your project:**

```typescript
// mcp-server/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Custom indexing logic
const server = new Server({
  name: 'wisewealth-index',
  version: '1.0.0',
});

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_code',
        description: 'Search codebase index',
        inputSchema: { /* ... */ }
      }
    ]
  };
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

**Advantages:**
- ✅ Real-time, dynamic indexing
- ✅ Shared across MCP-compatible tools
- ✅ Can integrate with external tools (databases, APIs)
- ✅ Programmatic access

**Disadvantages:**
- ❌ Not all assistants support MCP
- ❌ Requires setup and maintenance
- ❌ More complex than simple files

**When to use:**
- Large codebases (1000+ files)
- Multiple developers using different AI tools
- Need for real-time index updates
- Integration with external systems (Jira, GitHub, etc.)

---

### 🔮 Layer 4: Custom Indexing Scripts

**Automated Index Generation:**

Create scripts that generate index files automatically:

```bash
#!/bin/bash
# scripts/generate-index.sh

echo "# Auto-Generated Codebase Index" > _AUTO_INDEX.md
echo "Generated: $(date)" >> _AUTO_INDEX.md
echo "" >> _AUTO_INDEX.md

# Generate file tree
echo "## File Tree" >> _AUTO_INDEX.md
echo '```' >> _AUTO_INDEX.md
tree -I 'node_modules|.git|dist|build' -L 3 >> _AUTO_INDEX.md
echo '```' >> _AUTO_INDEX.md

# Count files by type
echo "" >> _AUTO_INDEX.md
echo "## Statistics" >> _AUTO_INDEX.md
echo "- TypeScript files: $(find src -name '*.ts' -o -name '*.tsx' | wc -l)" >> _AUTO_INDEX.md
echo "- Components: $(find src/components -name '*.tsx' | wc -l)" >> _AUTO_INDEX.md
echo "- API routes: $(find src/app/api -type f | wc -l)" >> _AUTO_INDEX.md

# Extract all INDEX tags
echo "" >> _AUTO_INDEX.md
echo "## Index Tags" >> _AUTO_INDEX.md
grep -r "INDEX:" src/ --include="*.ts" --include="*.tsx" >> _AUTO_INDEX.md
```

**JSON Index for Programmatic Access:**

```javascript
// scripts/generate-index.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const index = {
  version: '1.0.0',
  generated: new Date().toISOString(),
  files: {},
  tags: {},
  components: [],
  apiRoutes: [],
};

// Scan all TypeScript files
glob.sync('src/**/*.{ts,tsx}').forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Extract exports
  const exports = content.match(/export (function|class|const) (\w+)/g) || [];

  // Extract INDEX tags
  const tags = content.match(/INDEX: ([\w-]+)/g) || [];

  index.files[file] = {
    exports: exports.map(e => e.split(' ').pop()),
    tags: tags.map(t => t.replace('INDEX: ', '')),
    lines: content.split('\n').length,
  };
});

// Write to JSON
fs.writeFileSync('_AUTO_INDEX.json', JSON.stringify(index, null, 2));
```

**Run automatically:**

```json
// package.json
{
  "scripts": {
    "index": "node scripts/generate-index.js",
    "precommit": "npm run index && git add _AUTO_INDEX.json"
  }
}
```

**Advantages:**
- ✅ Always up-to-date
- ✅ No manual maintenance
- ✅ Can generate multiple formats (MD, JSON, HTML)
- ✅ Integrates with CI/CD

**Disadvantages:**
- ❌ Requires initial setup
- ❌ May need customization per project
- ❌ Can be slow on large codebases

---

## 🎨 Recommended Setup for WiseWealth

### Phase 1: Now (Project Setup) - ✅ COMPLETE
1. ✅ Use `_CODEBASE_INDEX.md` (manual) - **DONE**
2. ✅ Use `_PROJECT_CONTEXT.md` (manual) - **DONE**
3. ✅ Set up Milvus MCP server - **DONE**
4. ✅ Configure all AI assistants (Claude, Cursor, Cline, Gemini) - **DONE**
5. ✅ Create indexing scripts - **DONE**
6. ⏳ Add INDEX tags to code as you write it

### Phase 2: When codebase grows (50+ files)
7. ⏳ Run indexing scripts weekly
8. ⏳ Add npm scripts for easy re-indexing
9. 🔮 Set up git hooks for automatic index updates

### Phase 3: Advanced (if needed)
10. 🔮 Implement incremental indexing (update only changed files)
11. 🔮 Add monitoring for Milvus performance
12. 🔮 Consider dedicated indexing tools for even larger codebases

---

## 🔧 Tool-Specific Indexing

### Claude Code
- **Reads**: `_CODEBASE_INDEX.md`, `_PROJECT_CONTEXT.md`
- **Native search**: Grep, Glob tools (no persistent index)
- **MCP**: ✅ Supported
- **Recommendation**: Use manual index + code tags

### Cursor
- **Reads**: `.cursorrules` (symlinked to `_PROJECT_CONTEXT.md`)
- **Native index**: `.cursor/` directory (proprietary)
- **MCP**: ⚠️ Limited support
- **Recommendation**: Use manual index + let Cursor build its own index

### Cline
- **Reads**: `.clinerules` (symlinked to `_PROJECT_CONTEXT.md`)
- **Native search**: VS Code's indexing
- **MCP**: ✅ Supported
- **Recommendation**: Use manual index + MCP servers

### GitHub Copilot
- **Reads**: Code comments, open files
- **Native index**: GitHub cloud (based on repo)
- **MCP**: ❌ Not supported
- **Recommendation**: Use code tags/comments

### Continue.dev
- **Reads**: `.continuerc.json` config
- **Native index**: Custom embeddings (configurable)
- **MCP**: ⚠️ Some support
- **Recommendation**: Configure custom embeddings + manual index

---

## 📊 Comparison Matrix

| Method | All Tools | Up-to-date | Effort | Dynamic | Semantic Search | Status |
|--------|-----------|------------|--------|---------|-----------------|--------|
| Manual Index | ✅ | ⚠️ | Low | ❌ | ❌ | ✅ Implemented |
| Code Tags | ✅ | ✅ | Low | ❌ | ❌ | ⏳ Ready to use |
| Milvus MCP | ✅ | ⚠️ | Medium | ⚠️ | ✅ | ✅ Implemented |
| Auto Scripts | ✅ | ✅ | Low | ⚠️ | ❌ | ✅ Implemented |

**Legend:**
- **All Tools**: Works with all AI assistants
- **Up-to-date**: Automatically stays current
- **Effort**: Setup and maintenance effort
- **Dynamic**: Real-time updates
- **Semantic Search**: Understand code meaning, not just keywords

---

## 🔄 Maintenance Checklist

### Daily (when coding)
- [ ] Add INDEX tags to new important functions/classes
- [ ] Update code comments with relationship info

### Weekly
- [ ] Update `_CODEBASE_INDEX.md` with new major files/modules
- [ ] Run index generation scripts (if implemented)

### Monthly
- [ ] Review and clean up outdated index entries
- [ ] Update statistics in `_CODEBASE_INDEX.md`

### Per Release
- [ ] Full audit of index accuracy
- [ ] Update all documentation
- [ ] Regenerate auto-indexes

---

## 📚 Additional Resources

### MCP (Model Context Protocol)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Claude Code MCP Guide](https://docs.claude.com/en/docs/claude-code/mcp)

### Alternative Indexing Tools
- **ctags/universal-ctags**: Traditional code indexing
- **Sourcegraph**: Enterprise code search
- **OpenGrok**: Open-source code search
- **Tree-sitter**: Modern parsing library

---

**Last Updated**: 2025-11-16
**Maintained By**: [Your Name / Team]
**Version**: 1.0
