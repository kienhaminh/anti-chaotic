# Rules Creation Guide

## Overview

Workspace rules live in the `.agent/rules` folder of your workspace or git root. Rules are persistent instructions that guide _how_ the Agent thinks and acts.

## Creating Rules via UI

1. Open **Customizations** panel via "..." dropdown in agent panel
2. Navigate to **Rules** panel
3. Select **+ Global** (cross-workspace) or **+ Workspace** (project-specific)

---

## Rule Activation Types

At the rule level, you can define **how** a rule should be activated:

| Type               | Description                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Manual**         | The rule is manually activated via `@mention` in Agent's input box                                                              |
| **Always On**      | The rule is always applied to every interaction                                                                                 |
| **Model Decision** | Based on a natural language description of the rule, the model decides whether to apply the rule                                |
| **Glob**           | Based on the glob pattern you define (e.g., `.js`, `src/**/*.ts`), the rule will be applied to all files that match the pattern |

### When to Use Each Type

- **Manual**: For intensive operations like deep code reviews, refactoring strategies, or specialized analysis that shouldn't run automatically
- **Always On**: For critical project constraints, coding standards, and domain knowledge that must be enforced on every interaction
- **Model Decision**: For context-aware rules that should only apply when relevant (e.g., security guidelines only when working with auth)
- **Glob**: For file-type-specific standards (e.g., React component standards for `.tsx` files)

---

## Rule File Templates

Templates are available in the `../assets/` directory:

- **Always-On Rule**: `../assets/rule-always-on.md`
- **Model-Decision Rule**: `../assets/rule-model-decision.md`
- **Glob-Pattern Rule**: `../assets/rule-glob.md`
- **Manual Rule**: `../assets/rule-manual.md`

Use these templates as a starting point for creating new rules.

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
