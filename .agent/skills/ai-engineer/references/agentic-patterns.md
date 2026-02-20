# Agentic Patterns

Design patterns for building reliable AI agents.

## 1. ReAct (Reasoning + Acting)

The agent alternates between reasoning about the situation and taking actions.

```python
def react_loop(query: str, max_iterations: int = 10):
    context = []
    
    for i in range(max_iterations):
        # Reasoning step
        thought = llm.complete(f"""
        Question: {query}
        Context: {context}
        
        What should I do next? Think step by step.
        Thought:
        """)
        
        # Action selection
        action_json = llm.complete(f"""
        Based on this thought: {thought}
        
        Choose an action from available tools:
        {available_tools_description}
        
        Respond in JSON: {{"tool": "name", "args": {{}}}}
        """)
        
        action = json.loads(action_json)
        
        if action["tool"] == "finish":
            return action["args"]["answer"]
        
        # Execute action
        result = execute_tool(action["tool"], action["args"])
        context.append({"thought": thought, "action": action, "result": result})
    
    raise MaxIterationsExceeded()
```

### When to Use
- Multi-step reasoning required
- Tool calling needed
- Uncertain about exact sequence upfront

### Variants
- **ReAct + Reflection**: Agent critiques its own reasoning
- **ReAct + Memory**: Persistent context across sessions
- **Async ReAct**: Parallel action execution

## 2. Plan-and-Solve

Generate a plan first, then execute steps.

```python
def plan_and_solve(query: str):
    # Step 1: Generate plan
    plan = llm.complete(f"""
    Create a step-by-step plan to solve:
    {query}
    
    Available tools: {tools}
    
    Plan (numbered steps):
    """)
    
    steps = parse_steps(plan)
    results = []
    
    # Step 2: Execute plan
    for step in steps:
        result = execute_step(step, context=results)
        results.append(result)
    
    # Step 3: Synthesize final answer
    return llm.complete(f"""
    Based on these results:
    {results}
    
    Provide the final answer to: {query}
    """)
```

### When to Use
- Complex tasks with clear sub-goals
- Need for cost estimation upfront
- Parallel execution possible

## 3. Multi-Agent Patterns

### Supervisor Pattern
One agent coordinates multiple specialized agents.

```python
class SupervisorAgent:
    def __init__(self):
        self.agents = {
            "research": ResearchAgent(),
            "writer": WriterAgent(),
            "reviewer": ReviewerAgent()
        }
    
    def run(self, task: str) -> str:
        # Supervisor plans and delegates
        plan = self.plan_task(task)
        
        results = {}
        for step in plan:
            agent = self.agents[step["agent"]]
            results[step["id"]] = agent.run(
                step["instruction"],
                inputs={k: results.get(v) for k, v in step["deps"].items()}
            )
        
        return self.synthesize(results)
```

### Debate Pattern
Multiple agents critique each other's outputs.

```python
def debate(query: str, n_rounds: int = 3):
    agents = [AgentA(), AgentB(), AgentC()]
    responses = [agent.generate(query) for agent in agents]
    
    for round in range(n_rounds):
        critiques = []
        for i, agent in enumerate(agents):
            others = responses[:i] + responses[i+1:]
            critique = agent.critique(others)
            critiques.append(critique)
        
        # Update responses based on critiques
        for i, agent in enumerate(agents):
            responses[i] = agent.revise(responses[i], critiques)
    
    return aggregate_responses(responses)
```

### Pipeline Pattern
Fixed sequence of processing stages.

```python
pipeline = [
    IntentClassifier(),
    EntityExtractor(),
    ContextRetriever(),
    ResponseGenerator(),
    SafetyChecker(),
    Formatter()
]

def process(input: str):
    context = {"input": input}
    for stage in pipeline:
        context = stage.process(context)
    return context["output"]
```

## 4. Tool Use Patterns

### Tool Selection

```python
def select_tools(query: str, available_tools: list) -> list:
    """Dynamic tool selection based on query"""
    
    tool_descriptions = "\n".join([
        f"- {t.name}: {t.description}" 
        for t in available_tools
    ])
    
    selection = llm.complete(f"""
    Query: {query}
    
    Available tools:
    {tool_descriptions}
    
    Which tools are needed? Return JSON list of tool names.
    """)
    
    selected_names = json.loads(selection)
    return [t for t in available_tools if t.name in selected_names]
```

### Parallel Tool Execution

```python
async def parallel_tools(tools_with_args: list):
    """Execute independent tools in parallel"""
    
    tasks = [
        execute_tool(tool, args)
        for tool, args in tools_with_args
    ]
    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Handle failures gracefully
    return [
        r if not isinstance(r, Exception) else None
        for r in results
    ]
```

## 5. Memory Patterns

### Working Memory
Short-term context for current conversation.

```python
class WorkingMemory:
    def __init__(self, max_turns: int = 10):
        self.turns = deque(maxlen=max_turns)
    
    def add(self, role: str, content: str):
        self.turns.append({"role": role, "content": content})
    
    def get_context(self) -> list:
        return list(self.turns)
    
    def summarize_if_long(self):
        """Compress if exceeding token budget"""
        if self.token_count > 3000:
            summary = generate_summary(self.turns)
            self.turns.clear()
            self.add("system", f"Previous conversation summary: {summary}")
```

### Long-term Memory
Persistent knowledge across sessions.

```python
class LongTermMemory:
    def __init__(self, vector_db):
        self.db = vector_db
    
    def store_fact(self, user_id: str, fact: str, importance: float = 1.0):
        """Store important fact about user"""
        self.db.upsert({
            "id": hash(fact),
            "user_id": user_id,
            "content": fact,
            "importance": importance,
            "timestamp": now()
        })
    
    def retrieve_relevant(self, user_id: str, query: str, k: int = 5):
        """Get relevant past information"""
        return self.db.search(
            query=query,
            filter={"user_id": user_id},
            top_k=k
        )
```

## 6. Error Recovery

### Retry with Backoff

```python
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10),
    retry=retry_if_exception_type((RateLimitError, TimeoutError))
)
def robust_llm_call(prompt: str):
    return client.complete(prompt)
```

### Graceful Degradation

```python
def generate_with_fallback(query: str):
    try:
        # Try best model first
        return gpt4.complete(query, timeout=10)
    except TimeoutError:
        try:
            # Fall back to faster model
            return claude_sonnet.complete(query, timeout=5)
        except Exception:
            # Final fallback: cached response or template
            return get_cached_response(query) or "I apologize, I'm having trouble."
```

### Self-Correction

```python
def self_correct(query: str, max_attempts: int = 3):
    for attempt in range(max_attempts):
        response = generate(query)
        
        # Validate response
        validation = validate_output(response)
        
        if validation.valid:
            return response
        
        # Generate correction prompt
        query = f"""
        Previous response had issues: {validation.issues}
        
        Please correct and respond to: {original_query}
        """
    
    raise FailedToGenerateValidResponse()
```

## Anti-Patterns

❌ **The Infinite Loop**: Agent keeps calling tools without making progress  
❌ **The Over-Tooler**: Using tools for tasks the LLM can do directly  
❌ **The Black Box**: No logging or observability  
❌ **The Hardcoded Path**: No dynamic planning or adaptation  
❌ **The Memory Hog**: Loading entire conversation history every call

## Best Practices

✅ Set iteration limits  
✅ Log all tool calls and reasoning  
✅ Validate outputs at each step  
✅ Cache expensive operations  
✅ Provide escape hatches (human handoff)  
✅ Test with adversarial inputs
