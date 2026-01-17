# Docs Folder Structure (Obsidian Optimized)

## Philosophy: Knowledge Graph

We structure documentation not just as files in folders, but as a linked **Knowledge Graph**.

- **Atomic Notes**: One concept per file.
- **Bi-directional Links**: Use `[[Wiki-links]]` to connect related concepts.
- **MOC (Map of Content)**: Index files that aggregate links for a specific topic.

## Standard Project Structure

```
docs/
├── 000-Index.md                        # "Home Page" for the Knowledge Graph
│
├── 010-Planning/                       # Project Management & Strategy
│   ├── Planning-MOC.md
│   ├── Roadmap.md                      # High-level timeline
│   ├── OKRs.md                         # Objectives and Key Results
│   └── Sprints/
│       └── Sprint-24-Goals.md
│
├── 020-Requirements/                   # The "Problem Space" (Business)
│   ├── Requirements-MOC.md
│   ├── BRD/                            # Business Requirement Documents
│   │   └── BRD-001-New-Market.md
│   └── Use-Cases/                      # Formal Use Case Specs
│       └── UC-05-Checkout.md
│
├── 022-User-Stories/                   # Agile Backlog (The "Units of Work")
│   ├── Stories-MOC.md
│   ├── Epics/
│   │   └── Epic-Authentication.md
│   ├── Active-Sprint/
│   │   └── Story-Reset-Password.md
│   └── Backlog/
│
├── 030-Specs/                          # The "Solution Space" (Technical)
│   ├── Specs-MOC.md
│   ├── Architecture/
│   │   ├── System-Context-C4.md
│   │   └── Deployment-View.md
│   ├── API/
│   │   ├── API-Standards.md
│   │   └── Endpoint-User-Login.md
│   └── Schema/
│       ├── DB-Entity-User.md
│       └── DB-Entity-Order.md
│
├── 035-QA/                             # Quality Assurance & Testing
│   ├── QA-MOC.md
│   ├── Test-Plans/                     # High-level strategies & Master Test Plans
│   │   └── MTP-Global-Launch.md
│   ├── Test-Cases/                     # Detailed test steps & Scripts
│   │   └── TC-Login-001.md
│   ├── Automation/                     # Automation documentation & Architecture
│   │   └── Playwright-Framework-Guide.md
│   ├── Reports/                        # Execution reports & Bug summaries
│   │   └── Report-2026-01-Regression.md
│   └── Performance/                    # Load/Stress testing results
│
├── 040-Design/                         # UI/UX & Frontend
│   ├── Design-MOC.md
│   ├── Wireframes/
│   │   └── WF-Login-Mobile.png
│   ├── Design-System/
│   │   ├── Typography.md
│   │   └── Color-Palette.md
│   ├── Specs/                          # Detailed Design Specifications
│   │   └── Motion-Hero-Animation.md
│   └── Assets/
│
├── 050-Research/                       # Discovery & Analysis
│   ├── Research-MOC.md
│   ├── Competitor-Analysis/
│   │   └── Analysis-Competitor-X.md
│   └── User-Interviews/
│       └── Interview-Notes-2026-01.md
│
├── 060-Manuals/                        # End-User Documentation
│   ├── Manuals-MOC.md
│   ├── User-Guide/
│   │   └── Getting-Started.md
│   └── Admin-Guide/
│       └── System-Config.md
│
├── 090-Archive/                        # Deprecated/Old Docs
│   └── v1-Legacy-Auth.md
│
└── 999-Resources/                      # Meta-documentation
    ├── Templates/
    ├── Glossary.md                     # Domain Terminology
    └── Meeting-Notes/
        └── Daily-Standup-2026-01-17.md
```

## Folder Naming Strategy (000-999)

We use the Dewey Decimal-style numbering system (`000`, `010`, `020`) to force sort order in file explorers (like VS Code or Obsidian).

| Prefix | Category     | Purpose                                             |
| :----- | :----------- | :-------------------------------------------------- |
| `000`  | Index        | The root of the graph.                              |
| `010`  | Planning     | "When and Why". Strategy, Timelines, Roadmaps.      |
| `020`  | Requirements | "What". High-level Business needs (BRD, Use Cases). |
| `022`  | User Stories | "Units". Agile Stories, Epics, Sprint Backlog.      |
| `030`  | Specs        | "How". Technical implementation details.            |
| `035`  | QA           | "Verify". Test cases, tracking, bug reports.        |
| `040`  | Design       | "Look & Feel". Visuals and UX flows.                |
| `050`  | Research     | Background info, raw data, analysis.                |
| `060`  | Manuals      | Customer-facing instructions.                       |
| `090`  | Archive      | Dinosaur graveyard. Never delete, just move here.   |
| `999`  | Resources    | Templates, Scripts, Glossary.                       |

## Inter-linking Strategy

### The MOC (Map of Content)

Every numbered folder (e.g., `020-Requirements`) MUST have a corresponding MOC file (e.g., `Requirements-MOC.md`).
This file acts as the "Table of Contents" for that folder.

**Example: `020-Requirements/Requirements-MOC.md`**

```markdown
# Requirements MOC

## Active Epics

- [[Epic-Authentication]]
- [[Epic-Checkout-Flow]]

## Pending BRDs

- [[BRD-003-Loyalty-Program]]
```

### Contextual Linking

- A **User Story** in `022` should link to a **Wireframe** in `040`.
  - `See design: [[WF-Login-Mobile]]`
- A **Technical Spec** in `030` should link to the **Requirement** in `020` it satisfies.
  - `Implements: [[Epic-Authentication]]`

## Frontmatter Standard

---

id: SPEC-001
type: specification
status: draft
owner: @backend-team
tags: [auth, security, v2.0]
linked-to: [[Epic-Authentication]]
created: 2026-01-17

---

## Project Folder Structure

This project follows a flexible structure for source code but enforces strict standards for **Agents** and **Documentation**.

```text
/
├── .agent/                 # [FIXED] Agent configuration, skills, and templates
│   ├── skills/             # Agent skills
│   └── templates/          # Centralized templates (including this file)
├── docs/                   # [FIXED] The Knowledge Graph (see above)
├── src/                    # [FLEXIBLE] Source code (React, Python, Go, etc.)
├── tests/                  # [FLEXIBLE] Test suite
└── ...
```

### Key Directories

- **`.agent/`**: The brain. Contains `skills/` (roles) and `templates/` (artifacts).
- **`docs/`**: The memory. All knowledge must be committed here using the Dewey Decimal system defined above.
