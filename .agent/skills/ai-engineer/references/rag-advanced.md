# Advanced RAG Techniques

Beyond basic retrieval: hybrid search, reranking, and query optimization.

## 1. Query Understanding

### Intent Classification

```python
INTENT_TYPES = {
    "factual": "Direct question with specific answer",
    "summarization": "Request for summary or overview",
    "comparison": "Comparing multiple items",
    "procedural": "How-to or step-by-step",
    "analytical": "Requires reasoning over data"
}

def classify_intent(query: str) -> str:
    classification = llm.classify(query, list(INTENT_TYPES.keys()))
    return classification
```

### Query Expansion

```python
def expand_query(query: str, method: str = "hybrid") -> list:
    """Generate multiple query variations for better recall"""
    
    expansions = [query]
    
    if method in ["synonym", "hybrid"]:
        # Add synonym variations
        synonyms = llm.complete(f"""
        Generate 3 synonym variations of: "{query}"
        Return as JSON list.
        """)
        expansions.extend(json.loads(synonyms))
    
    if method in ["hyde", "hybrid"]:
        # Hypothetical Document Embedding
        hypothetical_answer = llm.complete(f"""
        Write a brief answer to: "{query}"
        (This will be used for semantic search, not shown to user)
        """)
        expansions.append(hypothetical_answer)
    
    return expansions
```

### Sub-query Decomposition

```python
def decompose_query(complex_query: str) -> list:
    """Break complex query into atomic retrievals"""
    
    decomposition = llm.complete(f"""
    Break this complex question into 2-4 simpler sub-questions:
    
    Question: "{complex_query}"
    
    Each sub-question should retrieve one piece of information.
    Return as JSON list.
    """)
    
    sub_queries = json.loads(decomposition)
    
    # Retrieve for each sub-query
    results = []
    for sq in sub_queries:
        docs = vector_db.search(sq, top_k=3)
        results.append({"query": sq, "docs": docs})
    
    return results
```

## 2. Retrieval Strategies

### Hybrid Search (Dense + Sparse)

```python
class HybridRetriever:
    def __init__(self, vector_db, bm25_index, alpha: float = 0.5):
        self.vector_db = vector_db
        self.bm25 = bm25_index
        self.alpha = alpha  # Weight between dense (alpha) and sparse (1-alpha)
    
    def search(self, query: str, top_k: int = 10) -> list:
        # Dense retrieval
        query_emb = embed(query)
        dense_results = self.vector_db.search(query_emb, top_k=top_k*2)
        
        # Sparse retrieval
        sparse_results = self.bm25.search(query, top_k=top_k*2)
        
        # Fusion
        fused = self.reciprocal_rank_fusion(
            dense_results, 
            sparse_results,
            k=60  # RRF constant
        )
        
        return fused[:top_k]
    
    def reciprocal_rank_fusion(self, dense, sparse, k: int = 60):
        """RRF: score = Σ 1/(k + rank)"""
        scores = defaultdict(float)
        
        for rank, doc in enumerate(dense):
            scores[doc.id] += 1 / (k + rank)
        
        for rank, doc in enumerate(sparse):
            scores[doc.id] += 1 / (k + rank)
        
        # Get full documents and sort by score
        sorted_ids = sorted(scores.keys(), key=lambda x: scores[x], reverse=True)
        return [self.get_doc(id) for id in sorted_ids]
```

### Multi-Index Retrieval

```python
class MultiIndexRetriever:
    """Query multiple indices and merge results"""
    
    def __init__(self):
        self.indices = {
            "documentation": vector_db_docs,
            "code": vector_db_code,
            "tickets": vector_db_tickets,
            "conversations": vector_db_chat
        }
    
    def search(self, query: str, index_filter: list = None) -> dict:
        indices_to_search = index_filter or self.indices.keys()
        
        results = {}
        for idx_name in indices_to_search:
            results[idx_name] = self.indices[idx_name].search(query, top_k=5)
        
        return results
```

### Contextual Retrieval

```python
def contextual_chunking(documents: list) -> list:
    """Add context to each chunk for better retrieval"""
    
    chunks = []
    for doc in documents:
        # Split into base chunks
        base_chunks = split_document(doc)
        
        for chunk in base_chunks:
            # Generate context for this chunk
            context = llm.complete(f"""
            Document: {doc.title}
            
            This chunk is from the above document:
            {chunk.text}
            
            Provide 1-2 sentences of context to situate this chunk:
            """)
            
            chunks.append({
                "text": f"{context}\n\n{chunk.text}",
                "metadata": chunk.metadata
            })
    
    return chunks
```

## 3. Reranking

### Cross-Encoder Reranking

```python
from sentence_transformers import CrossEncoder

class Reranker:
    def __init__(self, model: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"):
        self.model = CrossEncoder(model)
    
    def rerank(self, query: str, documents: list, top_k: int = 5) -> list:
        # Create query-doc pairs
        pairs = [[query, doc.text] for doc in documents]
        
        # Score
        scores = self.model.predict(pairs)
        
        # Sort by score
        scored_docs = list(zip(documents, scores))
        scored_docs.sort(key=lambda x: x[1], reverse=True)
        
        return [doc for doc, _ in scored_docs[:top_k]]
```

### LLM-based Reranking

```python
def llm_rerank(query: str, documents: list, top_k: int = 3) -> list:
    """Use LLM to judge relevance"""
    
    doc_descriptions = "\n\n".join([
        f"[{i}] {doc.text[:200]}..."
        for i, doc in enumerate(documents)
    ])
    
    ranking = llm.complete(f"""
    Query: {query}
    
    Documents:
    {doc_descriptions}
    
    Rank the top {top_k} most relevant documents by number.
    Return as JSON list of indices.
    """)
    
    indices = json.loads(ranking)
    return [documents[i] for i in indices]
```

### Diversity Reranking

```python
def diversify_results(documents: list, lambda_param: float = 0.5) -> list:
    """MMR: Maximal Marginal Relevance
    
    Score = λ * Relevance - (1-λ) * max(Similarity to selected)
    """
    selected = []
    candidates = documents.copy()
    
    while candidates and len(selected) < len(documents):
        if not selected:
            # Pick most relevant first
            best = max(candidates, key=lambda d: d.relevance_score)
        else:
            # Pick best trade-off between relevance and diversity
            best = max(candidates, key=lambda d: 
                lambda_param * d.relevance_score - 
                (1 - lambda_param) * max(
                    similarity(d, s) for s in selected
                )
            )
        
        selected.append(best)
        candidates.remove(best)
    
    return selected
```

## 4. Context Assembly

### Prompt Compression

```python
class PromptCompressor:
    def compress(self, context: list, query: str, budget: int) -> list:
        """Compress context to fit token budget"""
        
        if self.token_count(context) <= budget:
            return context
        
        # Method 1: Truncate least relevant
        scored = [
            (doc, relevance_score(doc, query))
            for doc in context
        ]
        scored.sort(key=lambda x: x[1], reverse=True)
        
        selected = []
        tokens = 0
        for doc, score in scored:
            doc_tokens = len(doc.text.split())
            if tokens + doc_tokens > budget:
                # Compress this doc
                compressed = self.summarize(doc.text, ratio=0.5)
                doc_tokens = len(compressed.split())
                doc.text = compressed
            
            if tokens + doc_tokens <= budget:
                selected.append(doc)
                tokens += doc_tokens
        
        return selected
    
    def summarize(self, text: str, ratio: float = 0.3) -> str:
        """Extractive summarization"""
        sentences = sent_tokenize(text)
        
        # Score sentences by importance
        word_freq = Counter(word_tokenize(text.lower()))
        scores = [
            sum(word_freq[w] for w in word_tokenize(s.lower()))
            for s in sentences
        ]
        
        # Select top sentences
        n = max(1, int(len(sentences) * ratio))
        top_indices = np.argsort(scores)[-n:]
        
        return " ".join([sentences[i] for i in sorted(top_indices)])
```

### Dynamic Context Window

```python
def assemble_context(
    query: str,
    retrieved_docs: list,
    max_tokens: int = 4000,
    strategy: str = "hierarchical"
) -> str:
    """Build optimal context for LLM"""
    
    if strategy == "simple":
        # Concatenate until budget
        context = ""
        for doc in retrieved_docs:
            if tokens(context + doc.text) > max_tokens:
                break
            context += f"\n\n[Source: {doc.source}]\n{doc.text}"
        return context
    
    elif strategy == "hierarchical":
        # Summary + full text of most relevant
        summary = generate_summary(retrieved_docs)
        
        remaining_budget = max_tokens - tokens(summary)
        full_texts = ""
        for doc in retrieved_docs[:3]:  # Top 3 full text
            if tokens(full_texts + doc.text) > remaining_budget:
                break
            full_texts += f"\n\n{doc.text}"
        
        return f"Summary:\n{summary}\n\nFull Context:\n{full_texts}"
```

## 5. Evaluation

### Retrieval Metrics

```python
def evaluate_retrieval(
    queries: list,
    ground_truth: dict,  # query -> relevant_doc_ids
    retriever
) -> dict:
    """Compute retrieval metrics"""
    
    metrics = {
        "precision@k": [],
        "recall@k": [],
        "mrr": [],  # Mean Reciprocal Rank
        "ndcg": []  # Normalized Discounted Cumulative Gain
    }
    
    for query in queries:
        results = retriever.search(query, top_k=10)
        retrieved_ids = [r.id for r in results]
        relevant_ids = set(ground_truth[query])
        
        # Precision@k
        for k in [1, 5, 10]:
            retrieved_k = set(retrieved_ids[:k])
            precision = len(retrieved_k & relevant_ids) / k
            metrics[f"precision@{k}"].append(precision)
        
        # Recall@k
        for k in [1, 5, 10]:
            retrieved_k = set(retrieved_ids[:k])
            recall = len(retrieved_k & relevant_ids) / len(relevant_ids)
            metrics[f"recall@{k}"].append(recall)
        
        # MRR
        for rank, doc_id in enumerate(retrieved_ids, 1):
            if doc_id in relevant_ids:
                metrics["mrr"].append(1 / rank)
                break
        else:
            metrics["mrr"].append(0)
    
    # Average metrics
    return {k: np.mean(v) for k, v in metrics.items()}
```

### Answer Relevance

```python
def evaluate_answer_relevance(
    query: str,
    answer: str,
    retrieved_context: list
) -> dict:
    """Check if answer is grounded in retrieved context"""
    
    # Faithfulness: does answer come from context?
    faithfulness = llm.complete(f"""
    Context: {retrieved_context}
    Answer: {answer}
    
    Is this answer fully supported by the context?
    Score 1-5 and explain.
    """)
    
    # Answer relevance: does it answer the query?
    relevance = llm.complete(f"""
    Query: {query}
    Answer: {answer}
    
    Does this answer directly address the query?
    Score 1-5 and explain.
    """)
    
    return {
        "faithfulness": parse_score(faithfulness),
        "relevance": parse_score(relevance)
    }
```

## 6. Optimization Tips

### Index Optimization
- Use appropriate embedding models for domain
- Normalize embeddings for cosine similarity
- Consider dimensionality reduction (PCA)
- Index in batches for large datasets

### Query Optimization
- Cache common queries
- Pre-compute query embeddings
- Use query classification to route to specialized indices

### Latency Optimization
- Parallel retrieval from multiple sources
- Async embedding generation
- Streaming results (don't wait for all)
- Redis/memory cache for hot queries

### Cost Optimization
- Smaller embedding models for initial retrieval
- Larger models only for reranking
- Quantized embeddings (fp16, int8)
