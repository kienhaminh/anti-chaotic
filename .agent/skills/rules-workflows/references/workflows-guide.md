# Workflows Creation Guide

## Creating Workflows via UI

1. Open **Customizations** panel via "..." dropdown in agent panel
2. Navigate to **Workflows** panel
3. Click **+ Global** or **+ Workspace** to create workflow

## Workflow File Template

A basic workflow template is available in `../assets/workflow-basic.md`.

This template serves as a comprehensive guide for structuring workflows, including tool usage, step definitions, and referencing other skills.

## Calling Other Workflows

Chain workflows together:

```markdown
## Step 4: Deploy

Call /deploy-staging
```

## Agent-Generated Workflows

After performing a task manually, ask agent to formalize it:

> "Create a workflow from our conversation about deploying to production"

## Workflow Design Principles

When creating new workflows, strictly follow **"Workflow = Process"**:

1.  **Sequence over Standards**: Define _what_ to do and _when_, but delegate _how_ to Skills.
2.  **Refer to roles**: Use "As [Role]" or "Call [Skill]" instead of hardcoding instructions.
3.  **Dynamic References**:
    - ❌ `Ensure indentation is 2 spaces.` (Hardcoded knowledge)
    - ✅ `Format code according to project standards defined in [frontend-developer] skill.` (Dynamic reference)

## Best Practices

1. **Clear step names** - Describe the action in step title
2. **Atomic steps** - One logical action per step
3. **Include verification** - Add steps to confirm success
4. **Document prerequisites** - State what's needed before running
