---
description: Create comprehensive test case documents and test plans based on project requirements.
---

# QA Workflow

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                      |
| :------------------------------------------- | :----------------------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze complex application logic and edge cases |
| `mcp_context7_query-docs`                    | Research testing frameworks or best practices    |

---

## Step 1: Requirement Discovery

// turbo

1. **Invoke `[qa-tester]` skill** to analyze the `docs/` folder.
2. Identify features, constraints, and business logic that require testing.
3. Map out:
   - Happy Paths (Golden Flows)
   - Negative Paths (Error handling)
   - Boundary Cases
   - Security/Performance considerations
4. **WAIT** for user to confirm the list of scenarios to be documented.

---

## Step 2: Draft Test Documentation

// turbo

1. **Invoke `[qa-tester]` skill** to create:
   - **Test Plan**: High-level strategy for the current release/feature (`docs/035-QA/Test-Plans/`).
   - **Test Cases**: Detailed step-by-step cases (`docs/035-QA/Test-Cases/`).
2. Follow the standard mapping in `.agent/rules/documents.md`:
   - Test Plan naming: `MTP-{Name}.md`
   - Test Case naming: `TC-{Feature}-{NNN}.md`
3. Create a `draft-qa-docs.md` artifact for review.

---

## Step 3: Finalize and Organize

// turbo

1. After approval, save all files to their respective folders in `docs/035-QA/`.
2. **Mandatory**:
   - Update `docs/035-QA/QA-MOC.md`.
   - Update `docs/000-Index.md` if needed.
   - Ensure all frontmatter (id, type, status, created) is correctly populated according to `.agent/rules/documents.md`.
3. Present summary of created tests.
