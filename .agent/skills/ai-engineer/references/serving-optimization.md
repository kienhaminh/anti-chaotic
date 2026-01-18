# Serving & Optimization (MLOps)

Moving from "it works on my laptop" to "production scale".

## Observability & Tracing

You cannot debug a stochastic system with `console.log`.

- **Tracing**: Visualize the entire chain (User -> RAG -> Tool -> LLM).
- **Tools**: LangSmith, Arize Phoenix, Helicone.
- **Key Metrics**:
  - **Latency**: Time to First Token (TTFT), Total Latency.
  - **Cost**: Cost per request, Token usage.
  - **Quality**: User feedback (Thumbs up/down).

## Optimization Techniques

### 1. Caching (The Semantic Cache)

Don't pay for the same answer twice.

- **Exact Match**: Redis check on prompt string.
- **Semantic Match**: Check vector distance of prompt embeddings (e.g., "How do I reset password" ~= "modify password steps").

### 2. Latency Reduction

- **Streaming**: Non-negotiable for UX.
- **Speculative Decoding**: Use a small model to draft, large model to verify.
- **Quantization**: Run int8/int4 models if self-hosting (vLLM).

### 3. Cost Control

- **Model Cascading**: Try a cheap model (Flash/Haiku) first. If confidence < X, retry with GPT-4.
- **Fine-tuning**: Fine-tune a small model (Llama 3 8B) on your specific task to match GPT-4 performance at 1/10th the cost.

## Deployment Stack

- **Managed**: Vercel, AWS Bedrock.
- **Self-Hosted**: vLLM, TGI (Text Generation Inference), Ray Serve.
