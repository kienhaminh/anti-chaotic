# SKILL.md Specification v2.0

Knowledge Graph-based skill organization for Anti-Chaotic Agent Kit.

---

## File Structure

```
.agent/
├── skills/
│   └── {skill-name}/
│       ├── SKILL.md          # This file (v2 format)
│       ├── rules/            # Optional: Skill-specific rules
│       └── workflows/        # Optional: Skill-specific workflows
└── mocs/
    └── {domain}-moc.md       # Maps of Content
```

---

## Frontmatter Schema

```yaml
---
name: react-nextjs
type: skill | capability | moc
domain: web | mobile | ai | video | infra
status: stable | draft | deprecated
version: "2.0.0"
estimated_tokens: 15000
---
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Unique identifier (kebab-case) |
| `type` | ✅ | `skill` (core), `capability` (add-on), or `moc` (hub) |
| `domain` | ✅ | Broad category for grouping |
| `status` | Optional | `stable`, `draft`, `deprecated` |
| `version` | ✅ | Semver of this skill |
| `estimated_tokens` | Optional | Approximate size for context budgeting |

---

## Knowledge Graph Section

Required section defining relationships to other skills.

```markdown
## Knowledge Graph

- **extends**: [[parent-skill]] — Inherits all rules/patterns
- **requires**: [[dependency-1]], [[dependency-2]] — Hard deps (auto-install)
- **suggests**: [[optional-skill]] — Soft deps (prompt user)
- **conflicts**: [[incompatible-skill]] — Mutually exclusive (error if both)
- **enhances**: [[base-skill]] — Adds capability without requiring
- **moc**: [[domain-moc]] — Parent Map of Content
```

### Relationship Types

| Type | Direction | Semantics | CLI Behavior |
|------|-----------|-----------|--------------|
| `extends` | A ← B | B is specialization of A | Auto-load A when loading B |
| `requires` | A ← B | B cannot work without A | Auto-install A before B |
| `suggests` | A ↔ B | A works well with B | Prompt user: "Also install B?" |
| `conflicts` | A ⊘ B | Cannot use together | Error if both selected |
| `enhances` | A → B | B adds features to A | Suggest B when A loaded |
| `moc` | A → MOC | A belongs to domain MOC | Used for discovery |

---

## Triggers Section (Optional)

Auto-detection patterns for this skill.

```markdown
## Triggers

- pattern: "next/router"
  confidence: high
- pattern: "app/layout.tsx"
  confidence: medium
- file: "next.config.js"
  confidence: high
```

---

## Content Section

Main skill content (rules, guidelines, examples).

```markdown
## Core Rules

1. **Use Server Components by default** — Only Client Components when interactivity needed
2. **File naming**: Use kebab-case for all files

## Related Notes

- [[nextjs-data-fetching]] — Deep dive on data patterns
- [[nextjs-routing]] — App router specifics
```

---

## Full Example

```markdown
---
name: react-nextjs
type: skill
domain: web
status: stable
version: "2.0.0"
estimated_tokens: 18000
---

# React & Next.js

Best practices for Next.js App Router applications.

## Knowledge Graph

- **extends**: [[frontend-developer]]
- **requires**: [[typescript]]
- **suggests**: [[threejs]], [[remotion-best-practices]]
- **conflicts**: [[vue-developer]], [[angular-developer]]
- **enhances**: [[mobile-developer]] (via Expo Router patterns)
- **moc**: [[web-development-moc]]

## Triggers

- pattern: "next/router|next/navigation"
  confidence: high
- pattern: "app/layout\\.tsx|app/page\\.tsx"
  confidence: high
- file: "next.config\\.(js|ts|mjs)"
  confidence: high

## Core Philosophy

1. **Server Components First** — Default to RSC, use 'use client' sparingly
2. **Colocation** — Keep related code close (CSS, tests, components)
3. **Progressive Enhancement** — Core functionality works without JS

## Quick Rules

| Context | Rule |
|---------|------|
| Data fetching | Use `fetch` with caching, or Server Actions |
| Forms | Server Actions + `useFormStatus` |
| Images | Always use `next/image` |
| Fonts | Use `next/font` for optimization |

## Related Skills

- [[nextjs-data-fetching]] — Caching, revalidation patterns
- [[nextjs-deployment]] — Vercel, Docker, self-host
- [[tailwind-setup]] — If using Tailwind

---

*Part of [[web-development-moc]]*
```

---

## Wiki Link Syntax

Use `[[skill-name]]` to reference other skills:

- `[[react-nextjs]]` → Links to react-nextjs/SKILL.md
- `[[web-development-moc]]` → Links to mocs/web-development-moc.md
- Display text: `[[react-nextjs|Next.js]]` (pipe syntax for alias)

Resolution order:
1. `../{skill-name}/SKILL.md` (sibling skill)
2. `../../mocs/{name}.md` (MOC file)
3. Error if not found

---

## Validation Rules

A valid SKILL.md v2 must:

1. ✅ Have all required frontmatter fields
2. ✅ Include `## Knowledge Graph` section
3. ✅ All wiki links resolve to existing skills/MOCs
4. ✅ No circular `extends` or `requires` relationships
5. ✅ `conflicts` must be bidirectional (if A conflicts B, B conflicts A)

---

## Migration from v1

### Changes

| v1 | v2 |
|----|-----|
| Flat manifest | Graph relationships |
| `sub-skills` array | `extends` + wiki links |
| `parent` field | `extends` relationship |
| `dependencies` array | `requires` + `suggests` |
| `triggers` in manifest | `## Triggers` section inline |

### Migration Script

```bash
# Auto-convert v1 skills to v2
npx anti-chaotic migrate --from v1 --to v2
```
