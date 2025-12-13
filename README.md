# 💎 Wise Wealth

> **Track. Analyze. Optimize.**  
> A premium, multi-currency asset management platform designed for the modern investor.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-MVP%20Foundation-orange)

## 📖 Overview

**Wise Wealth** empowers investors to achieve complete financial visibility. Unlike traditional trackers, it is built from the ground up to handle **multi-currency portfolios** (optimized for EGP/USD) and diverse asset classes including **Real-Time Precious Metals**.

Built with a **"Deep Navy"** stealth-wealth aesthetic, it offers reliable, secure, and data-driven insights to help optimize your net worth.

---

## 🚀 Core Features (MVP Phase)

### 🔐 Identity & Security (Epic 1 - Completed)
*   **Secure Authentication**: Robust Email/Password flows with PKCE.
*   **Google OAuth**: Seamless one-tap social login.
*   **Adaptive MFA**: Intelligent protection that challenges logins from **unknown devices** while keeping trusted access frictionless.
*   **User Enumeration Protection**: Enterprise-grade security against account probing.
*   **Premium UI**: Glassmorphism cards, framer-motion entrances, and a stunning Dark Mode interface.

---

## 🛠️ Technology Stack

We rely on a bleeding-edge, strictly typed stack to ensure performance and scalability.

| Layer | Technology |
|-------|------------|
| **Framework** | **Next.js 15** (App Router) |
| **Language** | **TypeScript** (Strict Mode) |
| **Styling** | **Tailwind CSS v4** (OKLCH Color Space) |
| **UI Library** | **Shadcn/UI** (Radix Primitives) |
| **Animation** | **Framer Motion** |
| **Backend/Auth** | **Supabase** (Auth, DB, RLS) |
| **State** | **TanStack Query v5** |
| **Forms** | **React Hook Form** + **Zod** |

---

## 📚 Documentation

For deep dives into the project's architecture and rules, refer to our internal documentation:

*   📄 **[Business Requirements Document (BRD)](project-docs/BUSINESS_REQUIREMENTS_DOCUMENT.md)**  
    *Detailed functional requirements, user stories, and roadmap.*
*   🎨 **[Design System Guide](project-docs/DESIGN_SYSTEM_GUIDE.md)**  
    *The "Deep Navy" theme, color tokens, typography, and component patterns.*
*   ⚙️ **[Tech Stack & Rules](project-docs/tech-stack.md)**  
    *Strict coding standards and library versions.*

---

## ⚡ Getting Started

### Prerequisites
*   Node.js 20+
*   npm or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/cherifkhater/Wise-Wealth.git
    cd Wise-Wealth
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment:**
    Copy the example env file and fill in your Supabase credentials:
    ```bash
    cp .env.example .env.local
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🏗️ Project Structure

```bash
src/
├── app/                # Next.js App Router (Pages & Layouts)
│   ├── actions/        # Server Actions (Backend Logic)
│   ├── auth/           # Authentication Routes
│   └── globals.css     # Global Styles (Tailwind/Theme)
├── components/         # React Components
│   ├── auth/           # Auth-specific forms & layouts
│   └── ui/             # Shadcn Reusable UI Components
├── lib/                # Utilities & Zod Schemas
└── types/              # TypeScript Definitions
```

---

## 📄 License
This project is for personal portfolio usage and internal development.

---
*Built with ❤️ by the Wise Wealth Product Team.*
