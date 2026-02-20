---
name: infrastructure-moc
type: moc
domain: infra
status: stable
version: "2.0.0"
description: Hub for infrastructure skills — DevOps, cloud, SRE, and platform engineering.
---

# Infrastructure MOC

Complete skill graph for infrastructure, DevOps, and platform engineering.

## Overview

This domain covers:
- **CI/CD**: Build pipelines, deployment automation
- **Cloud**: AWS, GCP, Azure, multi-cloud strategies
- **Containers**: Docker, Kubernetes, orchestration
- **Observability**: Monitoring, logging, tracing
- **Security**: Secrets, compliance, hardening

## Skill Graph

```
                        [[infrastructure-moc]]
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
[[devops-engineer]]      [[lead-architect]]      [[sre-engineer]]
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐            ┌────┴────┐
   ▼         ▼             ▼         ▼            ▼         ▼
[[docker-  [[cicd-      [[micro-   [[server-  [[monitoring]] [[security]]
compose]]   pipelines]]   services]] less]]
        │           │
        ▼           ▼
[[kubernetes]] [[terraform]]
```

## Infrastructure Stacks

### ☁️ Full DevOps
```
[[devops-engineer]]             (~3k tokens)
    ↓ suggests
[[docker-compose]]              (~2k tokens)
    ↓ suggests
[[kubernetes]]                  (~3k tokens)
────────────────────────────────────────────
Total Context: ~8k tokens
```

### 🏗️ Cloud Architecture
```
[[lead-architect]]              (~2k tokens)
    ↓ suggests
[[devops-engineer]]             (~3k tokens)
    ↓ suggests
[[terraform]]                   (~2k tokens)
────────────────────────────────────────────
Total Context: ~7k tokens
```

### 🔒 Secure Deployment
```
[[devops-engineer]]             (~3k tokens)
    ↓ enhances
[[backend-developer]]           (~2k tokens)
    ↓ suggests
[[security-auditor]]            (~2k tokens)
────────────────────────────────────────────
Total Context: ~7k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Set up CI/CD | [[devops-engineer]] |
| Deploy to cloud | [[devops-engineer]] + [[terraform]] |
| Scale to Kubernetes | [[kubernetes]] requires [[docker-compose]] |
| Monitor production | [[devops-engineer]] suggests observability |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[backend-developer]] | Web MOC | App deployment |
| [[mobile-developer]] | Mobile MOC | EAS CI/CD |
| [[blockchain-engineer]] | Blockchain | Node deployment |

## Related MOCs

- [[web-development-moc]] — App deployment
- [[ai-development-moc]] — AI service infrastructure

---

*Entry point for infrastructure | [[agent-skills-index]]*
