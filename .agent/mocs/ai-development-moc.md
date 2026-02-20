---
name: ai-development-moc
type: moc
domain: ai
status: stable
version: "2.0.0"
description: Hub for AI/ML development skills — LLM integration, RAG, agents, and prompt engineering.
---

# AI Development MOC

Complete skill graph for AI-powered application development.

## Overview

This domain covers:
- **LLM Integration**: OpenAI, Anthropic, Google, local models
- **RAG Systems**: Vector databases, embeddings, retrieval
- **Agent Frameworks**: Multi-agent workflows, tool use
- **Prompt Engineering**: Effective prompt design and optimization
- **Evaluation**: Testing, metrics, guardrails

## Skill Graph

```
                        [[ai-development-moc]]
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
[[ai-engineer]]          [[prompt-engineer]]      [[langchain]]
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐            ┌────┴────┐
   ▼         ▼             ▼         ▼            ▼         ▼
[[backend-  [[frontend-  [[skill-   [[openai-   [[evaluation-
developer]] developer]]   creator]]  integration]] frameworks]]
   │            ↑                      │
   └────────────┴──────────────────────┘
         [[ai-integration]]
```

## Modular Skill Structure

### AI Engineer ([[ai-engineer]])
Base skill with modular sub-capabilities:

| Sub-capability | Location | Tokens | Use When |
|:---------------|:---------|:-------|:---------|
| Vector Databases | `vector-db/` | ~6k | RAG, semantic search |
| Agentic Patterns | `references/agentic-patterns.md` | ~8k | Multi-agent systems |
| RAG Advanced | `references/rag-advanced.md` | ~12k | Complex retrieval |

Load via: "Load `ai-engineer/vector-db/` for RAG implementation"

## Agent Stacks

### 🤖 LLM-Powered Backend
```
[[backend-developer]]           (~35k tokens)
    ↓ extends
[[ai-engineer]]                 (~25k tokens)
    ↓ load sub-capability
    + vector-db/                  (~6k tokens)
    ↓ suggests
[[prompt-engineer]]             (~25k tokens)
────────────────────────────────────────────
Total Context: ~91k tokens
```

### 🎨 AI-Enhanced Frontend
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
    + react-nextjs/               (~18k tokens)
    ↓ enhances
[[ai-engineer]]                 (~25k tokens) ──► AI UI patterns
    ↓ suggests
[[prompt-engineer]]             (~25k tokens)
────────────────────────────────────────────
Total Context: ~70k tokens
```

### 🧪 Prompt Engineering Specialist
```
[[ai-engineer]]                 (~25k tokens)
    ↓ extends
[[prompt-engineer]]             (~25k tokens)
    ↓ suggests
[[skill-creator]]               (~2k tokens)
────────────────────────────────────────────
Total Context: ~52k tokens
```

### 🔍 RAG Specialist
```
[[ai-engineer]]                 (~25k tokens)
    ↓ load sub-capability
    + vector-db/                  (~6k tokens)
    ↓ load reference
    + rag-advanced.md             (~12k tokens)
────────────────────────────────────────────
Total Context: ~43k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Add chatbot to app | [[ai-engineer]] + [[backend-developer]] |
| Build RAG pipeline | [[ai-engineer]] → load `vector-db/` |
| Design better prompts | [[prompt-engineer]] |
| Create AI agents | [[ai-engineer]] → load agentic patterns |
| Optimize LLM costs | [[ai-engineer]] serving optimization |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[backend-developer]] | Web MOC | API for AI features |
| [[frontend-developer]] | Web MOC | AI-powered UI |
| [[devops-engineer]] | Infra MOC | Deploy AI services |

## Related MOCs

- [[web-development-moc]] — Web apps with AI features
- [[infrastructure-moc]] — Deploying AI at scale
- [[mobile-development-moc]] — On-device AI, mobile SDKs

---

*Entry point for AI development | Modular sub-capabilities in subdirectories*
