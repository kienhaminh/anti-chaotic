---
name: rules-workflows
description: Expert Guide for orchestrating Agent behaviors via Rules and Workflows. Capabilities include Autonomous Reasoning, Agile Process Management, and Cross-Skill Orchestration. Use to standardize project context (Rules) or automate complex multi-step tasks (Workflows).
license: MIT
compatibility: Requires Antigravity CLI
allowed-tools: read_file write_to_file run_command
---

# Rules & Workflows Orchestrator

This skill empowers the Agent to act as an **Autonomous Process Orchestrator**, managing its own behavior and workflows to align with Agile best practices and project constraints.

## 🧠 Core Philosophy: Autonomy & Reasoning

**"Think before you Act"**

Before creating any rule or workflow, the Agent MUST:

1.  **Analyze the Goal**: What is the user trying to achieve? (e.g., "Add a feature", "Fix a bug").
2.  **Determine the Strategy**: Use `sequential-thinking` to plan the steps.
3.  **Orchestrate Capabilities**: Identify which _other_ skills (Frontend, Backend, QA) needed to execute the plan.

## 📚 Resource Library

### Templates (`assets/templates/`)

- `workflow-agile-feature.md`: **Standard Agile Flow**. Use for end-to-end feature delivery (Requirements -> Spec -> Code -> QA).
- `rule-project-context.md`: **Project Insight Rule**. Use to capture domain knowledge, tech stack, and rigid constraints.

### References (`references/`)

- `orchestration-patterns.md`: **Skill Chaining**. Guides on how to sequence skills (e.g., PM -> Architect -> Dev).

---

## 1. Rules: Shaping Context

Rules are persistent instructions that guide _how_ the Agent thinks and acts.

### Creation Process

1.  **Ask**: "What specific behaviors or constraints must be enforced?"
2.  **Draft**: Use `assets/templates/rule-project-context.md` as a base.
3.  **Refine**: Ensure rules are actionable (e.g., "Use Zod for input" vs "Write good code").

### Best Practices

- **Global vs Workspace**: Use valid paths (`~/.gemini/` for global, `.agent/rules/` for workspace).
- **Triggers**: Prefer `always_on` for critical project constraints. Use `glob` for file-type specific rules.
- **Fail on Error**: Rule syntax is strict. A bad rule can break the Agent. Validate always.

---

## 2. Workflows: Automating Process

Workflows are structured "recipes" for complex tasks.

### usage: The Agile Way

Instead of generic "write code", use structured flows:

> User: "Implement the login feature"

**Agent Response (Internal Monologue):**

1.  _Trigger_: `workflow-agile-feature.md`.
2.  _Step 1 (PM)_: Analyze requirements for "Login".
3.  _Step 2 (Arch)_: Design Auth schema in Supabase.
4.  _Step 3 (Dev)_: Implement components.
5.  _Step 4 (QA)_: Verify login flow.

### Creation Process

1.  **Map the Process**: Identify the roles and steps involved.
2.  **Select Pattern**: Consult `references/orchestration-patterns.md`.
3.  **Draft**: Use `assets/templates/workflow-agile-feature.md` as a base.

### Workflow Syntax Refresher

```markdown
## Step 1: [Step Name]

[Instructions]

// turbo (Optional: Auto-run commands)

## Step 2: [Next Step]
```

---

## 3. Orchestration & Autonomy Rules

### Rule 1: Cross-Skill Collaboration

- **Never** silo skills. A "Code" task usually requires "Architect" input first.
- **Always** check `reference/orchestration-patterns.md` for the correct sequence.

### Rule 2: Sequential Thinking

- **Mandatory** for: Debugging, Architecture Design, and Requirement Analysis.
- **Usage**: call `sequential-thinking` to generate a hypothesis or plan _before_ writing code.

### Rule 3: Strict Validation

- Verify all generated rules/workflows against the official documentation.
- If a workflow fails, **stop**, analyze with `sequential-thinking`, and propose a fix.
