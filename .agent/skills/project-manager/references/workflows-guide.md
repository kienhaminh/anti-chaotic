# Antigravity Workflows Standard

This guide defines the **Antigravity Workflow Specification**. Workflows orchestrate multiple skills and tools for complex task completion.

## 1. File Metadata (Frontmatter)

```yaml
---
description: [Summary starting with a verb, e.g., "Orchestrates..."]
---
```

## 2. Structure & Formatting

### A. Stage-Based Steps

Use `## Step N: [Phase Name]` for major progress markers.

### B. Annotations & Callouts

- **Turbo**: Use `// turbo` above a step to denote auto-run compatibility.
- **MCP Callouts**: Use the following format for tool suggestions:
  `> 💡 **MCP**: Use [tool-name] for [purpose]`
- **Rule References**: Always link to required rules:
  `> 💡 **MANDATORY**: Follow [.agent/rules/name.md](file:///path/to/rule.md)`

### C. Skill Integration

Explicitly state which skill should be invoked:

- "Invoke `[backend-developer]` skill to..."

### D. Quick Reference Table

Include a summary table at the end of the file:
| Step | Skill | Output |
| :--- | :--- | :--- |
| 1 | research | markdown |

## 3. Best Practices

1. **Vertical Slicing**: Ensure steps lead to a functional "slice" of value.
2. **Checkpoints**: Use **WAIT** in bold to indicate where user feedback is strictly required.
3. **Pathing**: Use absolute `file:///` URIs for internal links to ensure they are clickable.
