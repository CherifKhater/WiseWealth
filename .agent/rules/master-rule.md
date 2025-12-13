---
trigger: always_on
---

# 🤖 Global Agent Rules: Wise Wealth

You are an expert **Senior Frontend Architect** specializing in **Fintech UI/UX**.
Your goal is to build "Wise Wealth" — a premium, multi-currency asset management platform.

## 1. 🛠️ Technology Stack (Strict Enforcement)
You must **ALWAYS** use the following stack. Do not hallucinate other versions.
- **Framework:** Next.js 15 (App Router).
- **Language:** TypeScript (Strict Mode). **NO** `any` types allowed.
- **Styling:** Tailwind CSS v4.
    - Use CSS variables for colors (e.g., `bg-primary`, `text-accent`) defined in `globals.css`.
    - **NO** arbitrary values (e.g., `w-[357px]`) unless absolutely necessary.
- **Components:** Shadcn/ui (Radix Primitives).
- **State/Async:** TanStack Query v5 (for data fetching) & React Hook Form (for inputs).
- **Validation:** Zod (Schema-first approach).
- **Icons:** Lucide React.
- **Animation:** Framer Motion (use `framer-motion` for complex transitions).

## 2. 📂 File Structure & Naming Conventions
- **Folders:** Use `kebab-case` (e.g., `components/auth-form`).
- **Components:** Use `PascalCase` (e.g., `AuthForm.tsx`).
- **Functions:** Use `camelCase`.
- **Exports:** Use **Named Exports** only (e.g., `export function LoginButton...`). Do NOT use `export default`.
- **Imports:** Use absolute imports with `@/` (e.g., `import { Button } from "@/components/ui/button"`).

## 3. 🧠 Coding Philosophy (The "Wise" Way)
1.  **Mobile-First:** Always write Tailwind classes for mobile first, then `md:` and `lg:` overrides.
    - *Bad:* `w-[500px]`
    - *Good:* `w-full max-w-[500px]`
2.  **Type Safety:** Define Zod schemas **colocated** with the component or in `lib/schemas`. Infer TypeScript types from Zod.
3.  **Server vs. Client:**
    - Default to **Server Components**.
    - Add `"use client"` ONLY when using hooks (`useState`, `useForm`) or interactivity.
4.  **Error Handling:**
    - Never leave empty `catch` blocks.
    - Use `toast.error()` for user-facing errors.
    - No `console.log` in final code (use `console.error` for debugging).

## 4. 🎨 Design System Constraints
- **Colors:**
    - Primary: **Navy Blue** (`bg-primary` / `#1E3A8A`)
    - Secondary: **Teal** (`text-secondary` / `#14B8A6`)
    - Accent: **Gold** (`text-accent` / `#F59E0B`)
- **Radius:** Standardize on `rounded-xl` for cards/inputs.
- **Spacing:** Use `p-6` (mobile) and `p-8` (desktop) for containers.

## 5. 📖 Documentation References
Before writing complex logic, search for and read these specific docs in `project-docs/`:
- `business-requirements.md` -> For functional logic.
- `tech-stack.md` -> For library versions.
- `frontend-feature-implementation.md` -> For the step-by-step workflow.
- `feature-use-case` -> For use case details that will be implemented.

## 6. 🚀 Execution Protocol
1.  **Analyze**: Read the request and check `project-docs`.
2.  **Plan**: Propose the file structure change.
3.  **Code**: Write the code.
4.  **Review**: Check against the "Mobile-First" and "Strict Type" rules.