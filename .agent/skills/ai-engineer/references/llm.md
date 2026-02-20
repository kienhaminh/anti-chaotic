# LLM Fundamentals

Core concepts for working with Large Language Models.

## 1. Tokenization

### Understanding Tokens

```python
import tiktoken

# Different models use different tokenizers
encodings = {
    "gpt-4": tiktoken.encoding_for_model("gpt-4"),
    "claude": tiktoken.get_encoding("cl100k_base"),
}

def count_tokens(text: str, model: str = "gpt-4") -> int:
    encoding = encodings[model]
    return len(encoding.encode(text))

def show_tokens(text: str, model: str = "gpt-4"):
    """Visualize how text is tokenized"""
    encoding = encodings[model]
    tokens = encoding.encode(text)
    
    print(f"Text: {text}")
    print(f"Tokens ({len(tokens)}):")
    for token in tokens:
        decoded = encoding.decode([token])
        print(f"  {token:6d} → '{decoded}'")

# Example
show_tokens("Hello, world!")
# 15496 → 'Hello'
#    11 → ','
#   616 → ' world'
#     0 → '!'
```

### Token Budgeting

| Model | Context | Output | ~Tokens/Word |
|:------|:--------|:-------|:-------------|
| GPT-4o | 128k | 4k | 0.75 |
| GPT-4 | 8k-32k | 4k-8k | 0.75 |
| Claude 3.5 Sonnet | 200k | 4k | 0.75 |
| Claude 3 Opus | 200k | 4k | 0.75 |
| Llama 3 | 8k-128k | 8k | 0.75 |

**Rule of thumb:** 100 tokens ≈ 75 words ≈ 1 paragraph

### Managing Context Windows

```python
class ContextWindow:
    def __init__(self, max_tokens: int = 8000, reserve_output: int = 2000):
        self.max_tokens = max_tokens
        self.reserve_output = reserve_output
        self.available = max_tokens - reserve_output
        self.messages = []
    
    def add_message(self, role: str, content: str) -> bool:
        msg_tokens = count_tokens(content)
        current = sum(count_tokens(m["content"]) for m in self.messages)
        
        if current + msg_tokens > self.available:
            # Need to compress or remove
            self._make_space(msg_tokens)
        
        self.messages.append({"role": role, "content": content})
        return True
    
    def _make_space(self, needed: int):
        """Remove or summarize old messages"""
        while True:
            current = sum(count_tokens(m["content"]) for m in self.messages)
            if current + needed <= self.available:
                break
            
            # Remove oldest non-system message
            for i, msg in enumerate(self.messages):
                if msg["role"] != "system":
                    self.messages.pop(i)
                    break
```

## 2. API Integration

### OpenAI

```python
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Basic completion
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)

# Streaming
stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Anthropic

```python
from anthropic import Anthropic

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

response = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1000,
    messages=[{
        "role": "user",
        "content": "Hello!"
    }]
)

print(response.content[0].text)
```

### Unified Interface

```python
class LLMProvider:
    def __init__(self, provider: str, model: str):
        self.provider = provider
        self.model = model
        
        if provider == "openai":
            self.client = OpenAI()
        elif provider == "anthropic":
            self.client = Anthropic()
    
    def complete(self, messages: list, **kwargs) -> str:
        if self.provider == "openai":
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                **kwargs
            )
            return response.choices[0].message.content
        
        elif self.provider == "anthropic":
            response = self.client.messages.create(
                model=self.model,
                messages=messages,
                max_tokens=kwargs.get("max_tokens", 1000)
            )
            return response.content[0].text
```

## 3. Generation Parameters

### Temperature

Controls randomness/creativity:

- **0.0-0.3**: Deterministic, good for extraction, classification
- **0.4-0.7**: Balanced, good for general conversation
- **0.8-1.2**: Creative, good for brainstorming, writing

```python
# Classification: low temperature
result = llm.classify(text, labels, temperature=0.1)

# Creative writing: higher temperature
story = llm.generate(prompt, temperature=0.9)
```

### Top-p (Nucleus Sampling)

Alternative to temperature. Only sample from tokens comprising top p% of probability mass.

```python
# Only consider tokens in top 90% probability mass
response = llm.complete(prompt, top_p=0.9)
```

### Max Tokens

Always set appropriate limits to control cost:

```python
# Quick answer
short = llm.complete(prompt, max_tokens=100)

# Detailed response
long = llm.complete(prompt, max_tokens=2000)
```

### Frequency/Presence Penalty

Reduce repetition:

```python
response = llm.complete(
    prompt,
    frequency_penalty=0.5,  # Reduce repetition of same tokens
    presence_penalty=0.5    # Encourage new topics
)
```

## 4. Structured Output

### JSON Mode

```python
# OpenAI JSON mode
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "user",
        "content": f"Extract entities from: {text}"
    }],
    response_format={"type": "json_object"}
)

entities = json.loads(response.choices[0].message.content)
```

### Function Calling

```python
functions = [
    {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City name"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"]
                }
            },
            "required": ["location"]
        }
    }
]

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
    functions=functions,
    function_call="auto"
)

# Check if function was called
if response.choices[0].message.function_call:
    function_call = response.choices[0].message.function_call
    args = json.loads(function_call.arguments)
    result = get_weather(**args)
```

### Pydantic Integration

```python
from pydantic import BaseModel, Field
from typing import Literal

class Analysis(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"]
    confidence: float = Field(ge=0, le=1)
    topics: list[str] = Field(max_length=5)

# Generate schema
schema = Analysis.schema()

# Use in function calling
functions = [{
    "name": "analyze",
    "parameters": schema
}]

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": text}],
    functions=functions,
    function_call={"name": "analyze"}
)

# Parse result
result = Analysis(**json.loads(
    response.choices[0].message.function_call.arguments
))
```

## 5. Embeddings

### Generating Embeddings

```python
# OpenAI
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="The food was delicious!"
)
embedding = response.data[0].embedding

# Batch processing
texts = ["text 1", "text 2", "text 3"]
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)
embeddings = [d.embedding for d in response.data]
```

### Similarity Calculation

```python
import numpy as np

def cosine_similarity(a: list, b: list) -> float:
    """Cosine similarity between two vectors"""
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def euclidean_distance(a: list, b: list) -> float:
    """L2 distance between two vectors"""
    return np.linalg.norm(np.array(a) - np.array(b))

# Example
emb1 = get_embedding("The cat sat on the mat")
emb2 = get_embedding("A feline rested on the rug")
emb3 = get_embedding("Stock markets rallied today")

print(cosine_similarity(emb1, emb2))  # High similarity
print(cosine_similarity(emb1, emb3))  # Low similarity
```

### Embedding Models Comparison

| Model | Dimensions | Cost | Best For |
|:------|:-----------|:-----|:---------|
| text-embedding-3-small | 1536 | Low | General purpose, high volume |
| text-embedding-3-large | 3072 | Medium | High accuracy needs |
| text-embedding-ada-002 | 1536 | Low | Legacy compatibility |
| voyage-2 | 1024 | Medium | Domain-specific (code, finance) |
| e5-mistral | 4096 | Self-hosted | Privacy-sensitive |

## 6. Error Handling

### Common Errors

```python
from openai import (
    RateLimitError,
    APIError,
    Timeout,
    AuthenticationError
)

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def robust_completion(prompt: str):
    try:
        return client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
    
    except RateLimitError:
        # Will retry with backoff
        raise
    
    except Timeout:
        # Shorten request or use faster model
        return client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500  # Shorter response
        )
    
    except APIError as e:
        logger.error(f"API error: {e}")
        # Fallback to cached response
        return get_cached_response(prompt)
    
    except AuthenticationError:
        logger.critical("Invalid API key")
        raise
```

## 7. Cost Optimization

### Caching

```python
from functools import lru_cache
import hashlib

def hash_prompt(prompt: str) -> str:
    return hashlib.sha256(prompt.encode()).hexdigest()

class LLMCache:
    def __init__(self):
        self.cache = {}
    
    def get(self, prompt: str) -> str | None:
        key = hash_prompt(prompt)
        return self.cache.get(key)
    
    def set(self, prompt: str, response: str):
        key = hash_prompt(prompt)
        self.cache[key] = response
    
    def complete_with_cache(self, prompt: str) -> str:
        cached = self.get(prompt)
        if cached:
            return cached
        
        response = llm.complete(prompt)
        self.set(prompt, response)
        return response
```

### Model Selection

```python
TIER_CONFIG = {
    "fast": {
        "model": "gpt-3.5-turbo",
        "max_tokens": 500,
        "temperature": 0.3
    },
    "balanced": {
        "model": "claude-3-sonnet",
        "max_tokens": 1000,
        "temperature": 0.5
    },
    "quality": {
        "model": "gpt-4",
        "max_tokens": 2000,
        "temperature": 0.7
    }
}

def route_by_complexity(query: str) -> dict:
    """Use cheap model to classify complexity"""
    classification = llm.classify(
        query,
        classes=["fast", "balanced", "quality"],
        model="gpt-3.5-turbo"
    )
    return TIER_CONFIG[classification]
```

## 8. Best Practices

### Do's ✅
- Set `max_tokens` to control costs
- Use streaming for better UX
- Implement retries with exponential backoff
- Cache frequent queries
- Monitor token usage
- Validate outputs
- Use structured output when possible

### Don'ts ❌
- Send PII to third-party APIs without sanitization
- Rely on exact output formatting (use JSON mode)
- Hardcode prompts (use templates)
- Ignore rate limits
- Send entire conversation history (summarize instead)
- Use high temperature for critical tasks
