# Advanced RAG Patterns

Move beyond naive "chunk & retrieve".

## Retrieval Optimization

### 1. Hybrid Search (Keyword + Semantic)

Dense vectors (semantic) miss exact matches (IDs, acronyms). Sparse vectors (BM25/Splade) miss intent.
**Solution**: Combine both with Reciprocal Rank Fusion (RRF).

- **Stack**: Pinecone (Hybrid), Weaviate, Supabase (pgvector + pg_search).

### 2. Re-Ranking (Cross-Encoders)

Retrieving 50 docs with a bi-encoder is fast but inaccurate.
**Solution**: Retrieve 50 -> Re-rank top 5 with a Cross-Encoder (Cohere Rerank, bge-reranker). This dramatically improves precision.

### 3. Query Transformations

Users write bad queries.

- **Expansion**: Generate synonyms or related questions.
- **Decomposition**: Break complex questions into sub-queries.
- **HyDE (Hypothetical Document Embeddings)**: Generate a fake answer, embed _that_, and search for similar real chunks.

### 4. Contextual Compression

Don't shove 10 full documents into the context.

- Summarize retrieved docs relative to the query before passing to the LLM.

## Knowledge Graphs (GraphRAG)

For questions requiring global reasoning ("How do the themes in book A relate to book B?").

- Extract entities and relationships -> Store in Graph DB (Neo4j) -> Traverse during retrieval.

## Indexing Strategy

- **Parent-Child Chunking**: Retrieve small chunks (better matching), but return the parent large chunk (better context).
- **Multi-Vector Retrieval**: Embed summaries for search, but return full raw text for generation.
