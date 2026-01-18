---
description: Scientific debugging workflow: Hypothesize, Instrument, Reproduce, Analyze, Fix.
---

# Scientific Debug & Fix Workflow

> [!IMPORTANT]
> **GOAL**: Follow a scientific process to identify root causes with EVIDENCE before applying fixes.
> **Best for**: Hard-to-reproduce bugs, race conditions, performance issues, and regressions.

---

## Step 1: Hypothesis Generation

1. **Analyze the Issue**: Review the bug report and available context.
2. **Generate Hypotheses**: Brainstorm multiple potential causes (e.g., "Race condition in data fetching", "Incorrect state update logic", "Edge case in input validation").
3. **Select Top Candidates**: Prioritize the most likely hypotheses to investigate first.

---

## Step 2: Instrumentation

1. **Plan Logging**: Decide WHERE key information is missing to validate your hypotheses.
2. **Add Logging**: Instrument the code with targetted `console.log`, specific logger calls, or performance markers.
   - _Goal_: Capture runtime state, variable values, and execution flow relevant to the hypotheses.
   - _Tip_: Add unique prefixes to logs (e.g., `[DEBUG-HYPOTHESIS-1]`) for easy filtering.

---

## Step 3: Reproduction & Data Collection

1. **Execution**: Run the application or test case to reproduce the bug.
   - If a reproduction script doesn't exist, create one now if possible.
2. **Collect Data**: Capture the output from your instrumentation.

---

## Step 4: Analysis & Root Cause

1. **Analyze Evidence**: Look at the collected logs/data.
   - Does the data confirm a hypothesis?
   - Does it rule one out?
2. **Pinpoint Root Cause**: Identify exactly _why_ the bug is happening based on the evidence.
3. **Iterate (if needed)**: If inconclusive, return to Step 1 or 2 with new knowledge.

---

## Step 5: Targeted Implementation

1. **Apply Fix**: Implement a targeted fix based _only_ on the confirmed root cause. Avoid "shotgun debugging" (changing things randomly).
2. **Cleanup**: Remove the temporary debugging instrumentation.

---

## Step 6: Verification

// turbo

1. **Run Reproduction Test**: Verify that the bug is gone.
2. **Run Regression Tests**: Run related unit tests to ensure no side effects.
3. **Lint & Type Check**: Ensure code quality standards are met.

---

## Step 7: Finalize

1. **Draft Commit**: Create a concise commit message (e.g., `fix(module): description of fix`).
2. **Report**: Summarize the process:
   - What was the hypothesis?
   - What evidence confirmed it?
   - How was it fixed?
