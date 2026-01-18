---
description: Analyze the current codebase to generate a project context rule file.
---

# Workflow: Generate Rule from Codebase

Use this workflow to "learn" the project's existing patterns, stack, and conventions by scanning the codebase. This is useful when joining an existing project.

## Step 1: Discovery Scan

1.  **Read Configuration**: Check `package.json`, `tsconfig.json`, `drizzle.config.ts`, `wrangler.toml`, etc.
2.  **Analyze Structure**: Run `list_dir` on root and `app/` or `src/` to understand the architecture.
3.  **Sample Code**: Read 2-3 representative files (e.g., a component, an API route, a schema definition) to understand coding style (naming, exports, type usage).

## Step 2: Synthesize Observations

Identify key facts:

- **Tech Stack**: Frameworks, ORMs, UI Libraries.
- **Conventions**: File naming (kebab vs camel), Component structure, Data fetching patterns.
- **Directories**: Where does code live? (e.g., `app/routes` vs `src/pages`).

## Step 3: Create Project Rules

Create a file named `.agent/rules/project-rules.md`.

**Content Structure**:

1.  **Project Overview**: One line summary.
2.  **Tech Stack**: Bullet points of major tools.
3.  **Key Conventions**: detailed "Do's and Don'ts".
4.  **Architecture**: Brief explanation of folder structure.

// turbo

## Step 4: Write the File

Use `write_to_file` to create `.agent/rules/project-rules.md`. If it exists, overwrite it with the fresh analysis.

## Step 5: Validation

1.  Check if the new rule aligns with `package.json` dependencies.
2.  Notify the user that project context has been refreshed.
