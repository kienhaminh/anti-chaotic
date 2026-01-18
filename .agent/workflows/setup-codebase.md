---
description: Initialize codebase and dependencies based on SDD/ADR
---

# Setup Codebase Workflow

Sets up project structure, installs dependencies, and configures environment based on architectural specs.

> [!IMPORTANT]
> **Prerequisite**: Ensure SDD exists in `docs/030-Specs/Architecture/`.

---

## MCP Usage Guidelines

| MCP Tool                          | When to Use                        |
| --------------------------------- | ---------------------------------- |
| `mcp_context7_resolve-library-id` | Find correct package names         |
| `mcp_context7_query-docs`         | Research installation/config steps |

---

## Step 1: Initialize Framework

// turbo

**Verification**: Check if directory is empty or safe to overwrite.

1. **Invoke `[devops-engineer]` skill** to:
   - Initialize framework (e.g., Next.js, Vite) using `npx`
   - Configure TypeScript, ESLint, TailwindCSS
2. **WAIT** for initialization to complete

---

## Step 2: Install Core Dependencies

// turbo

> 💡 **MCP**: Use `context7` to finding verified package names

1. **Invoke `[devops-engineer]` skill** to install:
   - State management (e.g., zustand, redux)
   - Styling/UI (e.g., clsx, tailwind-merge, framer-motion)
   - Data fetching/Backend (e.g., @supabase/supabase-js, react-query)
   - Utilities (e.g., date-fns, zod)
2. **WAIT** for installation

---

## Step 3: Scaffold Architecture

// turbo

1. **Invoke `[lead-architect]` skill** to:
   - Read SDD for module structure
   - Create core directories (`src/components`, `src/lib`, `src/hooks`)
   - Create feature modules (`src/features/`, `src/modules/`)
2. **WAIT** for structure creation

---

## Step 4: Configuration

// turbo

1. **Invoke `[backend-developer]` skill** to:
   - Setup `.env.example`
   - Configure core utilities (`cn`, `API client`)
   - Setup path aliases (`tsconfig.json`)

---

## Step 5: Verification

// turbo

1. Run `npm run build` to verify configuration
2. Verify directory structure matches SDD

---

## Quick Reference

| Step | Skill             | Action           |
| ---- | ----------------- | ---------------- |
| 1    | devops-engineer   | Init framework   |
| 2    | devops-engineer   | Install deps     |
| 3    | lead-architect    | Create folders   |
| 4    | backend-developer | Config env/utils |
