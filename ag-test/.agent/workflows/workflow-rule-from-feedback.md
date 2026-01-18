---
description: Create or update a project rule based on specific user feedback or corrections.
---

# Workflow: Extract Rule from Feedback

Use this workflow when the user provides explicit feedback about how they want the agent to behave, code preferences, or structural constraints (e.g., "Don't use library X", "Always name files Y").

## Step 1: Analyze Feedback & Existing Rules

1.  **Analyze the User's Request**: Identifying the constraint or preference. Is it a global preference or specific to a file type?
2.  **Check Existing Rules**: Look in `.agent/rules/` to see if a conflicting or similar rule already exists.
    - If it contradicts an existing rule, you will need to UPDATE the old rule.
    - If it's new, you will CREATE a new rule.

## Step 2: Determine Target Rule File

Decide where this rule belongs:

- **Default**: Update `.agent/rules/project-rules.md`. This is the central source of truth.
- **Exception**: If the rule is extremely complex or requires a very specific glob pattern (e.g., specific to only `.css` files), create a dedicated file.

## Step 3: Update Project Content

1.  **Read**: Read `.agent/rules/project-rules.md`.
2.  **Append/Update**: Add the new rule to the "Key Conventions" or "User Preferences" section.
    - Format: `- **[Rule Name]**: [Description]`.
3.  **Conflict Check**: Ensure it doesn't contradict existing lines.

## Step 4: Write the File

1.  Use `replace_file_content` (or `write_to_file` if creating new) to save the changes.
2.  **Validation**: Ensure the file format remains valid markdown.

## Step 5: Confirmation

1.  Notify the user that the rule has been learned.
2.  (Optional) If this feedback was given during a task, ask if you should re-run the previous step with the new rule applied.
