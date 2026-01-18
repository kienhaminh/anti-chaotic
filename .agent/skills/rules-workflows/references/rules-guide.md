# High-Performance Rule Governance

> "Rules are the automated guardrails that ensure consistency without micromanagement."

This guide establishes the framework for defining, enforcing, and managing Agent behavior standards across the organization.

## 1. The Core Philosophy

In a high-functioning AI-driven organization, Rules serve two critical functions:

1.  **Context Injection**: Instantly downloading "Senior Engineer" context into the Agent's specific session.
2.  **Operational Guardrails**: Preventing known anti-patterns (e.g., "Never commit secrets", "Always use strict TS").

| Level                 | Purpose                                | Example                    |
| :-------------------- | :------------------------------------- | :------------------------- |
| **L1: Critical**      | Security & Compliance (Non-negotiable) | `security-policy.md`       |
| **L2: Architectural** | Tech Stack Standards                   | `nextjs-best-practices.md` |
| **L3: Stylistic**     | Team preferences                       | `naming-conventions.md`    |

## 2. Activation Strategy (Context Management)

The key to a responsive Agent is _Selective Activation_. Loading 100 rules confuses the context. Use activation types strategically.

### A. The "Always On" (Global Constitution)

**Use sparingly.** Only for rules that apply to _every_ single keystroke.

- **Triggers**: `always_on`
- **Use Case**: Safety checks, Tone of Voice, Core Documentation links.
- **Cost**: Consumes context window on every turn.

### B. The "Just-in-Time" (Context-Aware)

**The Gold Standard.** Rules that activate only when relevant.

- **Triggers**: `model_decision` (based on description) or `glob` (based on files).
- **Use Case**:
  - If user asks about "Auth" -> Load `auth-guidelines.md`.
  - If editing `.tsx` files -> Load `react-component-standards.md`.

### C. The "Surgical" (Manual Override)

**For heavy-duty tasks.**

- **Triggers**: `manual`
- **Use Case**: "Refactor this legacy code." -> User explicitly calls `@refactoring-rules`.

## 3. Designing Effective Rules

A rule is a **Directive**, not a suggestion.

### ❌ Weak Rule

> "Try to write good variable names and maybe use TypeScript if you can."

### ✅ Strong Rule

> **Constraint**: All variables MUST follow `camelCase`.
> **Requirement**: TypeScript `strict` mode is MANDATORY. `any` type is strictly FORBIDDEN.

## 4. Governance & Lifecycle

Avoid "Rule Bloat" (Bureaucracy).

1.  **Consolidate**: Don't have `button-rules.md` and `input-rules.md`. Have `ui-components.md`.
2.  **Review**: If the Agent frequently ignores a rule, it is likely too vague or conflicting. Clarify or Delete it.
3.  **Hierarchy**: Workspace Rules override Global Rules. Specific Rules override General Rules.

## 5. Standard Rule Template

Use this structure to create enforceable, high-clarity rules.

```markdown
---
description:
  [When should this apply? e.g., "Applied when editing Database Schema"]
globs: ["prisma/schema.prisma"]
---

# [Rule Name, e.g., Database Schema Standards]

## 1. Executive Summary

All database changes must preserve backward compatibility and follow 3NF normalization.

## 2. Critical Constraints (The "Musts")

- 🔴 **NEVER** delete columns in a migration. Mark as `@deprecated` instead.
- 🔴 **NEVER** use `autoincrement()` for publicly exposed IDs. Use `uuid()`.

## 3. Code Patterns (The "How")

### Naming

- Tables: `snake_case` (plural), e.g., `users`, `order_items`.
- Foreign Keys: `noun_id`, e.g., `user_id`.

### Example

✅ **Good**:
model User {
id String @id @default(uuid())
}

❌ **Bad**:
model User {
id Int @id @default(autoincrement())
}
```

## 6. Advanced Context Injection

You can "hydrate" rules with dynamic context using `@` references.

- **`@/docs/api-spec.md`**: "Enforce the API contract defined in this file."
- **`@../shared/types.ts`**: "Use these exact types."

This allows the rule to remain static (the _policy_) while referencing dynamic content (the _data_).
