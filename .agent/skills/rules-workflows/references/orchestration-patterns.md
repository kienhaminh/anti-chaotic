# Skill Orchestration Patterns

These patterns guide how to combine multiple specialized skills to solve complex problems.

## 1. The "Spec-First" Pattern

**Best for**: New features, major refactors.
**Sequence**: `product-manager` -> `lead-architect` -> `backend-developer`/`frontend-developer`.

1.  **PM**: Defines _what_ and _why_.
2.  **Architect**: Defines _how_ (structure, data flow).
3.  **Dev**: Implements the _code_.

**Rule**: Developers should never start coding without an approved plan/spec from the Architect.

## 2. The "TDD" Pattern

**Best for**: Bug fixes, complex logic with clear inputs/outputs.
**Sequence**: `qa-tester` -> `backend-developer`.

1.  **QA**: Writes a failing test case that reproduces the bug or defines the feature.
2.  **Dev**: Writes code to make the test pass.
3.  **QA**: Verifies and adds regression tests.

## 3. The "Design-Driven" Pattern

**Best for**: UI/UX work.
**Sequence**: `designer` -> `frontend-developer`.

1.  **Designer**: creating the look & feel, animations, and component structure.
2.  **Dev**: Translates the design into React/CSS code.

## 4. The "Reasoning" Bridge

**Best for**: Ambiguity, complex debugging.
**Sequence**: `[Any Skill]` -> `sequential-thinking` -> `[Any Skill]`.

Use `sequential-thinking` as a bridge whenever you get stuck or need to plan the next move.

- "I have the error log, but don't know the cause." -> **Think** -> "Hypothesis: DB connection timeout."
- "I have the requirements, but don't know which library to use." -> **Think** -> "Evaluate options A, B, C."
