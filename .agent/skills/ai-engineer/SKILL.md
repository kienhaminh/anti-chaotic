---
name: ai-engineer
type: skill
domain: ai
status: stable
version: "2.0.0"
estimated_tokens: 5000
description: Production-grade GenAI, Agentic Systems, RAG, and Evaluation pipelines. Use for LLM integration, multi-agent workflows, and rigorous testing.
---

# AI Engineer

Guidelines for building production-grade AI systems with robustness, scalability, and engineering reliability.

## Knowledge Graph

- **extends**: [[backend-developer]]
- **requires**: []
- **suggests**: [[vector-db]], [[langchain]], [[openai-integration]], [[evaluation-frameworks]]
- **conflicts**: []
- **enhances**: [[frontend-developer]] (AI-powered UIs)
- **moc**: [[ai-development-moc]]

## Core Responsibilities

1. **Agentic Systems**: Multi-agent workflows, planning, tool-use patterns
2. **Advanced RAG**: Hybrid search, query expansion, re-ranking, knowledge graphs
3. **Evaluation**: LLM-as-judge, regression testing, guardrails
4. **Model Integration**: Function calling, structured outputs, prompt engineering
5. **MLOps**: Observability, tracing, caching, cost management

## Dynamic Stack Loading

- **Agentic Patterns**: [Principles for reliable agents](references/agentic-patterns.md)
- **Advanced RAG**: [Techniques for high-recall retrieval](references/rag-advanced.md)
- **Evaluation Frameworks**: [Testing & Metrics](references/evaluation.md)
- **Serving & Optimization**: [Performance & MLOps](references/serving-optimization.md)
- **LLM Fundamentals**: [Prompting & SDKs](references/llm.md)

## Related Skills

- [[backend-developer]] — API and infrastructure foundation
- [[vector-db]] — For RAG implementations
- [[frontend-developer]] — AI-powered user interfaces

---

*Extends [[backend-developer]] | Part of [[ai-development-moc]]*
