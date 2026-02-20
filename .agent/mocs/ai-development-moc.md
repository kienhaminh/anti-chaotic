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
[[ai-engineer]]          [[prompt-engineer]]      [[vector-db]]
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐            ┌────┴────┐
   ▼         ▼             ▼         ▼            ▼         ▼
[[backend-  [[frontend-  [[skill-   [[lang-    [[pinecone]] [[chroma]]
developer]] developer]]   creator]]  chain]]
   │            ↑                      │
   └────────────┴──────────────────────┘
         [[ai-integration]]
```

## Agent Stacks

### 🤖 LLM-Powered Backend
```
[[backend-developer]]           (~2k tokens)
    ↓ extends
[[ai-engineer]]                 (~4k tokens)
    ↓ requires
[[vector-db]]                   (~2k tokens)
    ↓ suggests
[[prompt-engineer]]             (~2k tokens)
────────────────────────────────────────────
Total Context: ~10k tokens
```

### 🎨 AI-Enhanced Frontend
```
[[frontend-developer]]          (~2k tokens)
    ↓ extends
[[react-nextjs]]                (~1k tokens)
    ↓ enhances
[[ai-engineer]]                 (~4k tokens) ──► AI UI patterns
    ↓ suggests
[[prompt-engineer]]             (~2k tokens)
────────────────────────────────────────────
Total Context: ~9k tokens
```

### 🧪 Prompt Engineering Specialist
```
[[ai-engineer]]                 (~4k tokens)
    ↓ extends
[[prompt-engineer]]             (~2k tokens)
    ↓ suggests
[[skill-creator]]               (~2k tokens)
────────────────────────────────────────────
Total Context: ~8k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Add chatbot to app | [[ai-engineer]] + [[backend-developer]] |
| Build RAG pipeline | [[ai-engineer]] + [[vector-db]] |
| Design better prompts | [[prompt-engineer]] |
| Create AI agents | [[ai-engineer]] with agent patterns |
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

*Entry point for AI development | [[agent-skills-index]]*
