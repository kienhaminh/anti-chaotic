# Antigravity Rules Standard

This guide defines the **Antigravity Rule Specification**. Rules are contextual constraints that the Agent must follow when triggered.

## 1. File Metadata (Frontmatter)

Every rule MUST start with a YAML frontmatter block:

```yaml
---
trigger: [mode] # model_decision | glob | manual | always_on
description: [Concise summary]
[extra_params]: ... # globs: "**/*.ts"
---
```

## 2. Standard Trigger Modes

1.  **`model_decision`**: **Default Mode**. Triggered automatically during the Agent's reasoning, planning, or tool-selection phases. Use this for general logic and behavior guidance.
2.  **`glob`**: Triggered only when the Agent works with files matching specific path patterns. **MUST** include a `globs: [...]` parameter in frontmatter.
3.  **`manual`**: Only active when the user explicitly references the rule or when explicitly invoked by a Workflow. Use for niche or high-cost operations.
4.  **`always_on`**: Globally and persistently active. These are "Bedrock Rules" that ensure fundamental safety and project integrity across all interactions.

## 3. Structure & Formatting

### A. Priority Alerts

Use GitHub flavored alerts to highlight criticality:

- `> [!IMPORTANT]` for mandatory compliance.
- `> [!WARNING]` for critical traps or legacy issues.

### B. Logical Components

1. **Critical Rules (MUST Follow)**: A numbered list of non-negotiable instructions.
2. **Decision Flow**: An ASCII diagram representing the mental model or verification loop.
3. **Execution Commands**: Specific commands to run (e.g., `npm test`).
4. **Failure Protocol**: What to do when the rule's conditions aren't met.

### C. Visual Logic (ASCII)

Use box-drawing characters for clarity:

```
┌───────────────────────────┐
│ ACTION                    │
├───────────────────────────┤
│ Verification Logic        │
└───────────────────────────┘
```

## 3. Deployment

- **Path**: `.agent/rules/[name].md`
- **Naming**: Use kebab-case (e.g., `security-standards.md`).
