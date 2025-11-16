# Cross-Assistant Sync Strategy Summary

<!-- Quick reference for understanding how context is shared -->

## 📚 Documentation Files Overview

```
WiseWealth/
├── _PROJECT_CONTEXT.md         ⭐ Master context (architecture, conventions, tasks)
│   ├── → .cursorrules          (symlink for Cursor)
│   └── → .clinerules           (symlink for Cline)
│
├── _CODEBASE_INDEX.md          📂 File locations and code organization
├── _INDEXING_STRATEGY.md       🔍 How indexing works across tools
├── _SYNC_SUMMARY.md            📋 This file - quick reference
│
├── CLAUDE.md                   🤖 Claude Code specific
├── GEMINI.md                   🤖 Gemini specific
└── AGENTS.md                   🤖 Automation agents specific
```

## 🎯 What Each File Does

### `_PROJECT_CONTEXT.md` ⭐ (Master)
**Who reads it**: All AI assistants (via symlinks or direct reference)

**Contains:**
- Project goals and description
- Tech stack options (not decided yet)
- Architecture patterns (under evaluation)
- Coding conventions and style guide
- Current tasks and priorities
- Development setup instructions
- Testing and deployment info

**Update frequency**: Weekly for tasks, as-needed for decisions

---

### `_CODEBASE_INDEX.md` 📂
**Who reads it**: All AI assistants

**Contains:**
- Directory structure and purpose
- File naming conventions
- Quick reference: "Where to find X"
- Key code patterns
- Component relationships
- Module ownership

**Update frequency**: When adding major features or restructuring

---

### `_INDEXING_STRATEGY.md` 🔍
**Who reads it**: Developers and AI assistants (reference)

**Contains:**
- How different AI tools handle indexing
- Manual vs automated indexing approaches
- MCP (Model Context Protocol) setup guide
- Code tagging system (`// INDEX: TAG`)
- Auto-generation scripts
- Tool-specific recommendations

**Update frequency**: When changing indexing approach

---

### Assistant-Specific Files 🤖
**`CLAUDE.md`**, **`GEMINI.md`**, **`AGENTS.md`**

**Contains:**
- Tool-specific instructions
- Quirks and limitations
- Preferred workflows
- Custom commands or shortcuts

**Update frequency**: As needed per tool

---

## 🔄 How Syncing Works

### Context Sync (✅ Implemented)
```
_PROJECT_CONTEXT.md (master)
    │
    ├── .cursorrules → symlink (auto-synced)
    ├── .clinerules → symlink (auto-synced)
    │
    └── Other tools read directly
```

**Result**: All tools share the same project context automatically.

---

### Codebase Indexing (Multi-layer approach)

#### Layer 1: Manual Index ✅
```
_CODEBASE_INDEX.md
    ↓
All AI assistants read this for navigation
```

#### Layer 2: Code Tags ⏳ (Recommended)
```typescript
// In your code:
// ===== INDEX: AUTH-MAIN =====
export class AuthService { }

// AI assistants search for:
grep "INDEX: AUTH" -r src/
```

#### Layer 3: Auto-Generated 🔮 (Future)
```
npm run index
    ↓
Generates _AUTO_INDEX.json
    ↓
AI tools can parse this
```

#### Layer 4: MCP Servers 🔮 (Advanced)
```
MCP Server (running)
    ↓
Claude Code ← connects
Cline ← connects
    ↓
Shared real-time index
```

---

## 🛠 Setup Checklist

### ✅ Already Done
- [x] Created `_PROJECT_CONTEXT.md`
- [x] Created symlinks (`.cursorrules`, `.clinerules`)
- [x] Created `_CODEBASE_INDEX.md`
- [x] Created `_INDEXING_STRATEGY.md`
- [x] Created assistant-specific files

### ⏳ To Do As You Code
- [ ] Add `// INDEX: TAG` comments to important code
- [ ] Update `_CODEBASE_INDEX.md` when adding major features
- [ ] Update `_PROJECT_CONTEXT.md` tasks weekly

### 🔮 Future Enhancements
- [ ] Set up auto-index generation script
- [ ] Implement MCP server (if team grows)
- [ ] Add git hooks for automatic index updates

---

## 💡 Best Practices

### When to Update What

| Scenario | File to Update |
|----------|----------------|
| New task or feature planned | `_PROJECT_CONTEXT.md` → Tasks section |
| Tech stack decision made | `_PROJECT_CONTEXT.md` → Tech Stack section |
| New major module/feature added | `_CODEBASE_INDEX.md` |
| Important function/class created | Add `// INDEX: TAG` in code |
| Changed indexing approach | `_INDEXING_STRATEGY.md` |
| Tool-specific workflow | `CLAUDE.md` / `GEMINI.md` / etc. |

### Quick Tips
1. **Always update context BEFORE asking AI assistants to work**
2. **Tag important code as you write it** (`// INDEX: TAG`)
3. **Keep context files concise** (under 2000 words to avoid token limits)
4. **Version control everything** (commit context changes)
5. **Review monthly** to keep information current

---

## 🤖 Tool Compatibility Matrix

| Feature | Claude Code | Cursor | Cline | Copilot | Gemini |
|---------|-------------|--------|-------|---------|--------|
| Reads `_PROJECT_CONTEXT.md` | ✅ Auto | ✅ Via symlink | ✅ Via symlink | ⚠️ Manual | ✅ Manual |
| Reads `_CODEBASE_INDEX.md` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Supports CODE tags | ✅ | ✅ | ✅ | ✅ | ✅ |
| Supports MCP | ✅ Native | ⚠️ Limited | ✅ Yes | ❌ No | ❌ No |
| Has own index | ❌ No | ✅ `.cursor/` | ⚠️ VS Code | ✅ Cloud | ❌ No |

**Legend:**
- ✅ Full support
- ⚠️ Partial support
- ❌ Not supported

---

## 📝 Example Workflow

### Starting a new feature:

1. **Update context:**
   ```bash
   # Edit _PROJECT_CONTEXT.md
   # Add task: "Implement user authentication"
   ```

2. **Code with tags:**
   ```typescript
   // ===== INDEX: AUTH-MAIN =====
   // Primary authentication service
   export class AuthService { }
   ```

3. **Update index:**
   ```bash
   # Edit _CODEBASE_INDEX.md
   # Add: Authentication section with file locations
   ```

4. **Commit:**
   ```bash
   git add _PROJECT_CONTEXT.md _CODEBASE_INDEX.md
   git commit -m "docs: add auth feature to context"
   ```

5. **Ask AI assistant:**
   > "Implement the authentication service. Check _PROJECT_CONTEXT.md for conventions and _CODEBASE_INDEX.md for file locations."

---

## 🔗 Quick Links

- **Master Context**: [_PROJECT_CONTEXT.md](./_PROJECT_CONTEXT.md)
- **Code Index**: [_CODEBASE_INDEX.md](./_CODEBASE_INDEX.md)
- **Indexing How-To**: [_INDEXING_STRATEGY.md](./_INDEXING_STRATEGY.md)

---

**Last Updated**: 2025-11-16
**Quick Ref Version**: 1.0
