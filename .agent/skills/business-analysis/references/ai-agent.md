# AI Agent Domain Reference

## Core Concepts

### Agent Types

- **Conversational**: Chat-based interaction (ChatGPT, Claude)
- **Autonomous**: Execute tasks independently
- **Multi-agent**: Multiple agents collaborating
- **Tool-using**: Agents with access to external tools

### LLM Foundations

- **Models**: GPT-4, Claude, Gemini, Llama, Mistral
- **Context window**: Input token limits
- **Temperature**: Creativity vs. determinism
- **System prompts**: Agent behavior definition

### Agent Architecture

- **Memory**: Short-term (conversation), Long-term (knowledge base)
- **Planning**: Task decomposition, goal setting
- **Tools**: Code execution, web search, API calls
- **Reflection**: Self-evaluation, error correction

## Building Blocks

### Prompt Engineering

- System prompts (role, behavior, constraints)
- Few-shot examples
- Chain-of-thought reasoning
- Output formatting (JSON, structured)

### Tool Integration

- Function calling / Tool use
- API integrations
- Code interpreters
- Web browsing, search

### Memory Systems

- Conversation history
- Vector databases (embeddings)
- Knowledge graphs
- Long-term memory persistence

### Orchestration

- Agent frameworks: LangChain, LlamaIndex, AutoGen
- Workflow engines
- Multi-agent coordination
- Human-in-the-loop

## Common Patterns

### RAG (Retrieval Augmented Generation)

- Document ingestion
- Chunking strategies
- Embedding models
- Vector similarity search
- Context injection

### Agents with Tools

- Tool definition and registration
- Tool selection logic
- Error handling and retries
- Result parsing

### Multi-Agent Systems

- Agent roles and specialization
- Communication protocols
- Supervisor/router patterns
- Parallel vs. sequential execution

## Safety & Guardrails

- Input validation
- Output filtering
- Rate limiting
- Prompt injection prevention
- Content moderation

## Key Metrics

- Response quality (human eval, LLM-as-judge)
- Latency (time to first token, total time)
- Token usage, cost
- Task completion rate
- User satisfaction
