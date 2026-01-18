# System Architecture Guide

This guide covers high-level system design, scalability, reliability, and modern integration patterns.

## Architectural Styles

### 1. Microservices

- **When to use**: Multiple teams working independently, conflicting scalability requirements, diverse tech stacks needed.
- **Trade-offs**: Increases operational complexity (deployment, observability, networking). Solves organizational scaling problems more than technical ones.
- **Anti-Pattern**: Distributed Monolith (tight coupling, shared databases).

### 2. Composable Architecture (PBCs)

- **Packaged Business Capabilities (PBCs)**: Independent, interchangeable software components.
- **API-First**: Everything is exposed via an API.
- **Headless**: Decouple frontend (head) from backend logic.
- **Benefits**: Rapid adaptation, vendor independence, "best-of-breed" selection.

## Scalability Patterns

### Database Scaling

- **Sharding (Horizontal Partitioning)**: Distribute data across multiple nodes based on a shard key (e.g., UserID).
- **Read Replicas**: Offload read traffic to replicas; writes go to primary.
- **Caching Strategy**:
  - **Aside (Lazy Loading)**: App checks cache -> DB -> Updates cache.
  - **Write-Through**: App updates cache and DB simultaneously.
  - **CDN**: Cache static assets and compute at the edge.

### Compute Scaling

- **Load Balancing**:
  - **L4 (Transport)**: IP/Port based. Fast, simple.
  - **L7 (Application)**: HTTP/Path based. Smart routing, SSL termination.
- **Auto-scaling**: Trigger based on CPU, Memory, or Request Count metrics.

## Reliability & Resilience

- **Circuit Breaker**: Detect failures and stop sending requests to a failing service to prevent cascading failure.
- **Bulkhead**: Isolate resources (thread pools, connections) so one failing component doesn't bring down the whole system.
- **Retry with Exponential Backoff**: Retry transient failures with increasing wait times.
- **CAP Theorem**: Understand the trade-off: in a Partitioned network, you must choose Consistency or Availability.
  - _CP_: Banking systems.
  - _AP_: Social media feeds.

## Modern AI Integration

### RAG (Retrieval-Augmented Generation) Architecture

- **Vector Database**: Store embeddings for semantic search (e.g., Pinecone, pgvector).
- **Ingestion Pipeline**: Chunking strategies, embedding generation, metadata tagging.
- **Retrieval**: Hybrid search (Keyword + Semantic) + Re-ranking for precision.

### AI Agent Architectures

- **Tool Use**: Expose deterministic APIs for agents to call.
- **Memory**: Short-term (Conversation History) vs. Long-term (Vector Store/Entity Graph).
- **Orchestration**:
  - **ReAct**: Reason + Act loop.
  - **Router**: Classify intent and route to specialized agent.
  - **Multi-Agent**: Collaborative solving (e.g., Researcher + Writer + Reviewer).
