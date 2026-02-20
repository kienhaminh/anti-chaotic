# MOC (Map of Content) Specification

Hub pages for domain discovery and skill navigation.

---

## Purpose

MOCs serve as:
- **Entry points** for domain exploration
- **Indexes** of related skills
- **Learning paths** from beginner to expert
- **Context boundaries** (what's in scope for this domain)

---

## File Location

```
.agent/mocs/{domain}-moc.md
```

Examples:
- `web-development-moc.md`
- `mobile-development-moc.md`
- `ai-development-moc.md`

---

## Frontmatter

```yaml
---
name: web-development-moc
type: moc
domain: web
status: stable
---
```

Note: MOCs have `type: moc` instead of `type: skill`.

---

## Required Sections

### 1. Domain Overview

Brief description of what this domain covers.

```markdown
## Overview

Web development encompasses frontend frameworks, backend APIs, 
deployment, and browser technologies.
```

### 2. Skill Graph

Visual/text representation of skill relationships.

```markdown
## Skill Graph

```
Core Skills:
├── [[frontend-developer]] ← extends ─┬─ [[react-nextjs]]
│                                     ├─ [[vue-developer]]
│                                     └─ [[svelte-developer]]
├── [[backend-developer]] ← extends ──┬─ [[nodejs-api]]
│                                     └─ [[python-api]]
└── [[devops-engineer]]

Capabilities (add to any):
├── [[threejs]] → enhances → [[frontend-developer]]
├── [[tailwind-setup]] → enhances → any frontend
└── [[remotion-best-practices]] → requires → [[react-nextjs]]
```
```

### 3. Learning Paths

Progressive skill acquisition routes.

```markdown
## Learning Paths

### Beginner → Fullstack Developer
1. [[frontend-developer]] (foundation)
2. [[react-nextjs]] or [[vue-developer]] (specialize)
3. [[backend-developer]] (expand)
4. [[devops-engineer]] (deploy)

### Frontend → 3D/VFX
1. [[frontend-developer]]
2. [[threejs]] (3D graphics)
3. [[r3f-best-practices]] (React Three Fiber)
```

### 4. Quick Reference

Common patterns and where to find them.

```markdown
## Quick Reference

| Task | Skill |
|------|-------|
| Build landing page | [[frontend-developer]] + [[tailwind-setup]] |
| Fullstack SaaS | [[react-nextjs]] + [[backend-developer]] |
| 3D product showcase | [[threejs]] |
| Video generation | [[remotion-best-practices]] |
```

---

## Full Example

```markdown
---
name: web-development-moc
type: moc
domain: web
status: stable
version: "2.0.0"
---

# Web Development MOC

Complete guide to modern web development skills.

## Overview

This domain covers:
- **Frontend**: React, Vue, Angular, vanilla JS
- **Backend**: Node.js, Python, Go APIs
- **Deployment**: Vercel, Docker, AWS
- **Specialized**: 3D graphics, video, real-time

## Skill Graph

```
                    [[web-development-moc]]
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
[[frontend-developer]] [[backend-developer]] [[devops-engineer]]
        │                       │                   │
   ┌────┴────┐             ┌────┴────┐            │
   ▼         ▼             ▼         ▼            ▼
[[react-  [[vue-      [[nodejs-  [[python-  [[docker-
 nextjs]]  developer]]   api]]    api]]    compose]]
   │                                          │
   ▼                                          ▼
[[threejs]]                              [[kubernetes]]
   │
   ▼
[[r3f-best-practices]]
```

## Learning Paths

### Path A: Modern React Developer
```
[[frontend-developer]] → [[typescript]] → [[react-nextjs]] → [[tailwind-setup]]
```

Optional branches:
- Add 3D: → [[threejs]]
- Add video: → [[remotion-best-practices]]
- Add mobile: → [[react-native]]

### Path B: Fullstack Indie Hacker
```
[[frontend-developer]] → [[backend-developer]] → [[devops-engineer]]
```

### Path C: Creative Developer
```
[[frontend-developer]] → [[threejs]] → [[shaders-webgl]]
```

## Related MOCs

- [[mobile-development-moc]] — React Native, Expo
- [[ai-development-moc]] — LLM integration, RAG
- [[video-production-moc]] — Remotion, motion graphics

## Quick Start

New project? Pick based on your stack:

| Stack | Start Here |
|-------|------------|
| Next.js + TypeScript | [[react-nextjs]] |
| Vue + Nuxt | [[vue-developer]] |
| React Native | [[mobile-development-moc]] |
| Three.js 3D | [[threejs]] |

---

*Backlinks: [[agent-skills-index]]*
```

---

## Best Practices

1. **Keep MOCs shallow** — Max 3 levels of skill hierarchy shown
2. **Link bidirectionally** — Skills point to MOC, MOC lists skills
3. **Update on new skills** — Add new skills to relevant MOCs
4. **Multiple MOCs OK** — A skill can belong to multiple domains (e.g., [[threejs]] in both web and video)
