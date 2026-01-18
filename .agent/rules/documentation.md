---
trigger: model_decision
description: Always apply when creating, organizing, or modifying documentation files
---

# Documentation Structure Rule

> [!IMPORTANT]
> This rule is **MANDATORY** for all documentation operations. Violations will result in incorrect project structure.

## Critical Rules (MUST Follow)

1. **MUST** save all documents to `docs/` folder - NEVER create documents in project root or other folders
2. **MUST** use Dewey Decimal folder structure (010, 020, 030, etc.)
3. **MUST** include YAML frontmatter in every document
4. **MUST** update relevant MOC file after creating a new document
5. **MUST** use wiki-links `[[Document-Name]]` for cross-references
6. **MUST NOT** create custom folder structures like `01-product/`, `02-analysis/`
7. **MUST NOT** create documents without checking Document Type Mapping first

## Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│ BEFORE creating any document, ask yourself:                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Does docs/ folder exist?                                 │
│    NO  → Create folder structure (see Required Structure)   │
│    YES → Continue                                           │
├─────────────────────────────────────────────────────────────┤
│ 2. What type of document is this?                           │
│    → Look up in Document Type Mapping table                 │
│    → Get exact target folder and naming convention          │
├─────────────────────────────────────────────────────────────┤
│ 3. Does target folder exist?                                │
│    NO  → Create it with proper Dewey Decimal prefix         │
│    YES → Continue                                           │
├─────────────────────────────────────────────────────────────┤
│ 4. Create document with:                                    │
│    → Correct naming convention                              │
│    → Required frontmatter                                   │
│    → Wiki-links to related documents                        │
├─────────────────────────────────────────────────────────────┤
│ 5. AFTER creating document:                                 │
│    → Update parent folder's MOC file                        │
│    → Update 000-Index.md if major document                  │
└─────────────────────────────────────────────────────────────┘
```

## Document Type Mapping

| Category             | Document Type       | Target Folder                          | Naming Convention          |
| -------------------- | ------------------- | -------------------------------------- | -------------------------- |
| **010-Planning**     | Roadmap             | `docs/010-Planning/`                   | `Roadmap.md`               |
|                      | OKRs                | `docs/010-Planning/`                   | `OKRs.md`                  |
|                      | Sprint              | `docs/010-Planning/Sprints/`           | `Sprint-{NNN}.md`          |
| **020-Requirements** | PRD                 | `docs/020-Requirements/`               | `PRD-{ProjectName}.md`     |
|                      | BRD                 | `docs/020-Requirements/BRD/`           | `BRD-{NNN}-{Title}.md`     |
|                      | Use Case            | `docs/020-Requirements/Use-Cases/`     | `UC-{NN}-{Title}.md`       |
| **022-User-Stories** | Epic                | `docs/022-User-Stories/Epics/`         | `Epic-{Title}.md`          |
|                      | User Story          | `docs/022-User-Stories/Backlog/`       | `Story-{Title}.md`         |
|                      | Active Story        | `docs/022-User-Stories/Active-Sprint/` | `Story-{Title}.md`         |
| **030-Specs**        | ADR                 | `docs/030-Specs/Architecture/`         | `ADR-{NNN}-{Title}.md`     |
|                      | RFC                 | `docs/030-Specs/Architecture/`         | `RFC-{NNN}-{Title}.md`     |
|                      | SDD (System Design) | `docs/030-Specs/Architecture/`         | `SDD-{ProjectName}.md`     |
|                      | Technical Spec      | `docs/030-Specs/`                      | `Spec-{Feature}.md`        |
|                      | API Endpoint Spec   | `docs/030-Specs/API/`                  | `Endpoint-{Name}.md`       |
|                      | DB Schema           | `docs/030-Specs/Schema/`               | `DB-Entity-{Name}.md`      |
| **035-QA**           | Test Plan           | `docs/035-QA/Test-Plans/`              | `MTP-{Name}.md`            |
|                      | Test Case           | `docs/035-QA/Test-Cases/`              | `TC-{Feature}-{NNN}.md`    |
| **040-Design**       | Design System       | `docs/040-Design/Design-System/`       | `{Component}.md`           |
|                      | Wireframe           | `docs/040-Design/Wireframes/`          | `WF-{Screen}-{Device}.png` |
| **050-Research**     | Research/Analysis   | `docs/050-Research/`                   | `Analysis-{Topic}.md`      |
| **060-Manuals**      | User Guide          | `docs/060-Manuals/User-Guide/`         | `{Topic}.md`               |
|                      | Admin Guide         | `docs/060-Manuals/Admin-Guide/`        | `{Topic}.md`               |
| **090-Archive**      | Deprecated Docs     | `docs/090-Archive/`                    | `{Original-Name}.md`       |
| **999-Resources**    | Meeting Notes       | `docs/999-Resources/Meeting-Notes/`    | `{Type}-{Date}.md`         |
|                      | Glossary            | `docs/999-Resources/`                  | `Glossary.md`              |
|                      | Template            | `docs/999-Resources/Templates/`        | `Template-{Type}.md`       |

## Required Folder Structure

```
docs/
├── 000-Index.md                        # "Home Page" - MUST exist
│
├── 010-Planning/                       # Strategy, Timelines, Roadmaps
│   ├── Planning-MOC.md                 # REQUIRED MOC
│   ├── Roadmap.md
│   ├── OKRs.md
│   └── Sprints/
│
├── 020-Requirements/                   # Business Requirements
│   ├── Requirements-MOC.md             # REQUIRED MOC
│   ├── BRD/
│   └── Use-Cases/
│
├── 022-User-Stories/                   # Agile Backlog
│   ├── Stories-MOC.md                  # REQUIRED MOC
│   ├── Epics/
│   ├── Active-Sprint/
│   └── Backlog/
│
├── 030-Specs/                          # Technical Specs
│   ├── Specs-MOC.md                    # REQUIRED MOC
│   ├── Architecture/
│   ├── API/
│   └── Schema/
│
├── 035-QA/                             # Quality Assurance
│   ├── QA-MOC.md                       # REQUIRED MOC
│   ├── Test-Plans/
│   ├── Test-Cases/
│   ├── Automation/
│   ├── Reports/
│   └── Performance/
│
├── 040-Design/                         # UI/UX & Frontend
│   ├── Design-MOC.md                   # REQUIRED MOC
│   ├── Wireframes/
│   ├── Design-System/
│   ├── Specs/
│   └── Assets/
│
├── 050-Research/                       # Discovery & Analysis
│   ├── Research-MOC.md                 # REQUIRED MOC
│   ├── Competitor-Analysis/
│   └── User-Interviews/
│
├── 060-Manuals/                        # End-User Documentation
│   ├── Manuals-MOC.md                  # REQUIRED MOC
│   ├── User-Guide/
│   └── Admin-Guide/
│
├── 090-Archive/                        # Deprecated docs (never delete)
│
└── 999-Resources/                      # Templates, Scripts, Glossary
    ├── Templates/
    ├── Glossary.md
    └── Meeting-Notes/
```

## Frontmatter Template

Every document MUST include this frontmatter:

```yaml
---
id: {TYPE}-{NNN}           # Unique identifier (e.g., PRD-001, UC-01)
type: {document_type}      # prd, brd, use-case, epic, story, spec, adr, etc.
status: draft|review|approved|deprecated
project: {project_name}    # Optional: for multi-project docs
owner: @{team_or_person}   # Optional: responsible party
tags: [tag1, tag2]         # Optional: for search/filtering
linked-to: [[Related-Doc]] # Optional: primary relationship
created: YYYY-MM-DD
updated: YYYY-MM-DD        # Optional: last update date
---
```

## Linking Rules

1. **PRD** → links to Epics it spawns: `## Related Epics\n- [[Epic-Feature1]]\n- [[Epic-Feature2]]`
2. **Epic** → links to parent PRD: `Implements: [[PRD-ProjectName]]`
3. **Use Case** → links to Epic: `Part of: [[Epic-Feature]]`
4. **SDD** → links to PRD: `Implements: [[PRD-ProjectName]]`
5. **ADR** → links to SDD: `Related to: [[SDD-ProjectName]]`

## Validation Checklist

Before finalizing any document, verify:

- [ ] Document is in correct `docs/XXX-Category/` folder
- [ ] Filename follows naming convention from mapping table
- [ ] Frontmatter includes required fields (id, type, status, created)
- [ ] Wiki-links to related documents are added
- [ ] Parent folder's MOC file is updated with link to new document
- [ ] 000-Index.md updated (for major documents like PRD, SDD)
