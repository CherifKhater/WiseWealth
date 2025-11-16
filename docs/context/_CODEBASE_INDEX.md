# Codebase Index

<!-- Version: 1.0 | Last Updated: 2025-11-16 -->

> **Purpose**: This file serves as a shared index/map of the codebase for all AI assistants. Update this as the codebase grows to help assistants quickly locate relevant code.

---

## 📂 Directory Index

### Core Application Structure
```
src/
├── app/                    # Next.js app router (main application)
├── components/             # React components
│   ├── ui/                # Base UI components (buttons, inputs, etc.)
│   ├── features/          # Feature-specific components
│   └── layouts/           # Layout components (header, footer, etc.)
├── lib/                   # Utilities and configurations
│   ├── db/               # Database client and utilities
│   ├── auth/             # Authentication logic
│   └── utils/            # Helper functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── constants/             # Application constants
```

---

## 🗂 File Categories

### Authentication & Authorization
- **Location**: `src/lib/auth/`, `src/app/(auth)/`
- **Key files**: TBD
- **Purpose**: User authentication, session management, protected routes

### Database & Data Models
- **Location**: `prisma/schema.prisma`, `src/lib/db/`
- **Key files**: TBD
- **Purpose**: Database schema, migrations, ORM configuration

### API Routes
- **Location**: `src/app/api/`
- **Key files**: TBD
- **Purpose**: Backend API endpoints

### UI Components
- **Location**: `src/components/`
- **Key files**: TBD
- **Purpose**: Reusable React components

### Business Logic
- **Location**: `src/lib/`
- **Key files**: TBD
- **Purpose**: Core business logic, calculations, validations

### AI/ML Integration
- **Location**: TBD
- **Key files**: TBD
- **Purpose**: AI model integration, prompts, vector storage

### Configuration Files
- **Root level**
  - `package.json` - Dependencies and scripts
  - `tsconfig.json` - TypeScript configuration
  - `next.config.js` - Next.js configuration
  - `.env.example` - Environment variables template
  - `_PROJECT_CONTEXT.md` - Project context (this is the master doc)

---

## 🔍 Key Patterns & Conventions

### Import Patterns
```typescript
// External dependencies first
import { useState } from 'react'
import { Button } from '@/components/ui'

// Then internal imports
import { formatCurrency } from '@/lib/utils'

// Then types
import { type User } from '@/types'

// Then styles
import styles from './Component.module.css'
```

### File Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `formatCurrency.ts`, `validateEmail.ts`)
- **Hooks**: `use*.ts` (e.g., `useAuth.ts`, `useLocalStorage.ts`)
- **Types**: `*.types.ts` (e.g., `user.types.ts`, `transaction.types.ts`)
- **Tests**: `*.test.ts` or `*.spec.ts`

### Component Organization
- Each major component should have its own directory if it has:
  - Multiple subcomponents
  - Associated styles
  - Tests
  - Types specific to that component

---

## 🏷 Code Tags & Markers

### Common Code Markers (to be added as code grows)
Use these markers in code comments to help AI assistants find specific patterns:

```typescript
// @index: authentication - main auth logic
// @index: api-endpoint - REST API route
// @index: database-query - DB operations
// @index: ai-integration - AI/ML related code
// @index: business-logic - core business rules
// @index: validation - input validation
// @index: error-handling - error management
// @index: performance-critical - performance-sensitive code
// @index: security-sensitive - security-critical code
```

---

## 📊 Codebase Statistics

### Current State (Updated: 2025-11-16)
- **Total Files**: TBD
- **Total Lines of Code**: TBD
- **Languages**: TypeScript, TSX, CSS
- **Components**: TBD
- **API Routes**: TBD
- **Tests**: TBD
- **Test Coverage**: TBD%

---

## 🔗 Key Relationships & Dependencies

### Data Flow
```
User Request
    ↓
Frontend Component (src/components/)
    ↓
API Route (src/app/api/)
    ↓
Business Logic (src/lib/)
    ↓
Database (via ORM)
```

### Authentication Flow
```
[To be documented once implemented]
```

### Component Dependencies
```
[To be documented as components are created]
```

---

## 🎯 Quick Reference: Where to Find...

### "I need to add/modify..."

| Task | Location | Key Files |
|------|----------|-----------|
| A new page | `src/app/` | TBD |
| A new API endpoint | `src/app/api/` | TBD |
| A new UI component | `src/components/ui/` | TBD |
| A new feature component | `src/components/features/` | TBD |
| A utility function | `src/lib/utils/` | TBD |
| A custom hook | `src/hooks/` | TBD |
| Type definitions | `src/types/` | TBD |
| Database schema | `prisma/schema.prisma` | TBD |
| Environment variables | `.env.example`, `.env.local` | TBD |
| Styling | `src/styles/`, component-level CSS | TBD |
| Tests | `tests/` or co-located `*.test.ts` | TBD |

---

## 📝 Code Ownership & Responsibilities

### Module Ownership (as codebase grows)
Document which parts of the codebase handle specific responsibilities:

- **Authentication**: [Module/files responsible]
- **User Management**: [Module/files responsible]
- **Transaction Processing**: [Module/files responsible]
- **Budget Management**: [Module/files responsible]
- **AI Analysis**: [Module/files responsible]
- **Reporting**: [Module/files responsible]

---

## 🔄 Index Maintenance

### How to Update This File
1. **When adding a new major feature**: Add to "File Categories" section
2. **When adding a new pattern**: Document in "Key Patterns" section
3. **Weekly**: Update "Codebase Statistics"
4. **When refactoring**: Update relevant sections to reflect new structure
5. **Before major releases**: Review and update all sections

### Auto-Generated Alternatives
Consider setting up automated indexing tools:
- **TypeDoc** for TypeScript projects
- **Compodoc** for Angular/documentation
- **Tree-sitter** based indexing
- **Custom scripts** to generate file trees

---

## 🤖 Assistant-Specific Indexing Notes

### For Claude Code
- This file is manually maintained
- Use this as a quick reference before searching code
- Supplement with Grep/Glob tools for detailed searches

### For Cursor
- Cursor has its own `.cursor/` indexing
- Use this file for high-level navigation
- Cursor's AI will build embeddings automatically

### For Cline
- Use this file + MCP servers for enhanced context
- Can integrate with external indexing tools

### For GitHub Copilot
- Copilot uses GitHub's cloud indexing
- This file provides manual structure overview

---

**Last Updated**: 2025-11-16
**Maintained By**: [Your Name / Team]
**Version**: 1.0
