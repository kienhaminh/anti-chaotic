---
name: product-development-moc
type: moc
domain: product
status: stable
version: "2.0.0"
description: Hub for product development skills — project management, business analysis, and product strategy.
---

# Product Development MOC

Complete skill graph for product management and development processes.

## Overview

This domain covers:
- **Project Management**: Planning, roadmaps, prioritization
- **Business Analysis**: Requirements, user stories, specs
- **Product Strategy**: Vision, roadmap, OKRs
- **Process**: Agile, workflows, governance
- **Stakeholder Management**: Communication, reporting

## Skill Graph

```
                        [[product-development-moc]]
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
[[project-manager]]      [[business-analysis]]    [[product-owner]]
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐            ┌────┴────┐
   ▼         ▼             ▼         ▼            ▼         ▼
[[roadmap]] [[agile-    [[user-    [[technical- [[stakeholder]] [[metrics]]
           frameworks]]  stories]]  specs]]
        │
        ▼
[[qa-tester]] ←──── enhances ──── [[business-analysis]]
```

## Product Stacks

### 📋 Requirements to Delivery
```
[[business-analysis]]           (~4k tokens)
    ↓ suggests
[[project-manager]]             (~4k tokens)
    ↓ suggests
[[qa-tester]]                   (~4k tokens)
────────────────────────────────────────────
Total Context: ~12k tokens
```

### 🎯 Agile Team
```
[[project-manager]]             (~4k tokens)
    ↓ suggests
[[business-analysis]]           (~4k tokens)
    ↓ enhances
[[lead-architect]]              (~2k tokens)
────────────────────────────────────────────
Total Context: ~10k tokens
```

### 🚀 Product Launch
```
[[project-manager]]             (~4k tokens)
    ↓ suggests
[[designer]]                    (~6k tokens)
    ↓ suggests
[[marketer]]                    (~4k tokens)
────────────────────────────────────────────
Total Context: ~14k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Plan a project | [[project-manager]] |
| Write requirements | [[business-analysis]] |
| Define roadmap | [[project-manager]] + [[business-analysis]] |
| Manage stakeholders | [[project-manager]] suggests stakeholder skills |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[lead-architect]] | Infrastructure | Technical decisions |
| [[designer]] | Design | UX planning |
| [[qa-tester]] | QA | Quality gates |

## Related MOCs

- [[web-development-moc]] — Development execution
- [[design-moc]] — Product design

---

*Entry point for product development | [[agent-skills-index]]*
