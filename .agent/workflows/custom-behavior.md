---
description: Workflow for safely customizing Agent rules and workflows with impact analysis and user confirmation.
---

# Custom Behavior Workflow

## Tool Usage Guidelines

| Tool            | When to Use                                          | Example Query                                                   |
| --------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `find_by_name`  | Step 1: To find if a rule/workflow already exists    | `Pattern="*security*", SearchDirectory=".agent/rules"`          |
| `view_file`     | Step 2: To read the existing content for comparison  | `AbsolutePath="/.../.agent/rules/security.md"`                  |
| `notify_user`   | Step 3: To present analysis and ask for confirmation | `Message="I found an existing rule. Do you want to overwrite?"` |
| `write_to_file` | Step 4: To create or overwrite the file              | `Overwrite=true`                                                |

## Step 1: Identification & Search

// turbo

> 💡 **Tip**: Don't assume the file doesn't exist. Always search first.

1.  Analyze the user's request to identify the _intent_ (e.g., "Add stricter linting", "Skip tests in deployment").
2.  Search for existing Rules or Workflows that might already cover this.
    - Rules: search in `.agent/rules/`
    - Workflows: search in `.agent/workflows/`

## Step 2: Impact Analysis

> 💡 **Tip**: If a file exists, you MUST read it and compare it with the request.

**Condition A: Target does NOT exist:**

1.  Verify if a template exists in `.agent/assets/` or `references/` that could be used as a base.
2.  Draft the new content in your memory.

**Condition B: Target ALREADY exists:**

1.  **Read** the current content of the file.
2.  **Compare** the User's request vs the Current Content.
3.  **Identify Conflicts**:
    - Will this break existing constraints?
    - Is this a "Breaking Change" or just an "Enhancement"?
4.  **Formulate Recommendation**:
    - _Adapt_: "I recommend creating a new file `custom-X.md` to avoid breaking standard X."
    - _Override_: "This helps matches your specific need, but removes the safety check Y."

## Step 3: User Confirmation

> 💡 **Tip**: You must be explicit about what will change.

1.  **Notify User** with a summary of your analysis.
    - If **New**: "I will create a new rule [filename] that [does X]."
    - If **modifying**: "I will modify [filename]. \n**Current**: [Summary of old]\n**Proposed**: [Summary of new]\n**Impact**: [Warning about side effects]"
2.  **WAIT** for user approval.

## Step 4: Execution

1.  Perform the file operation (`write_to_file` or `replace_file_content`).
2.  **Validate**: Read the file back to ensure syntax is correct (Markdown/YAML frontmatter).
3.  **Register**: If it's a rule, remind the user if they need to manually activate it (unless it's `always_on`).

## Step 5: Verification

1. Check if the customization works as expected (if possible, by running a dry-run or asking user to test).
