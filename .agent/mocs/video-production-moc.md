---
name: video-production-moc
type: moc
domain: video
status: stable
version: "2.0.0"
description: Hub for video production skills — programmatic video, motion graphics, and content creation.
---

# Video Production MOC

Complete skill graph for programmatic and traditional video production.

## Overview

This domain covers:
- **Programmatic Video**: Remotion, code-generated content
- **Motion Graphics**: After Effects, Lottie, CSS animations
- **Content Strategy**: YouTube, social media, marketing
- **Editing**: Premiere, Final Cut, DaVinci Resolve
- **Streaming**: Live production, OBS, broadcast

## Skill Graph

```
                        [[video-production-moc]]
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
[[marketer]]                                    [[video-
        │                                       editor]]
        ▼                                               │
[[remotion-best-                                ┌──────┴──────┐
practices]]                                      ▼             ▼
        │                                 [[motion-    [[color-
        ▼                                 graphics]]    grading]]
[[react-nextjs]] ←──── requires ─────┘
        │
        ▼
[[frontend-developer]]
```

## Video Stacks

### 🎬 Programmatic Video
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
[[react-nextjs]]                (~1k tokens)
    ↓ requires
[[remotion-best-practices]]     (~2k tokens)
────────────────────────────────────────────
Total Context: ~5k tokens
```

### 📺 Marketing Content
```
[[marketer]]                    (~4k tokens)
    ↓ suggests
[[remotion-best-practices]]     (~2k tokens)
────────────────────────────────────────────
Total Context: ~6k tokens
```

### 🎨 Motion + Web
```
[[designer]]                    (~6k tokens)
    ↓ suggests
[[framer-motion]]               (~2k tokens)
    ↓ requires
[[frontend-developer]]          (~2k tokens)
────────────────────────────────────────────
Total Context: ~10k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Generate videos with code | [[remotion-best-practices]] |
| Create marketing content | [[marketer]] suggests [[remotion-best-practices]] |
| Add animations to web | [[designer]] + [[framer-motion]] |
| Edit traditional video | [[video-editor]] |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[react-nextjs]] | Web MOC | Remotion base |
| [[designer]] | Design MOC | Motion design |
| [[marketer]] | Marketing | Content strategy |

## Related MOCs

- [[web-development-moc]] — Remotion integration
- [[design-moc]] — Motion graphics

---

*Entry point for video production | [[agent-skills-index]]*
