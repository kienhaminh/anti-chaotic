---
name: web-development-moc
type: moc
domain: web
status: stable
version: "2.0.0"
description: Hub for all web development skills — frontend, backend, and deployment.
---

# Web Development MOC

Complete skill graph for modern web development.

## Overview

This domain covers:
- **Frontend**: React, Vue, Angular, and specialized capabilities (3D, video)
- **Backend**: Node.js, Python, Go APIs and databases
- **Infrastructure**: Docker, CI/CD, deployment platforms
- **Cross-domain**: Fullstack, JAMstack, edge computing

## Skill Graph

```
                        [[web-development-moc]]
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
[[frontend-developer]]    [[backend-developer]]    [[devops-engineer]]
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐            ┌────┴────┐
   ▼         ▼             ▼         ▼            ▼         ▼
 react/    [[vue-      [[python-  [[docker-  [[cicd-
 nextjs/   developer]]   api]]    compose]]  pipelines]]
   │
   ├─ threejs/ (3D capability)
   └─ tailwind-setup/ (styling)

Capability Add-ons (apply to any):
├── tailwind-setup ──► any frontend
├── remotion-best-practices ──► React video generation
└── prisma ──► any backend
```

## Modular Skill Structure

### Frontend Developer ([[frontend-developer]])
Base skill with modular sub-capabilities:

| Sub-capability | Location | Tokens | Use When |
|:---------------|:---------|:-------|:---------|
| React/Next.js | `react-nextjs/` | ~18k | App Router projects |
| Three.js | `threejs/` | ~8k | 3D graphics, WebGL |
| Tailwind | `tailwind-setup/` | ~3k | Utility-first styling |

Load via: "Load `frontend-developer/react-nextjs/` for Next.js patterns"

## Learning Paths

### 🔰 Fullstack Web Agent
**Load Order:** Foundation → Frontend → Backend → Infrastructure
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends (load react-nextjs/)
    + react-nextjs/               (~18k tokens)
    ↓ suggests
[[backend-developer]]           (~35k tokens)
    ↓ suggests  
[[devops-engineer]]             (~1k tokens)
────────────────────────────────────────────
Total Context: ~56k tokens
```

### 🎨 Frontend Specialist Agent
**Focus:** UI/UX, component libraries, creative tech
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends (load react-nextjs/)
    + react-nextjs/               (~18k tokens)
    ↓ enhances (load tailwind-setup/)
    + tailwind-setup/             (~3k tokens)
    ↓ suggests (choose capability)
    ├── threejs/                  (~8k tokens) ──► 3D/VFX projects
    ├── [[remotion-best-practices]] (~10k tokens) ──► Programmatic video
    └── [[qa-tester]]             (~8k tokens) ──► Quality focus
```

### 🚀 SaaS / Indie Maker Agent  
**Stack:** Next.js + API + Database + Payment
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
    + react-nextjs/               (~18k tokens)
    ↓ requires
[[backend-developer]]           (~35k tokens)
    ↓ suggests
[[docker-compose]]              (~2k tokens)
────────────────────────────────────────────
Total Context: ~57k tokens
```

### 🎮 Creative Developer Agent
**Stack:** WebGL, shaders, motion graphics
```
[[frontend-developer]]          (~2k tokens)
    ↓ load capability
    + threejs/                    (~8k tokens)
    ↓ requires (optional)
    + [[react-nextjs]] (if using R3F)
────────────────────────────────────────────
Total Context: ~28k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Build landing page | [[frontend-developer]] |
| Build Next.js app | [[frontend-developer]] → load `react-nextjs/` |
| Add 3D product viewer | [[frontend-developer]] → load `threejs/` |
| Build fullstack SaaS | [[frontend-developer]] + [[backend-developer]] |
| Generate videos programmatically | [[remotion-best-practices]] |
| Deploy to production | [[devops-engineer]] |
| Add auth | next-auth or clerk |
| Set up database | prisma or supabase |

## Cross-Domain Skills

Skills that bridge web with other domains:

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[mobile-developer]] | Mobile MOC | React Native with Next.js patterns |
| [[ai-engineer]] | AI MOC | LLM integration in web apps |
| [[video-production-moc]] | Video MOC | Remotion + video editing |

## Related MOCs

- [[mobile-development-moc]] — React Native, Expo
- [[ai-development-moc]] — LLM integration, RAG, agents
- [[video-production-moc]] — Remotion, motion graphics
- [[infrastructure-moc]] — Low-level DevOps, SRE

---

*Entry point for all web development | Modular sub-capabilities in subdirectories*
