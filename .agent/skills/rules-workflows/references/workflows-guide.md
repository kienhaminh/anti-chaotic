# Building High-Performance Workflows

> "Workflows are the operating system of your delivery pipeline."

This guide is designed for Project Managers, COOs, and Architects to codify operational excellence into executable Agent processes.

## 1. The Core Philosophy

Effective workflows shift the Agent from "Ad-hoc Assistant" to "Autonomous Operator".

| Ad-hoc Request          | Systematized Workflow                                             |
| :---------------------- | :---------------------------------------------------------------- |
| "Help me test this."    | **Run `/qa-feature`**: Analyze -> Test Plan -> Execute -> Report. |
| "Deploy this."          | **Run `/deploy`**: Lint -> Build -> Test -> Staging -> Prod.      |
| **High Cognitive Load** | **Zero Cognitive Load**                                           |

## 2. Anatomy of an Effective Workflow

A workflow is not just a list of steps. It is a **Contract of Execution**.

### Key Components

1.  **The Trigger**: Explicit starting condition (User request, file change, manual invocation).
2.  **The Context**: Loading necessary rules (`rules/documents.md`) and skills (`[product-manager]`).
3.  **The Process**: Sequential steps with explicit hand-offs.
4.  **The Verification**: Mandatory checkpoints to prevent error propagation.

## 3. Designing for Efficiency (The "COO Mindset")

To build workflows that work at scale, apply these principles:

### A. Principle of Delegation (Process vs. Skill)

**Never hardcode specific technical knowledge in a workflow.**

- ❌ **Fragile**: "Step 1: Run `npm install react@18`."
- ✅ **Robust**: "Step 1: Install dependencies using standard practices defined in `[frontend-developer]` skill."

### B. Principle of "Turbo" execution

**Optimize for speed where safety allows.**
Use the `// turbo` annotation for steps that are read-only or safe to retry. This allows the Agent to execute without stopping for approval.

- **Use for**: Reading files, generating docs, running local tests.
- **Avoid for**: Deleting files, pushing to production, external API calls with costs.

### C. Principle of "Stop-the-Line" (Checkpoints)

**Fail early, fail loudly.**
Insert `**WAIT**` steps after critical actions (e.g., after Requirement Analysis, before Deployment). This is your quality gate.

## 4. Structural Template

Use this structure for all production-grade workflows:

```markdown
---
description:
  [Action-oriented description, e.g., "End-to-end Feature Implementation"]
---

# [Workflow Name]

## 1. Initialization

1. Load Global Rules: `documents.md`.
2. Analyze Context: Identify touched files.

## 2. Phase I: Definition (The "PM" Phase)

> 💡 **Tip**: Clarify before coding.

1. Invoke **[product-manager]** to refine requirements.
   // turbo
2. Create `docs/specs/feature-x.md`.
3. **WAIT** for user approval.

## 3. Phase II: Execution (The "Dev" Phase)

1. Read `docs/specs/feature-x.md`.
2. Invoke **[lead-architect]** to update `implementation-plan.md`.
3. Invoke **[backend-developer]** for API changes.
4. Invoke **[frontend-developer]** for UI changes.

## 4. Phase III: Verification (The "QA" Phase)

1. Invoke **[qa-tester]** to run test suite.
2. Verify all tests pass.
```

## 5. Advanced Orchestration Patterns

### Chaining Workflows

Don't build monoliths. Compose small, focused workflows.

```markdown
## Step 5: Deployment

Call /deploy-staging
```

### Dynamic Branching (via Logic)

Workflows are linear, but the _Agent_ is dynamic. Use logic in steps:

```markdown
## Step 2: Determine Path

IF requirements are unclear:

- Call [business-analysis]
  ELSE:
- Proceed to Step 3
```

## 6. Maintenance & KPI

Treat workflows like products.

- **Review**: Does the workflow still match how the team works?
- **Optimize**: Are we stopping too often? (Add `// turbo`). Are we breaking things? (Add Checkpoints).
- **Refactor**: If a workflow steps become too complex, extract them into a dedicated Skill or a Sub-workflow.
