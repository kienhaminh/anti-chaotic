# Agentic Patterns & Architectures

Building agents is about engineering reliability into stochastic systems.

## Core Patterns

### 1. The ReAct Loop (Reason + Act)

The fundamental loop of an agent:

1.  **Thought**: Analyze the current state and goal.
2.  **Act**: Decide on a tool to call.
3.  **Obs**: Observe the output of the tool.
4.  **Repeat**.

### 2. Planning & Reflection

- **Planning**: Break complex tasks into steps _before_ execution. (e.g., "First I will search for X, then I will calculate Y").
- **Reflection**: After an output, ask the model "Does this answer the user's question? Is it accurate?". Use a separate "Critic" prompt.

### 3. Memory Architectures

- **Short-term**: Current context window (conversation history).
- **Long-term**: Vector database (semantic search over past interactions).
- **Procedural**: Storing successful "recipes" or tool sequences for future use.

## Multi-Agent Architectures

### 1. Orchestrator-Workers (Router)

A central "Manager" LLM analyzes the request and delegates to specific "Worker" agents (e.g., Coder, Researcher, Reviewer).

- **Pros**: Clear separation of concerns, easy to eval workers independently.
- **Cons**: Latency (multiple hops).

### 2. Autonomous Teams (CrewAI / AutoGen)

Agents converse with each other to solve a problem.

- **Role-Playing**: "You represent the User", "You are the QA Tester".
- **Dynamic**: Can handle ambiguous tasks but harder to control.

## Best Practices

- **Deterministic Tools**: Tools should be as reliable as possible (APIs, Code execution).
- **Human-in-the-Loop**: Always pause for confirmation before destructive actions (Write DB, Deploy).
- **Fail Gracefully**: If a tool fails, the agent should catch the error and retry or ask for help, not crash.
