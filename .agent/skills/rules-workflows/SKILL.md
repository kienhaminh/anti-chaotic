---
name: rules-workflows
description: Guide for creating and managing Antigravity rules and workflows. Use when creating global/workspace rules to guide agent behavior, creating workflow automation sequences, setting up activation methods (manual, always-on, model-decision, glob patterns), or referencing files with @mentions in rules. Covers both Rules (persistent context at prompt level) and Workflows (structured action sequences at trajectory level).
---

# Rules and Workflows

This skill provides guidance for creating effective rules and workflows in Antigravity.

## Rules Overview

Rules are manually defined constraints that guide Agent behavior at global and workspace levels.

**Storage Locations:**

- **Global**: `~/.gemini/GEMINI.md`
- **Workspace**: `.agent/rules/` folder in workspace or git root

**File Format:** Markdown files, max 12,000 characters each.

### Activation Methods

| Method           | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `manual`         | Activated via `@mention` in Agent's input box                        |
| `always_on`      | Permanently applied to all conversations                             |
| `model_decision` | Model decides based on natural language description                  |
| `glob`           | Auto-applied to files matching pattern (e.g., `*.js`, `src/**/*.ts`) |

### Rule File Structure

```markdown
---
trigger: [activation_method]
globs: [optional_pattern] # For glob trigger only
---

# Rule Title

[Rule content with instructions for the agent]
```

### @ Mentions in Rules

Reference other files using `@filename`:

- Relative paths resolve relative to the rules file
- Absolute paths resolve against filesystem or workspace root

---

## Workflows Overview

Workflows are structured sequences guiding Agent through repetitive tasks.

**Storage Locations:**

- **Global**: `~/.gemini/workflows/`
- **Workspace**: `.agent/workflows/` folder

**File Format:** Markdown files, max 12,000 characters each.

### Workflow File Structure

```markdown
---
description: [short description of what the workflow does]
---

# Workflow Title

## Step 1: [Step Name]

[Instructions for step 1]

## Step 2: [Step Name]

[Instructions for step 2]

// turbo

## Step 3: [Auto-run Step]

[This step auto-runs commands]
```

### Execution

- Invoke with slash command: `/workflow-name`
- Workflows can call other workflows (e.g., a step can be "Call /workflow-2")
- Agent can auto-generate workflows from conversation history

---

## Creating Rules and Workflows

To create rules or workflows, see:

- [references/rules-guide.md](references/rules-guide.md) - Detailed rules creation guide
- [references/workflows-guide.md](references/workflows-guide.md) - Detailed workflows creation guide
