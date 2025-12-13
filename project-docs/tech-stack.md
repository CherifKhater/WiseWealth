
# Wise Wealth - Technical Stack Rules

All code generated for this project MUST adhere to the following stack. Do not downgrade versions or switch libraries without explicit permission.

## Frontend Core
- **Framework**: Next.js 15 (App Router architecture).
- **Language**: TypeScript (Strict mode enabled).
- **Styling**: Tailwind CSS v4. Use CSS variables for colors (e.g., `var(--color-primary)`).

## UI & Design
- **Components**: Shadcn/ui. (Do not install MUI, Chakra, or Bootstrap).
- **Icons**: Lucide React.
- **Animation**: Framer Motion (use for page transitions and micro-interactions).
- **Fonts**: Inter (headings & body), JetBrains Mono (financial data/numbers).

## Logic & State
- **Validation**: Zod (schema-first validation).
- **Forms**: React Hook Form.
- **Async State**: TanStack Query v5.
- **Date Handling**: date-fns.

## Package Manager
- **npm** (or pnpm if preferred, but stay consistent).