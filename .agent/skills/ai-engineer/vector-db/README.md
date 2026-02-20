# Vector Databases

Vector databases for RAG, semantic search, and embeddings storage.

## When to Use

Use this capability when:
- Building RAG (Retrieval Augmented Generation) systems
- Implementing semantic search
- Storing and querying embeddings
- Building recommendation engines

## Providers

| Provider | Best For | Integration |
|:---------|:---------|:------------|
| **Pinecone** | Managed, high-scale | REST API, SDK |
| **Chroma** | Open source, local dev | Embedded, no server |
| **Weaviate** | GraphQL interface | GraphQL + vector |
| **pgvector** | Postgres integration | SQL extensions |
| **Qdrant** | Rust-based, fast | gRPC/HTTP |

## Quick Start (Chroma)

```python
import chromadb

# In-memory (dev)
client = chromadb.Client()

# Or persistent
client = chromadb.PersistentClient(path="./chroma_db")

# Create collection
collection = client.create_collection("documents")

# Add documents
collection.add(
    documents=["doc1 content", "doc2 content"],
    metadatas=[{"source": "web"}, {"source": "pdf"}],
    ids=["id1", "id2"]
)

# Query
results = collection.query(
    query_texts=["search query"],
    n_results=5
)
```

## Quick Start (Pinecone)

```python
from pinecone import Pinecone

pc = Pinecone(api_key="your-api-key")
index = pc.Index("my-index")

# Upsert vectors
index.upsert(vectors=[
    {
        "id": "vec1",
        "values": [0.1, 0.2, 0.3, ...],  # embedding
        "metadata": {"text": "original text"}
    }
])

# Query
results = index.query(
    vector=[0.1, 0.2, 0.3, ...],
    top_k=5,
    include_metadata=True
)
```

## RAG Pipeline Integration

```python
# 1. Generate embeddings
from openai import OpenAI
client = OpenAI()

def get_embedding(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# 2. Store in vector DB
def store_document(doc_id, text, metadata):
    embedding = get_embedding(text)
    collection.add(
        ids=[doc_id],
        embeddings=[embedding],
        documents=[text],
        metadatas=[metadata]
    )

# 3. Retrieve for RAG
def retrieve_context(query, top_k=5):
    query_embedding = get_embedding(query)
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )
    return results['documents'][0]
```

## Hybrid Search

Combine vector + keyword search for better results:

```python
# Sparse (BM25) + Dense (embeddings)
def hybrid_search(query, alpha=0.5):
    # Get keyword results
    keyword_results = bm25_search(query)
    
    # Get vector results
    vector_results = vector_search(query)
    
    # Combine with reciprocal rank fusion
    return reciprocal_rank_fusion(
        keyword_results, 
        vector_results,
        k=60
    )
```

## Best Practices

- **Dimension matching** — Ensure embedding model matches DB dimensions
- **Batch operations** — Upsert in batches (100-1000) for efficiency
- **Metadata filtering** — Use metadata filters to narrow search space
- **Index tuning** — Adjust index type based on recall vs speed needs
- **Monitoring** — Track query latency and recall metrics
