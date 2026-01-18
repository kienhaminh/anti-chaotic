# Evaluation & Reliability

If you can't measure it, you can't improve it.

## The Evaluation Hierarchy

### 1. Unit Tests (Deterministic)

- Does the output JSON parse?
- Does the code compile?
- Are forbidden words present?

### 2. LLM-as-a-Judge (Semantic)

Use a stronger model (GPT-4o) to evaluate the output of your application model.

- **Frameworks**: Ragas, DeepEval, Promptfoo.
- **Metrics**:
  - **Faithfulness**: Is the answer derived _only_ from the retrieved context?
  - **Answer Relevance**: Does the answer address the user's query?
  - **Context Precision**: Was the relevant chunk ranked at the top?

### 3. Human Review (Ground Truth)

- Create a "Golden Dataset" of 50-100 Q&A pairs verified by experts.
- Run regression tests against this dataset on every prompt change.

## Techniques

### Regression Testing

Treat prompts like code.

1. Change strictness in system prompt.
2. Run `promptfoo eval` against 50 test cases.
3. Compare pass rate (98% -> 92%? **Revert**).

### Guardrails

- **Input Rails**: PII detection, Jailbreak attempts.
- **Output Rails**: Hallucination check, Tone check.
- **Tools**: NeMo Guardrails, Llama Guard.
