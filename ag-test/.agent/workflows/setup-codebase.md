---
description: Initialize codebase and dependencies based on SDD/ADR
---

# Setup Codebase Workflow

This workflow sets up the **Next.js 16** project structure, installs dependencies, and configures the environment based on `docs/030-Specs/Architecture/SDD-AILearningGame.md`.

> [!WARNING]
> This workflow assumes you want to initialize the project in the current directory. If `package.json` already exists with conflicting dependencies, verify before running.

---

## Step 1: Initialize Framework

**Role: DevOps**

1.  **Initialize Next.js**:
    - We will use `npx create-next-app` to set up the foundation.
    - **Command**: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`
    - _Note_: If the directory is not empty, this command might prompt for confirmation or fail. Ensure you are ready to merge/overwrite.

2.  **Execute Initialization**:
    - **→ Execute `run_command`**: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`

3.  **WAIT** for command completion.

---

## Step 2: Install Project Dependencies

**Role: DevOps**
// turbo

1.  **Install Core Libraries** (State, Analytics, Utils):
    - **→ Execute `run_command`**: `npm install zustand next-intl lucide-react clsx tailwind-merge`

2.  **Install Animation & UI**:
    - **→ Execute `run_command`**: `npm install framer-motion`

3.  **Install Backend/Data**:
    - **→ Execute `run_command`**: `npm install @supabase/supabase-js @supabase/ssr`

4.  **Install Game Engines (Lazy Loaded)**:
    - **→ Execute `run_command`**: `npm install phaser three @types/three @react-three/fiber @react-three/drei @monaco-editor/react`

5.  **Install Dev Tools**:
    - **→ Execute `run_command`**: `npm install -D prettier prettier-plugin-tailwindcss`

---

## Step 3: Scaffold Modular Architecture

**Role: Lead Architect**
// turbo

Create the directory structure defined in `SDD-AILearningGame.md`.

1.  **Create Module Directories**:
    - **→ Execute `run_command`**:
      ```bash
      mkdir -p src/modules/visual-novel/components src/modules/visual-novel/engine src/modules/visual-novel/data
      mkdir -p src/modules/simulation/components src/modules/simulation/scenes src/modules/simulation/entities
      mkdir -p src/modules/code-editor/components src/modules/code-editor/sandbox src/modules/code-editor/challenges
      ```

2.  **Create Core Directories**:
    - **→ Execute `run_command`**:
      ```bash
      mkdir -p src/components/ui src/components/layout
      mkdir -p src/lib/supabase
      mkdir -p src/store
      mkdir -p src/types
      mkdir -p src/hooks
      ```

---

## Step 4: Configuration Files

**Role: Backend Developer**

1.  **Setup Environment Variables**:
    - **→ Execute `write_to_file`**: Create `.env.local.example` with placeholders.
2.  **Setup Utility Helper**:
    - **→ Execute `write_to_file`**: Create `src/lib/utils.ts` with `clsx` and `tailwind-merge` utility.

---

## Step 5: Verification

**Role: QA**

1.  **Verify Structure**:
    - **→ Execute `run_command`**: `ls -R src/modules`
2.  **Verify Build**:
    - **→ Execute `run_command`**: `npm run build`
