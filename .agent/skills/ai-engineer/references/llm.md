# Tech: LLMs & Integration Patterns

## Stack Selection

- **Inference Engine**:
  - **Complex Reasoning**: GPT-4o, Claude 3.5 Sonnet.
  - **Fast/Cheap**: Gemini Flash, Haiku, Llama 3 (Groq/Together).
- **Orchestration**:
  - **Production**: Vercel AI SDK (Type-safe, streaming first).
  - **Prototyping**: LangChain (Use with caution in production due to abstraction overhead).
- **Gateway**: Portkey or Helicone for observability and fallback.

## Advanced Patterns

### 1. Structured Outputs

Stop parsing regex. Use native JSON mode or tool definitions to enforce strict schemas (Zod).

```typescript
// Example using Vercel AI SDK
const { object } = await generateObject({
  model: openai("gpt-4o"),
  schema: z.object({
    sentiment: z.enum(["positive", "negative"]),
    reasoning: z.string(),
  }),
  prompt: "Analyze this customer feedback...",
});
```

### 2. Reliable Prompt Engineering

- **Chain of Thought (CoT)**: Force the model to "think" before answering. `Let's think step by step.`
- **Few-Shot Prompting**: Provide 3-5 high-quality examples of input -> output.
- **System Prompts**: strict role definition, output constraints, and "tone of voice" instructions. Version control these!

### 3. Streaming & UI Integration

- **Optimistic UI**: Show skeleton loaders or predicted text while waiting.
- **Generative UI**: Stream React components directly from the LLM (Vercel AI SDK RSC).

### 4. Cost Management

- **Token Counting**: Always estimate tokens before sending requests.
- **Caching**: Cache identical prompts at the edge/gateway layer.
