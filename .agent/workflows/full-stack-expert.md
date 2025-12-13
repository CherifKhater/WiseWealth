---
description: Expert Full-Stack Web Developer Workflow (Next.js + Supabase)
---

# 🏗️ Class: Expert Full-Stack Developer (Wise Wealth)
**Role:** Senior Full-Stack Architect
**Stack:** Next.js 15, Supabase, Tailwind v4, TypeScript
**Objective:** Build robust, secure, and beautiful functionality by connecting strict backend logic with premium "A++" frontend UI.

---

## 💾 Phase 1: Database & Backend Architecture
*Always start with the data.*

### 1.1 Schema Design (Supabase)
1.  **Draft SQL**: Plan your tables in `supabase/migrations`.
2.  **Security First**: Define RLS (Row Level Security) policies immediately. **Never** leave a table unprotected.
3.  **Types**: Run type generation to keep frontend in sync.
    *   `npx supabase gen types typescript --project-id "$PROJECT_ID" > src/types/supabase.ts`

### 1.2 Server Actions (The API Layer)
**Location**: `src/app/actions/[feature].ts`
1.  **Zod Validation**: Validate **all** inputs using a defined schema.
2.  **Auth Check**: Verify user session at the start of every action.
    ```typescript
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    ```
3.  **Error Handling**: Return typed objects `{ success: boolean, error?: string, data?: T }`. Do not throw raw errors to the client.

---

## 🎨 Phase 2: Premium Frontend Implementation
*The "A++" Visual Layer.*

### 2.1 Component Strategy
1.  **State Management**: Use **TanStack Query** for fetching, **React Hook Form** for mutations.
2.  **Server vs Client**: Fetch data in Server Components, pass to Client Components for interactivity.

### 2.2 "Wise Wealth" Aesthetic Rules
**Strictly Enforce:**
*   **Theme**: Deep Navy (`bg-background`) & Electric Blue (`text-primary`).
*   **Glassmorphism**: Use `backdrop-blur-xl` and white transparency for cards.
*   **Interaction**:
    *   Buttons MUST have `cursor-pointer`.
    *   Inputs MUST have `noValidate` (Custom Zod errors only).
    *   Hover effects MUST be "tactile" (Scale up, Glow, or White Flash).

---

## 🛡️ Phase 3: Robust Integration & Verification
*Connect and Verify.*

### 3.1 Integration Checklist
1.  **Wire up**: Connect the Form `onSubmit` to the Server Action.
2.  **Feedback**: Show a **Sonner Toast** on success/error (use the custom A++ styles).
3.  **Redirect**: Use `redirect()` from `next/navigation` for successful flows.

### 3.2 Quality Assurance
*   **Type Check**: No `any`. No `@ts-ignore`.
*   **Lint**: Fix all ESLint warnings.
*   **User Flow**: Manually test the "Happy Path" and "Error Path".

---

## 🚀 Execution Command
When running this workflow as an agent:
1.  **Plan**: Analyze the `task.md` and `BUSINESS_REQUIREMENTS`.
2.  **Scaffold**: Create the file structure.
3.  **Implement**: Code DB -> Backend -> Frontend.
4.  **Verify**: Check visuals and logic.
