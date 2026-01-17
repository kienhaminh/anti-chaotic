---
description: End-to-end Agile feature implementation workflow
---

# Agile Feature Implementation

## Step 1: Requirements Analysis

**Role: Product Manager**

Analyze the user's request.

1.  Identify the core problem and user goal.
2.  Define success criteria.
3.  List key constraints (tech stack, performance, etc.).
4.  Generate a list of user stories or acceptance criteria.

If requirements are vague, STOP and ask the user for clarification.

## Step 2: Technical Specification

**Role: Lead Architect**

Create a technical design for the feature.

1.  Propose the architecture changes.
2.  Identify necessary file changes (New/Modified/Deleted).
3.  Define API contracts or data models.
4.  Assess security and performance implications.

## Step 3: Implementation Strategy

**Role: Sequential Thinking**

Plan the coding steps.

1.  Break down the implementation into small, testable chunks.
2.  Identify dependencies between steps.
3.  Plan for edge cases and error handling.
4.  **Output**: A step-by-step implementation plan in `task.md`.

## Step 4: Coding & TDD

**Role: Developer (Backend/Frontend)**

Execute the plan.

1.  Create/Update tests first (if TDD is followed).
2.  Implement the code for one chunk.
3.  Run tests to verify.
4.  Repeat until feature is complete.

## Step 5: Verification & QA

**Role: QA Tester**

Verify the implementation.

1.  Run the full test suite.
2.  Perform manual verification steps (if strictly necessary).
3.  Check against the original acceptance criteria.
4.  Generate a final `walkthrough.md` report.
