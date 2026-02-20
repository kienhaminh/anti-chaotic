---
name: vector-db
type: capability
domain: ai
status: draft
version: "1.0.0"
estimated_tokens: 6000
description: Vector databases for RAG, semantic search, and embeddings.
---

# Vector Database

Vector databases for AI applications and semantic search.

## Knowledge Graph

- **extends**: []
- **requires**: [[ai-engineer]]
- **suggests**: []
- **conflicts**: []
- **enhances": [[ai-engineer]]
- **moc**: [[ai-development-moc]]

## Overview

This skill covers:
- Vector embeddings and similarity search
- Pinecone, Chroma, Weaviate, pgvector
- RAG pipeline integration
- Hybrid search strategies

## Providers

| Provider | Best For |
|:---------|:---------|
| Pinecone | Managed, high-scale |
| Chroma | Open source, local dev |
| Weaviate | GraphQL interface |
| pgvector | Postgres integration |

## Related

- [[ai-engineer]] — RAG implementation

---

*Part of [[ai-development-moc]]*
