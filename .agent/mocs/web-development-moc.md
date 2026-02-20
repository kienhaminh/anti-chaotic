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

### 🔰 Beginner → Fullstack Developer
```
Week 1-2:  [[frontend-developer]] (foundation)
Week 3-4:  [[typescript]] (type safety)
Week 5-6:  [[react-nextjs]] (specialization)
Week 7-8:  [[backend-developer]] (APIs)
Week 9-10: [[devops-engineer]] (deploy)
```

### 🎨 Frontend Specialist
```
[[frontend-developer]]
    ↓
[[react-nextjs]] or [[vue-developer]]
    ↓
[[tailwind-setup]] (styling)
    ↓
Choose branch:
    ├── [[threejs]] ──► 3D/VFX
    ├── [[remotion-best-practices]] ──► Video
    └── [[nextjs-testing]] ──► Quality
```

### 🚀 Indie Hacker / SaaS Builder
```
[[frontend-developer]]
    ↓
[[react-nextjs]]
    ↓
[[backend-developer]] + [[prisma]]
    ↓
[[devops-engineer]] + [[stripe-integration]]
    ↓
[[analytics-setup]]
```

### 🎮 Creative Developer
```
[[frontend-developer]]
    ↓
[[threejs]] (fundamentals)
    ↓
[[r3f-best-practices]] (React Three Fiber)
    ↓
[[shaders-webgl]] (custom effects)
    ↓
[[postprocessing-effects]]
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
