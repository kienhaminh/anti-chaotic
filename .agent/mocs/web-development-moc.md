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
[[react-  [[vue-      [[nodejs-  [[python-  [[docker-  [[cicd-
 nextjs]]  developer]]   api]]    api]]    compose]]  pipelines]]
   │                                                   │
   ▼                                                   ▼
[[threejs]]                                       [[kubernetes]]
   │
   ├─ requires ── [[webgl-basics]]
   └─ suggests ── [[r3f-best-practices]]

Capability Add-ons (apply to any):
├── [[tailwind-setup]] ──► any frontend
├── [[remotion-best-practices]] ──► requires → [[react-nextjs]]
└── [[prisma]] ──► any backend
```

## Learning Paths

### 🔰 Fullstack Web Agent
**Load Order:** Foundation → Frontend → Backend → Infrastructure
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
[[react-nextjs]]                (~1k tokens)  
    ↓ suggests
[[backend-developer]]           (~2k tokens)
    ↓ suggests  
[[devops-engineer]]             (~1k tokens)
────────────────────────────────────────────
Total Context: ~6k tokens
```

### 🎨 Frontend Specialist Agent
**Focus:** UI/UX, component libraries, creative tech
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
[[react-nextjs]]                (~1k tokens)
    ↓ enhances
[[tailwind-setup]]              (~0.5k tokens)
    ↓ suggests (choose one)
    ├── [[threejs]]             (~2k tokens) ──► 3D/VFX projects
    ├── [[remotion-best-practices]] (~1k tokens) ──► Programmatic video
    └── [[nextjs-testing]]      (~1k tokens) ──► Quality focus
```

### 🚀 SaaS / Indie Maker Agent  
**Stack:** Next.js + API + Database + Payment
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
[[react-nextjs]]                (~1k tokens)
    ↓ requires
[[backend-developer]]           (~2k tokens)
    ↓ suggests
[[prisma]]                      (~0.5k tokens)
    ↓ suggests
[[stripe-integration]]          (~0.5k tokens)
────────────────────────────────────────────
Total Context: ~6k tokens
```

### 🎮 Creative Developer Agent
**Stack:** WebGL, shaders, motion graphics
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
[[threejs]]                     (~2k tokens)
    ↓ requires
[[webgl-basics]]                (~1k tokens)
    ↓ suggests
[[r3f-best-practices]]          (~1k tokens)
    ↓ suggests
[[shaders-webgl]]               (~1k tokens)
────────────────────────────────────────────
Total Context: ~7k tokens
```

## Quick Reference

| I want to... | Start Here |
|--------------|------------|
| Build landing page | [[frontend-developer]] + [[tailwind-setup]] |
| Build fullstack SaaS | [[react-nextjs]] + [[backend-developer]] |
| Add 3D product viewer | [[threejs]] (extends any frontend) |
| Generate videos programmatically | [[remotion-best-practices]] |
| Deploy to production | [[devops-engineer]] |
| Add auth | [[next-auth]] or [[clerk]] |
| Set up database | [[prisma]] or [[supabase]] |

## Cross-Domain Skills

Skills that bridge web with other domains:

| Skill | Bridges To | Use Case |
|-------|-----------|----------|
| [[mobile-developer]] | Mobile MOC | React Native with Next.js patterns |
| [[ai-engineer]] | AI MOC | LLM integration in web apps |
| [[video-production-moc]] | Video MOC | Remotion + video editing |

## Related MOCs

- [[mobile-development-moc]] — React Native, Expo
- [[ai-development-moc]] — LLM integration, RAG, agents
- [[video-production-moc]] — Remotion, motion graphics
- [[infrastructure-moc]] — Low-level DevOps, SRE

---

*Entry point for all web development | [[agent-skills-index]]*
