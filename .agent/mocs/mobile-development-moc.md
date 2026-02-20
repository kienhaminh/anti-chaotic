---
name: mobile-development-moc
type: moc
domain: mobile
status: stable
version: "2.0.0"
description: Hub for mobile development skills — React Native, Expo, iOS, and Android.
---

# Mobile Development MOC

Complete skill graph for cross-platform mobile development.

## Overview

This domain covers:
- **React Native**: Cross-platform with native performance
- **Expo**: Managed workflow, EAS, rapid development
- **UI/UX**: Mobile-first design, gestures, animations
- **Deployment**: App Store, Play Store, OTA updates
- **Native Modules**: Bridging native code when needed

## Skill Graph

```
                        [[mobile-development-moc]]
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            [[mobile-developer]]      [[ios-developer]]
                    │                       │
        ┌───────────┼───────────┐           │
        ▼           ▼           ▼           ▼
[[building-ui]] [[data-    [[deployment]] [[swift-]]
                fetching]]                   developer
        │           │           │
        ▼           ▼           ▼
[[tailwind-   [[api-     [[cicd-
 setup]]       routes]]   workflows]]
        │
        ▼
[[use-dom]] ←──── requires ──── [[frontend-developer]]
```

## Mobile Stacks

### 📱 Expo Full Stack
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
[[mobile-developer]]            (~3k tokens)
    ↓ suggests
[[building-ui]]                 (~3k tokens)
    ↓ enhances
[[tailwind-setup]]              (~1k tokens)
────────────────────────────────────────────
Total Context: ~9k tokens
```

### 🚀 Production Deployment
```
[[mobile-developer]]            (~3k tokens)
    ↓ suggests
[[deployment]]                  (~2k tokens)
    ↓ suggests
[[cicd-workflows]]              (~2k tokens)
────────────────────────────────────────────
Total Context: ~7k tokens
```

### 🎨 Creative Mobile App
```
[[mobile-developer]]            (~3k tokens)
    ↓ suggests
[[use-dom]]                     (~2k tokens) ──► Web components in native
    ↓ requires
[[frontend-developer]]          (~2k tokens)
────────────────────────────────────────────
Total Context: ~7k tokens
```

### ⚡ API-First Mobile
```
[[mobile-developer]]            (~3k tokens)
    ↓ extends
[[data-fetching]]               (~3k tokens)
    ↓ suggests
[[api-routes]]                  (~2k tokens)
    ↓ requires
[[backend-developer]]           (~2k tokens)
────────────────────────────────────────────
Total Context: ~10k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Build cross-platform app | [[mobile-developer]] |
| Style with Tailwind | [[mobile-developer]] + [[tailwind-setup]] |
| Add server-side logic | [[api-routes]] + [[backend-developer]] |
| Deploy to stores | [[deployment]] + [[cicd-workflows]] |
| Use web libraries | [[use-dom]] |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[frontend-developer]] | Web MOC | Shared web/mobile patterns |
| [[backend-developer]] | Web MOC | API for mobile apps |
| [[designer]] | Design MOC | Mobile UI/UX |

## Related MOCs

- [[web-development-moc]] — Shared React patterns
- [[ai-development-moc]] — On-device AI, ML Kit

---

*Entry point for mobile development | [[agent-skills-index]]*
