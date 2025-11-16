# WiseWealth - Project Context

<!-- Version: 1.1 | Last Updated: 2025-11-17 -->

> **Purpose**: This file serves as the unified context document for all AI assistants (Claude Code, Cursor, Cline, Gemini, etc.) working on this project. Keep this file synchronized and updated as the single source of truth.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Development Setup](#development-setup)
5. [Coding Conventions](#coding-conventions)
6. [Current Tasks & Priorities](#current-tasks--priorities)
7. [File Structure](#file-structure)
8. [Testing Strategy](#testing-strategy)
9. [Deployment](#deployment)
10. [Assistant-Specific Notes](#assistant-specific-notes)

---

## 🎯 Project Overview

### Description
**WiseWealth** - [Brief description of what the project does]

### Goals
- [ ] Goal 1: [e.g., Build a personal finance management platform]
- [ ] Goal 2: [e.g., Provide AI-powered investment insights]
- [ ] Goal 3: [e.g., Create user-friendly budget tracking]

### Key Features (Planned/In Progress)
- [ ] Feature 1: [e.g., User authentication & authorization]
- [ ] Feature 2: [e.g., Transaction tracking]
- [ ] Feature 3: [e.g., Budget planning]
- [ ] Feature 4: [e.g., Investment portfolio analysis]
- [ ] Feature 5: [e.g., AI financial advisor]

### Target Users
- [Define primary user personas]
- [Define secondary user personas]

---

## 🛠 Tech Stack

> **Status**: 🚧 Not decided yet - Under evaluation

### Frontend (Options being considered)
- **Framework**: React 18, Next.js 14, Vue 3, Svelte, or Solid.js
- **Language**: TypeScript 5.3+ (preferred) or JavaScript
- **Styling**: Tailwind CSS, Material-UI, Styled Components, or CSS Modules
- **State Management**: Redux Toolkit, Zustand, Jotai, Recoil, or Context API
- **Build Tool**: Vite, Webpack, or Turbopack (if using Next.js)

### Backend (Options being considered)
- **Framework**: Node.js (Express/Fastify/NestJS), Python (Django/FastAPI), or Go
- **Language**: TypeScript, Python 3.12+, or Go
- **Database**: PostgreSQL, MongoDB, MySQL, or Supabase
- **ORM/ODM**: Prisma, TypeORM, Drizzle, SQLAlchemy, or Mongoose
- **Authentication**: NextAuth.js, Auth0, Clerk, Supabase Auth, or custom JWT

### AI/ML (Options being considered)
- **Models**: OpenAI GPT-4, Claude API, Gemini, or Local LLM (Ollama/LLaMA)
- **Vector DB**: ✅ **Milvus** (selected for codebase indexing), alternatives: Pinecone, Weaviate, Qdrant
- **ML Framework**: TensorFlow, PyTorch, Scikit-learn, or LangChain

### Infrastructure & DevOps (Options being considered)
- **Hosting**: Vercel, AWS, GCP, Azure, Railway, or DigitalOcean
- **CI/CD**: GitHub Actions, GitLab CI, or CircleCI
- **Monitoring**: Sentry, LogRocket, DataDog, or open-source alternatives
- **Analytics**: Google Analytics, Mixpanel, PostHog, or Plausible

### Development Tools (To be decided)
- **Package Manager**: pnpm (preferred), npm, or yarn
- **Version Control**: Git + GitHub (confirmed)
- **Code Quality**: ESLint, Prettier, Biome, or Ruff (for Python)
- **Testing**: Jest, Vitest, Pytest, or Playwright
- **Documentation**: Storybook, JSDoc, Docusaurus, or Sphinx

### Decision Criteria
When evaluating tech stack options, consider:
- Developer experience and team familiarity
- Performance and scalability requirements
- Community support and ecosystem maturity
- Integration capabilities with financial APIs
- Cost (hosting, third-party services, licensing)
- Time to market vs long-term maintainability

---

## 🏗 Architecture

> **Status**: 🚧 Not decided yet - Under evaluation

### Architecture Patterns (Options being considered)
- **Monolithic**: Single unified codebase (faster initial development)
- **Microservices**: Separate services for auth, transactions, AI, etc. (better scalability)
- **Serverless**: Function-based architecture (cost-effective, auto-scaling)
- **Monorepo**: Multiple packages in one repo (shared code, unified tooling)
- **JAMstack**: JavaScript + APIs + Markup (fast, secure, scalable)

### Proposed System Components (Draft)
```
┌─────────────────────────────────────────────────────┐
│                    Frontend Layer                    │
│         [To be decided: Next.js / React SPA]        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│                   API Layer                          │
│     [To be decided: REST / GraphQL / tRPC]          │
└──────────────────┬──────────────────────────────────┘
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Auth    │  │Business │  │ AI/ML   │
│ Module  │  │ Logic   │  │ Module  │
└─────────┘  └─────────┘  └─────────┘
       │           │           │
       └───────────┼───────────┘
                   ▼
          ┌─────────────────┐
          │    Database     │
          │  [To be decided] │
          └─────────────────┘
```

### Data Flow (To be defined)
1. User authentication and session management
2. Financial data ingestion and processing
3. AI analysis and recommendation generation
4. Real-time updates and notifications
5. Data export and reporting

### Key Questions to Answer
- **Q1**: Monolithic or microservices for initial MVP?
- **Q2**: Which database best suits financial transaction data?
- **Q3**: Should AI processing be real-time or batch?
- **Q4**: Self-hosted vs managed services (auth, DB, hosting)?
- **Q5**: Mobile app needed from the start or web-first?

### Design Principles (Preliminary)
- Security first: Financial data requires strict security measures
- Scalability: Design for growth from day one
- User privacy: Minimize data collection, encrypt sensitive data
- Performance: Fast load times and responsive UI
- Maintainability: Clean code, good documentation, automated testing

---

## 🚀 Development Setup

### Prerequisites
```bash
- Node.js >= 18.x (or Python >= 3.11)
- pnpm >= 8.x (or pip/poetry)
- Docker >= 24.x (optional, for local DB)
- Git
```

### Initial Setup
```bash
# Clone repository
git clone [repository-url]
cd WiseWealth

# Install dependencies
pnpm install  # or npm install / yarn install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Setup database
pnpm db:setup  # or docker-compose up -d

# Run migrations
pnpm db:migrate

# Start development server
pnpm dev
```

### Environment Variables
```bash
# Required variables (add to .env.local):
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="http://localhost:3000"
AUTH_SECRET="..."

# Optional variables:
OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."
```

### Development Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm lint         # Lint code
pnpm format       # Format code with Prettier
pnpm db:studio    # Open database GUI
pnpm typecheck    # TypeScript type checking
```

---

## 📐 Coding Conventions

### General Principles
- **DRY**: Don't Repeat Yourself
- **SOLID**: Follow SOLID principles
- **KISS**: Keep It Simple, Stupid
- **Convention over Configuration**

### Naming Conventions
```typescript
// Files & Folders
components/Button.tsx           // PascalCase for components
utils/formatCurrency.ts         // camelCase for utilities
hooks/useAuth.ts                // camelCase with 'use' prefix
types/user.types.ts             // camelCase with .types suffix
constants/API_ROUTES.ts         // SCREAMING_SNAKE_CASE

// Variables & Functions
const userName = "..."          // camelCase
const MAX_RETRY_COUNT = 3       // SCREAMING_SNAKE_CASE for constants
function calculateTotal() {}    // camelCase
class UserService {}            // PascalCase

// Types & Interfaces
type User = {}                  // PascalCase
interface UserProps {}          // PascalCase with Props/Config suffix
enum UserRole {}                // PascalCase
```

### Code Style
- **Indentation**: 2 spaces (not tabs)
- **Quotes**: Single quotes for JS/TS, double quotes for JSX
- **Semicolons**: Required (enforced by ESLint)
- **Line Length**: Max 100 characters
- **Trailing Commas**: Always in multiline

### Component Structure (React/Next.js example)
```typescript
// 1. Imports - grouped by: external, internal, types, styles
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { type UserProps } from '@/types'
import styles from './Component.module.css'

// 2. Types/Interfaces
interface Props {
  user: UserProps
  onSubmit: () => void
}

// 3. Component
export function Component({ user, onSubmit }: Props) {
  // 3a. Hooks
  const [state, setState] = useState(null)

  // 3b. Effects
  useEffect(() => {}, [])

  // 3c. Handlers
  const handleClick = () => {}

  // 3d. Render
  return <div>...</div>
}

// 4. Exports
export default Component
```

### Error Handling
```typescript
// Use try-catch for async operations
try {
  const data = await fetchData()
  return { success: true, data }
} catch (error) {
  console.error('Error fetching data:', error)
  return { success: false, error: error.message }
}

// Use Error boundaries for React components
// Validate inputs before processing
// Provide meaningful error messages
```

### Comments & Documentation
```typescript
// Use JSDoc for functions and classes
/**
 * Calculates the total investment return
 * @param principal - Initial investment amount
 * @param rate - Annual interest rate (as decimal)
 * @param years - Investment period in years
 * @returns Total return amount
 */
function calculateReturn(principal: number, rate: number, years: number): number {
  return principal * Math.pow(1 + rate, years)
}

// Use inline comments sparingly - code should be self-documenting
// Comment WHY, not WHAT
```

### Git Commit Conventions
```bash
# Format: <type>(<scope>): <subject>

feat(auth): add OAuth2 login support
fix(dashboard): resolve chart rendering issue
docs(readme): update installation instructions
style(button): fix spacing and alignment
refactor(api): simplify error handling logic
test(auth): add unit tests for login flow
chore(deps): update dependencies

# Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build
```

---

## ✅ Current Tasks & Priorities

<!-- Update this section frequently! Format: YYYY-MM-DD -->

### Active Sprint (Updated: 2025-11-17)

#### 🔥 High Priority
- [ ] **Task 1**: [e.g., Set up project structure and initial configuration]
  - Subtask: Initialize Next.js project
  - Subtask: Configure TypeScript and ESLint
  - Subtask: Set up database schema

- [ ] **Task 2**: [e.g., Implement user authentication]
  - Subtask: Set up NextAuth.js
  - Subtask: Create login/signup pages
  - Subtask: Add protected routes

#### 📌 Medium Priority
- [ ] **Task 3**: [e.g., Design database schema]
- [ ] **Task 4**: [e.g., Create UI component library]

#### 🔮 Low Priority / Future
- [ ] **Task 5**: [e.g., Add analytics]
- [ ] **Task 6**: [e.g., Implement dark mode]

### Completed ✓
- [x] **Setup**: Repository initialized - 2025-11-16
- [x] **Setup**: Created project context documentation - 2025-11-16
- [x] **Organization**: Reorganized project structure following best practices - 2025-11-17

### Blocked / Issues
- [ ] **Blocker 1**: [e.g., Waiting for API key approval]

---

## 📁 File Structure

```
WiseWealth/
├── Root (Essential files only)
│   ├── README.md              # Project overview
│   ├── QUICKSTART.md          # Quick start guide
│   ├── package.json           # Node.js package config
│   ├── .gitignore             # Git ignore rules
│   ├── Makefile               # Build commands
│   ├── docker-compose.yml     # Milvus database setup
│   ├── CLAUDE.md              # Symlink → docs/context/_PROJECT_CONTEXT.md
│   ├── GEMINI.md              # Symlink → docs/context/_PROJECT_CONTEXT.md
│   ├── AGENTS.md              # Symlink → docs/context/_PROJECT_CONTEXT.md
│   ├── .cursorrules           # Symlink → docs/context/_PROJECT_CONTEXT.md
│   └── .clinerules            # Symlink → docs/context/_PROJECT_CONTEXT.md
│
├── docs/                      # All documentation
│   ├── context/               # Project context & indexes
│   │   ├── _PROJECT_CONTEXT.md        # Master context (this file)
│   │   ├── _CODEBASE_INDEX.md         # Code structure index
│   │   ├── _INDEXING_STRATEGY.md      # Indexing documentation
│   │   └── _SYNC_SUMMARY.md           # Multi-assistant sync guide
│   ├── setup/                 # Setup & configuration guides
│   │   ├── SETUP_COMPLETE.md          # Setup completion guide
│   │   ├── GEMINI_MCP_SETUP.md        # Gemini MCP setup
│   │   └── _MILVUS_MCP_GUIDE.md       # Milvus MCP guide
│   └── commands.md            # Command reference
│
├── config/                    # Configuration files
│   ├── mcp/                   # MCP server configurations
│   │   ├── claude.json        # Claude MCP config
│   │   ├── cursor.json        # Cursor MCP config
│   │   ├── cline.json         # Cline MCP config
│   │   └── README.md          # MCP config documentation
│   ├── .claude/               # Claude local settings
│   └── .gemini/               # Gemini local settings
│
├── scripts/                   # Build & utility scripts
│   └── indexing/              # Indexing scripts
│       ├── index-codebase.py  # Code indexing script
│       ├── index-docs.py      # Docs indexing script
│       └── setup-milvus.sh    # Milvus setup script
│
├── volumes/                   # Docker volumes (gitignored)
│   ├── milvus/                # Milvus data
│   ├── etcd/                  # Etcd data
│   └── minio/                 # MinIO data
│
├── .github/                   # GitHub workflows and configs
│   └── copilot-instructions.md # Symlink → ../docs/context/_PROJECT_CONTEXT.md
│
├── src/                       # Application source code (to be created)
│   ├── app/                   # Next.js app directory (or pages/)
│   │   ├── (auth)/           # Route groups
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Dashboard pages
│   │   └── layout.tsx        # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── features/         # Feature-specific components
│   │   └── layouts/          # Layout components
│   ├── lib/                   # Utility functions & configs
│   │   ├── db/               # Database client & utils
│   │   ├── auth/             # Auth utilities
│   │   └── utils/            # General utilities
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── styles/                # Global styles
│   ├── constants/             # App constants
│   └── store/                 # State management (if using Redux/Zustand)
│
├── prisma/                    # Prisma schema & migrations (to be created)
│   ├── schema.prisma
│   └── migrations/
│
├── tests/                     # Test files (to be created)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── public/                    # Static assets (to be created)
│
└── Configuration files (to be created when tech stack is decided)
    ├── .env.example           # Environment variables template
    ├── tsconfig.json          # TypeScript configuration
    ├── next.config.js         # Next.js configuration
    └── tailwind.config.ts     # Tailwind CSS configuration
```

### Import Path Aliases
```typescript
// Configure in tsconfig.json
{
  "@/*": ["./src/*"],
  "@/components/*": ["./src/components/*"],
  "@/lib/*": ["./src/lib/*"],
  "@/hooks/*": ["./src/hooks/*"],
  "@/types/*": ["./src/types/*"]
}
```

---

## 🧪 Testing Strategy

### Testing Pyramid
```
       /\
      /E2E\         ← Few, critical user flows
     /──────\
    /Integration\   ← API + DB interactions
   /────────────\
  /  Unit Tests  \  ← Most tests, business logic
 /────────────────\
```

### Testing Tools
- **Unit**: [e.g., Jest / Vitest]
- **Integration**: [e.g., Testing Library]
- **E2E**: [e.g., Playwright / Cypress]
- **API**: [e.g., Supertest / MSW]

### Testing Conventions
```typescript
// File naming: ComponentName.test.tsx or ComponentName.spec.tsx
// Test structure: Arrange, Act, Assert (AAA)

describe('calculateReturn', () => {
  it('should calculate correct return for given inputs', () => {
    // Arrange
    const principal = 1000
    const rate = 0.05
    const years = 10

    // Act
    const result = calculateReturn(principal, rate, years)

    // Assert
    expect(result).toBeCloseTo(1628.89, 2)
  })
})
```

### Coverage Goals
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical paths
- **E2E Tests**: Main user journeys

---

## 🚢 Deployment

### Environments
- **Development**: `localhost:3000`
- **Staging**: [e.g., `https://staging.wisewealth.app`]
- **Production**: [e.g., `https://wisewealth.app`]

### Deployment Pipeline
```
git push → GitHub Actions → Build → Test → Deploy
```

### Build Process
```bash
# Production build
pnpm build

# Run production server locally
pnpm start

# Build checks
pnpm typecheck
pnpm lint
pnpm test
```

### Environment-Specific Configs
- Development: Hot reload, verbose logging, mock data
- Staging: Production-like, test data, staging APIs
- Production: Optimized, minimal logging, real data

---

## 🤖 Assistant-Specific Notes

### For Claude Code
- Read this file automatically via symlink
- Follow TypeScript strict mode
- Prefer functional components over class components
- Use server components by default in Next.js App Router
- Always run type checks before committing

### For Cursor
- Use Cmd+K for inline edits
- Use Cmd+L for chat-based assistance
- This file is loaded via `.cursorrules` symlink
- Prefer suggesting multiple options for complex decisions

### For Cline
- This file is loaded via `.clinerules` symlink
- Focus on iterative development
- Suggest tests alongside implementation

### For Gemini / Aider / Other Assistants
- Parse this markdown file for context
- Follow the same conventions as above
- When in doubt, ask for clarification before proceeding

---

## 📚 Additional Resources

### Documentation
- [Project README](../../README.md)
- [Quick Start Guide](../../QUICKSTART.md)
- [Codebase Index](./_CODEBASE_INDEX.md) - Quick reference for file locations
- [Indexing Strategy](./_INDEXING_STRATEGY.md) - How indexing is shared across AI tools
- [Sync Summary](./_SYNC_SUMMARY.md) - Quick reference for multi-assistant sync
- [Milvus MCP Setup Guide](../setup/_MILVUS_MCP_GUIDE.md) - Complete guide for vector database setup
- [Gemini MCP Setup](../setup/GEMINI_MCP_SETUP.md) - Gemini-specific MCP configuration
- [Setup Complete Guide](../setup/SETUP_COMPLETE.md) - Setup completion documentation
- [Commands Reference](../commands.md) - Available commands
- [API Documentation](./api.md) _(to be created)_
- [Component Storybook](./storybook.md) _(to be created)_

### External References
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🔄 Context Maintenance

### How to Update This File
1. Edit `docs/context/_PROJECT_CONTEXT.md` directly (this file)
2. Update the version and date at the top
3. Symlinks in root (`.cursorrules`, `.clinerules`, `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`) will automatically reflect changes
4. Notify team members of significant context changes
5. Commit changes with descriptive message: `docs(context): [what changed]`

### Review Schedule
- **Weekly**: Update current tasks and priorities
- **Monthly**: Review and update tech stack decisions
- **Per Sprint**: Update architecture decisions and goals

---

## 📝 Notes & Decisions Log

### 2025-11-17
- **Major project reorganization following best practices**
  - Moved all documentation to organized `docs/` directory structure
    - Created `docs/context/` for project context files
    - Created `docs/setup/` for setup and configuration guides
  - Reorganized config files into `config/mcp/` subdirectory
  - Moved scripts to `scripts/indexing/` for better organization
  - Cleaned root directory from 17+ files to 6 essential files only
  - Updated all symlinks to point to new documentation locations
  - Updated `package.json` and `Makefile` paths to match new structure
  - Removed duplicate `MILVUS_MCP_EXPLAINED.md` file
  - Preserved `.claude/` and `.gemini/` directories in root as requested
- **Updated references across the project**
  - All symlinks now point to `docs/context/_PROJECT_CONTEXT.md`
  - Build scripts updated to use `scripts/indexing/` paths
  - Documentation links updated to reflect new structure

### 2025-11-16
- Initial project structure created
- Set up multi-assistant context sync strategy
- Created comprehensive project context template (`_PROJECT_CONTEXT.md`)
- Created codebase index for navigation (`_CODEBASE_INDEX.md`)
- Documented indexing strategy for cross-tool compatibility (`_INDEXING_STRATEGY.md`)
- **Implemented Milvus MCP server for shared vector indexing**
  - Set up Docker Compose for Milvus database
  - Created MCP configuration for all assistants (Claude Code, Cursor, Cline, Gemini CLI)
  - Built Python indexing scripts for code and documentation
  - Enabled semantic code search across all AI tools
- Selected Milvus as vector database for codebase indexing
- Tech stack and architecture decisions still under evaluation

---

**Last Updated**: 2025-11-17
**Maintained By**: [Your Name / Team]
**Version**: 1.1
