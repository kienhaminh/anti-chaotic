# Agent Browser / Human Simulation Guide

The **Browser Subagent** allows you to interact with the web application just like a human user. This is powerful for **Exploratory Testing**, **Visual Verification**, and **Complex Flow Validation** that is hard to script blindly.

## When to Use

| Use Case            | Tool                 | Why?                                            |
| :------------------ | :------------------- | :---------------------------------------------- |
| **Regression / CI** | Playwright (Code)    | Fast, deterministic, repeatable.                |
| **Exploratory**     | **Browser Subagent** | "Try to break this," "See if this feels right." |
| **Visual Check**    | **Browser Subagent** | "Does the modal overlap the header?"            |
| **Debugging**       | **Browser Subagent** | "Go to the failed page and inspect the DOM."    |

## How to Use

When you need to "see" or "act" as a human:

1.  **Call the Tool**: Use `browser_subagent` with a clear `Task`.
2.  **Be Specific**: Give the subagent a persona and a goal.

### Example Prompts

**Scenario: verifying a login flow manually**

> "Open `local.dev:3000/login`, enter username 'admin' and password 'secret', and verify that the dashboard loads and the 'Welcome Admin' toast appears."

**Scenario: Exploratory "Monkey Testing"**

> "Go to the Checkout page. Try clicking on 'Place Order' without filling any fields. Then try filling invalid emails. Report what validation errors you see."

## Best Practices

1.  **State the Goal**: Start with "Navigate to..." and end with "Verify that..."
2.  **Define Success**: Tell the subagent what "success" looks like (e.g., "URL changes to /dashboard").
3.  **Capture Evidence**: The subagent records sessions. Use these as proof of verification for your reports.
4.  **Hybrid Approach**:
    - Use the Browser Subagent to **learn** the valid selectors and flow.
    - Use that knowledge to **write** the robust Playwright script.
