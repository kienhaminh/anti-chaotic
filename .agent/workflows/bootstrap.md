---
description: Sets up project structure, installs dependencies, and configures environment based on architectural specs.
---

# Bootstrap Workflow

> [!IMPORTANT]
> **Prerequisite**: Ensure SDD exists in `docs/030-Specs/Architecture/`.

---

## MCP Usage Guidelines

| MCP Tool                          | When to Use                        |
| :-------------------------------- | :--------------------------------- |
| `mcp_context7_resolve-library-id` | Find correct package names         |
| `mcp_context7_query-docs`         | Research installation/config steps |

---

## Step 1: Framework Initialization & Structure

// turbo

1. **Invoke `[lead-architect]` skill** to:
   - Define the project root structure (Monorepo vs Polyrepo)
   - Initialize the base project (e.g., `git init`, `npx create-next-app`)
   - Create the directory skeleton based on SDD
2. **WAIT** for initialization

---

## Step 2: Maintenance & Quality Engineering Tools

// turbo

> 💡 **Role**: DevOps Engineer ensures the "Development Experience" (DX) is solid.

1. **Invoke `[devops-engineer]` skill** to install & configure:
   - **Quality Tools**: ESLint, Prettier, TypeScript config
   - **Git Hooks**: Husky, Lint-staged, Commitlint
   - **CI/CD**: Github Actions (basic build/test)
2. Verify: Run `npm run lint` and ensure hooks fire on commit.

---

## Step 3: Frontend Setup

// turbo

> 💡 **Role**: Frontend Developer manages the UI/Client side.

1. **Invoke `[frontend-developer]` skill** to:
   - **UI Ecosystem**: Install TailwindCSS, Radix/Shadcn, Framer Motion
   - **State Manager**: Zustand/Jotai/Redux
   - **Structure**: Setup `src/components`, `src/hooks`, `src/pages` (or `app`)
   - **Assets**: Configure font loaders, image optimization
2. **WAIT** for installation

---

## Step 4: Backend Setup

// turbo

> 💡 **Role**: Backend Developer manages the Data/Server side.

1. **Invoke `[backend-developer]` skill** to:
   - **Database**: Setup Prisma/Drizzle/Supabase client
   - **API**: Configure API routes/Server Actions
   - **Validation**: Install Zod/Valibot
   - **Environment**: Create `.env.example` and validate `.env` keys
2. **WAIT** for installation

---

## Step 5: Final Validation

// turbo

1. **Invoke `[devops-engineer]` skill** to:
   - Run full build `npm run build`
   - Test Type-checking `tsc --noEmit`
2. **Invoke `[product-manager]`** to update Roadmap status to "In Progress"

---

## Quick Reference

| Step | Skill              | Action                      |
| :--- | :----------------- | :-------------------------- |
| 1    | lead-architect     | Init Framework & Structure  |
| 2    | devops-engineer    | Husky, Linter, CI/CD        |
| 3    | frontend-developer | Tailwind, Components, State |
| 4    | backend-developer  | DB, API, Env                |
| 5    | devops-engineer    | Final Build Check           |
