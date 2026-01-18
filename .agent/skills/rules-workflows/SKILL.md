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
2.  **Orchestrate Capabilities**: Identify which _other_ skills (Frontend, Backend, QA) needed to execute the plan.

### Design Principle: Separation of Concerns

- **Workflows are Processes**: They define the sequence of steps (Step 1 -> Step 2).
- **Workflows are NOT Knowledge**: They should NOT contain hardcoded rules (e.g., WCAG 2.1 ratios, specific library versions).
- **Delegation**: Workflows must **delegate** to Skills/Roles for execution standards.
  - ❌ Bad: `Step 3: Check accessibility using 4.5:1 contrast ratio.`
  - ✅ Good: `Step 3: Verify accessibility compliance using [designer] skill.`

## 📚 Resource Library

### Guides & Templates (`references/`)

- `rules-guide.md`: **Rule Creation Guide**. Contains templates for Always-On, Glob, Manual, and Model Decision rules.
- `workflows-guide.md`: **Workflow Creation Guide**. Contains the standard Feature Implementation workflow template.

### Workflows (`../../workflows/`)

- `workflow-rule-from-feedback.md`: **Learn from User**. Use to enable persistent memory of user preferences.
- `workflow-rule-from-codebase.md`: **Learn from Project**. Use to standardize behavior on existing codebases.

### References (`references/`)

- `orchestration-patterns.md`: **Skill Chaining**. Guides on how to sequence skills (e.g., PM -> Architect -> Dev).

---

## 1. Rules: Shaping Context

Rules are persistent instructions that guide _how_ the Agent thinks and acts. Workspace rules live in the `.agent/rules` folder.

### Rule Activation Types

At the rule level, you can define **how** a rule should be activated:

| Type               | Trigger Value    | Description                                                          |
| ------------------ | ---------------- | -------------------------------------------------------------------- |
| **Manual**         | `manual`         | Activated via `@mention` in Agent's input box                        |
| **Always On**      | `always_on`      | Always applied to every interaction                                  |
| **Model Decision** | `model_decision` | Model decides based on natural language `description` in frontmatter |
| **Glob**           | `glob`           | Applied to files matching the `glob` pattern (e.g., `src/**/*.tsx`)  |

### Examples

Refer to `references/rules-guide.md` for a comprehensive list of rule pattern examples and templates.

### Creation Process

1.  **Ask**: "What specific behaviors or constraints must be enforced?"
2.  **Choose Activation Type**: Select the appropriate trigger based on when the rule should apply
3.  **Draft**: Refer to templates in `references/rules-guide.md`.
4.  **Refine**: Ensure rules are actionable (e.g., "Use Zod for input" vs "Write good code")

### Best Practices

- **Global vs Workspace**: Use valid paths (`~/.gemini/` for global, `.agent/rules/` for workspace)
- **Activation Selection**:
  - Use `always_on` for critical project constraints
  - Use `glob` for file-type specific rules
  - Use `model_decision` for context-aware rules with clear description
  - Use `manual` for intensive operations (@mention to activate)
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
3.  **Draft**: Refer to the template in `references/workflows-guide.md`.

## Workflow Design Standards

Follow the "Feature Implementation" pattern (see `references/workflows-guide.md` for full template details):

### 1. Header & Prereqs

- **Description**: Clear, action-oriented.
- **Rules**: Mandatory reference to global rules (e.g., `documentation.md`).
- **Tool Guidelines**: A table defining _which_ tools (Antigravity native or MCP) to use, _when_, and with _what queries_.

```markdown
## Tool Usage Guidelines

| Tool | When to Use | Example Query |
| ---- | ----------- | ------------- |
| ...  | ...         | ...           |
```

### 2. Step Structure

Each step should be structured for maximum context and autonomy:

1.  **Turbo Annotation**: `// turbo` if the step involves safe, auto-runnable commands.
2.  **Tool Context**: `> 💡 **Tip**: ...` block to guide specific tool usage for this step.
3.  **Skill Actions**: key functionality delegated to skills via `**Invoke [skill-name] skill**`.
4.  **Artifacts**: Explicitly name output files.
5.  **Checkpoints**: Explicit `**WAIT**` states for user confirmation.

**Example Step:**

```markdown
## Step 1: Analyze Requirements

// turbo

> 💡 **Tip**: Use `sequential-thinking` (if available) or `read_file` to parse requirements.

1. **Invoke [product-manager] skill** to refine the request.
2. Create `requirements.md` artifact.
3. **WAIT** for user confirmation.
```

### 3. Summary

- **Quick Reference**: A table at the bottom tracking Step -> Skill -> Output.

---

## 3. Orchestration & Autonomy Rules

### Rule 1: Cross-Skill Collaboration

- **Never** silo skills. A "Code" task usually requires "Architect" input first.
- **Always** check `reference/orchestration-patterns.md` for the correct sequence.

### Rule 2: Sequential Thinking

- **Mandatory** for: Debugging, Architecture Design, and Requirement Analysis.
- **Usage**: Break down problems step-by-step _before_ writing code.

### Rule 3: Strict Validation

- Verify all generated rules/workflows against the official documentation.
- If a workflow fails, **stop**, analyze step-by-step, and propose a fix.

### Rule 4: Process vs Knowledge Separation

- **Strict Enforcement**: When designing, Skills MUST contain Knowledge (Standards, Templates) and Workflows MUST contain Process (Steps, Sequences).
- **No Overlap**: Never hardcode standards in a workflow. Never bury a lifecycle process in a skill.

## 4. Self-Correction & Learning

The Agent can now modify its own rules (Meta-Programming).

### When to use

- **User Correction**: "Don't do X anymore" -> Trigger `workflow-rule-from-feedback`.
- **New Project**: "Read this codebase" -> Trigger `workflow-rule-from-codebase`.
