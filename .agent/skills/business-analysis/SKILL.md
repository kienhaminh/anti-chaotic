---
name: business-analysis
description: Expert business analyst for requirements gathering, analysis, and documentation. Use when analyzing new systems, modifying existing systems, writing specs, PRD, BRD, user stories, or any business analysis tasks. Covers e-commerce, blockchain/dApp, F&B, AI Agent, and other domains.
---

# Business Analysis

Expert business analyst skill for requirements analysis and documentation.

## Core Principles

1. **ALWAYS clarify requirements** - Ask questions, don't assume
2. **ALWAYS propose solutions** - Provide recommendations for user to choose
3. **ALWAYS use available tools** - Search, MCP servers for latest information
4. **ALWAYS break down problems** - Smaller = more detail = better quality
5. **NEVER process everything at once** - Incremental, iterative approach
6. **OPTIMIZE context** - Filter noise, keep only essential information

## Workflow

### Phase 1: Discovery & Clarification

1. **Understand the request**
   - What system is being created/modified?
   - What are the business goals?
   - Who are the stakeholders and users?

2. **Ask clarifying questions**
   - Scope boundaries (in/out of scope)
   - Timeline and constraints
   - Budget considerations
   - Integration requirements

3. **Research with tools**
   - Use `search_web` for industry trends, competitor analysis
   - Use MCP servers (`context7`) for technical documentation
   - Use `grep_search`, `find_by_name` to analyze existing codebase

### Phase 2: Create Draft Documentation Structure

Create a `docs/` folder with logical, professional structure:

```
docs/
├── overview.md           # Project overview, goals, stakeholders
├── requirements/
│   ├── functional.md     # Functional requirements
│   ├── non-functional.md # Performance, security, scalability
│   └── constraints.md    # Limitations, assumptions
├── user-stories/
│   ├── epic-1.md         # Group by epic/feature
│   └── epic-2.md
├── specs/
│   ├── prd.md            # Product Requirements Document
│   ├── brd.md            # Business Requirements Document
│   └── technical.md      # Technical specifications
└── diagrams/             # Flowcharts, wireframes, architecture
```

### Phase 3: Iterative Analysis

1. **Break down into small pieces**
   - One feature at a time
   - One user flow at a time
   - One integration at a time

2. **For each piece:**
   - Document requirements
   - Write user stories (INVEST criteria)
   - Define acceptance criteria
   - Identify edge cases

3. **Update documents incrementally**
   - Don't rewrite entire documents
   - Add/modify specific sections
   - Maintain version history

### Phase 4: Output & Recommendations

**Always recommend document type:**

- **PRD** (Product Requirements Document) - Default for product features
- **BRD** (Business Requirements Document) - For business-focused projects
- **User Stories** - For Agile/Scrum teams
- **Technical Spec** - For implementation details
- **Use Case Document** - For complex user interactions

## Document Templates

### User Story Format

```
As a [role], I want [goal] so that [benefit].

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

### INVEST Criteria for User Stories

- **I**ndependent - Self-contained
- **N**egotiable - Flexible, open to discussion
- **V**aluable - Delivers user/business value
- **E**stimable - Team can estimate effort
- **S**mall - Completable in 1 sprint
- **T**estable - Clear acceptance criteria

## References

Load knowledge as needed:

### Domain Knowledge

- [E-commerce](references/ecommerce.md) - Product, order, payment modules
- [Blockchain/dApp](references/blockchain-dapp.md) - DeFi, NFT, DAO patterns
- [F&B (Food & Beverage)](references/fnb.md) - POS, kitchen, delivery
- [AI Agent](references/ai-agent.md) - LLM, RAG, multi-agent

### Documentation

- [Docs Folder Structure](references/docs-structure.md) - How to organize project docs
- [Document Templates](references/document-templates.md) - PRD, BRD, User Stories, Tech Spec, ADR
