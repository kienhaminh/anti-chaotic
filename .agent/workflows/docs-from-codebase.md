---
description: Generate comprehensive documentation from existing codebase (Architecture, API, Specs).
---

# Generate Documentation from Codebase

Automatically generates structured documentation from an existing codebase.

> [!IMPORTANT]
> **MANDATORY**: Apply `.agent/rules/documentation.md` for all document creation.

---

## MCP Usage Guidelines

| MCP Tool                                     | When to Use                                    |
| -------------------------------------------- | ---------------------------------------------- |
| `mcp_sequential-thinking_sequentialthinking` | Analyze complex architecture, design decisions |
| `mcp_context7_query-docs`                    | Research framework patterns, diagram syntax    |

---

## Step 1: Codebase Discovery

// turbo

> 💡 **MCP**: Use `sequential-thinking` to analyze unfamiliar project structures

1. **Invoke `[lead-architect]` skill** to analyze codebase structure
2. Identify: tech stack, entry points, API routes, DB schemas
3. **WAIT** for user to confirm understanding

---

## Step 2: Determine Scope

// turbo

Ask user which documentation to generate:

- System Architecture
- API Documentation
- Database Schema
- Component Reference

**Default**: Generate all if not specified.

---

## Step 3: Generate Architecture Documentation

// turbo

> 💡 **MCP**: Use `sequential-thinking` + `context7` with `/mermaid-js/mermaid` for C4 diagrams

1. **Invoke `[lead-architect]` skill** to create:
   - System Context (C4 Context Diagram)
   - Component View (C4 Component Diagram)
   - Data Flow documentation

---

## Step 4: Generate API Documentation

// turbo

> 💡 **MCP**: Use `context7` for framework-specific API patterns

1. **Invoke `[backend-developer]` skill** to:
   - Scan and document API routes
   - Create endpoint specifications

---

## Step 5: Generate Database Schema Documentation

// turbo

> 💡 **MCP**: Use `context7` with `/drizzle-team/*` or `/prisma/*` + `/mermaid-js/mermaid` for ERD

1. **Invoke `[backend-developer]` skill** to:
   - Document entities and relationships
   - Generate ERD diagram

---

## Step 6: Finalize

// turbo

1. Create/update MOC files
2. Validate wiki-links and frontmatter
3. Present summary and suggest next steps

---

## Quick Reference

| Step | Skill             | Output            |
| ---- | ----------------- | ----------------- |
| 1    | lead-architect    | Codebase analysis |
| 3    | lead-architect    | Architecture docs |
| 4    | backend-developer | API docs          |
| 5    | backend-developer | Schema docs       |
