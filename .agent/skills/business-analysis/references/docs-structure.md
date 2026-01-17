# Docs Folder Structure

## Standard Project Documentation Structure

```
docs/
├── README.md                   # Documentation index and navigation
├── overview/
│   ├── project-brief.md        # High-level project summary
│   ├── stakeholders.md         # Stakeholder analysis
│   └── glossary.md             # Domain terminology
│
├── requirements/
│   ├── business-requirements.md    # BRD content
│   ├── functional-requirements.md  # Functional specs
│   ├── non-functional.md           # Performance, security, scalability
│   └── constraints.md              # Assumptions and limitations
│
├── user-stories/
│   ├── README.md               # Epic index
│   ├── epic-001-auth.md        # Grouped by epic/feature
│   ├── epic-002-products.md
│   └── epic-003-orders.md
│
├── specs/
│   ├── prd.md                  # Product Requirements Document
│   ├── technical-spec.md       # Technical architecture
│   ├── api-spec.md             # API documentation
│   └── database-spec.md        # Database schema
│
├── diagrams/
│   ├── architecture.md         # System architecture
│   ├── user-flows.md           # User journey diagrams
│   ├── data-flow.md            # Data flow diagrams
│   └── erd.md                  # Entity relationship
│
└── decisions/
    ├── adr-001-framework.md    # Architecture Decision Records
    └── adr-002-database.md
```

## File Naming Conventions

- Use lowercase with hyphens: `user-authentication.md`
- Prefix with numbers for ordering: `001-overview.md`
- Use descriptive names: `functional-requirements.md` not `fr.md`

## Document Sections

### Every document should have:

```markdown
# [Document Title]

## Overview

Brief description of this document's purpose.

## Status

Draft | In Review | Approved | Deprecated

## Last Updated

YYYY-MM-DD

## Owner

[Name/Role]

---

[Content]

---

## Revision History

| Date | Version | Author | Changes |
| ---- | ------- | ------ | ------- |
|      |         |        |         |
```

## When to Create Each Folder

| Folder          | Create When                           |
| --------------- | ------------------------------------- |
| `overview/`     | Always - project foundation           |
| `requirements/` | Analyzing business needs              |
| `user-stories/` | Agile/Scrum team, feature breakdown   |
| `specs/`        | Technical implementation planning     |
| `diagrams/`     | Complex systems, visual documentation |
| `decisions/`    | Significant architectural choices     |

## Incremental Documentation Strategy

1. **Start minimal**: Create `README.md` and `overview/project-brief.md`
2. **Expand as needed**: Add folders when that type of documentation becomes necessary
3. **Keep updated**: Update docs as requirements evolve
4. **Link everything**: Use relative links between documents
