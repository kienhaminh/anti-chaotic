# Workflows Creation Guide

## Creating Workflows via UI

1. Open **Customizations** panel via "..." dropdown in agent panel
2. Navigate to **Workflows** panel
3. Click **+ Global** or **+ Workspace** to create workflow

## Workflow File Template

```markdown
---
description: [Brief description for workflow discovery]
---

# Workflow Title

[Optional overview of what this workflow accomplishes]

## Step 1: [Action Name]

[Detailed instructions for this step]

## Step 2: [Action Name]

[Detailed instructions for this step]

## Step 3: [Action Name]

[Detailed instructions for this step]
```

## Calling Other Workflows

Chain workflows together:

```markdown
## Step 4: Deploy

Call /deploy-staging
```

## Agent-Generated Workflows

After performing a task manually, ask agent to formalize it:

> "Create a workflow from our conversation about deploying to production"

## Best Practices

1. **Clear step names** - Describe the action in step title
2. **Atomic steps** - One logical action per step
3. **Include verification** - Add steps to confirm success
4. **Document prerequisites** - State what's needed before running
