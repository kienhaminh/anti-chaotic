# Rules Creation Guide

## Creating Rules via UI

1. Open **Customizations** panel via "..." dropdown in agent panel
2. Navigate to **Rules** panel
3. Select **+ Global** (cross-workspace) or **+ Workspace** (project-specific)

## Rule File Templates

### Always-On Rule

```markdown
---
trigger: always_on
---

# [Rule Name]

[Instructions that always apply to this workspace/globally]
```

### Model-Decision Rule

```markdown
---
trigger: model_decision
description: Apply when working with authentication or security features
---

# Security Guidelines

[Security-related instructions for the agent]
```

### Glob-Pattern Rule

```markdown
---
trigger: glob
glob: src/**/*.tsx
---

# React Component Standards

[Standards to apply when editing React components]
```

### Manual Rule

```markdown
---
trigger: manual
---

# [Rule Name]

[Instructions activated via @mention]
```

## Best Practices

1. **Keep rules focused** - One concern per rule file
2. **Use descriptive names** - Rule filename becomes its identifier
3. **Leverage glob patterns** - Auto-apply rules to relevant files
4. **Reference external files** - Use `@filename` to include context
5. **Stay under 12,000 chars** - Split into multiple files if needed

## @ Mentions Syntax

Reference files in rules:

- `@schema.prisma` - Relative to rules file
- `@/docs/api.md` - Absolute from workspace root
- `@../shared/types.ts` - Relative path traversal
