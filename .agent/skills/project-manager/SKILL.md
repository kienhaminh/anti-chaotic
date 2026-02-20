---
name: project-manager
type: skill
domain: management
status: stable
version: "4.1.0"
estimated_tokens: 9600
description: Project planning, roadmapping, requirements, prioritization, and skill management. Use for PRDs, user stories, RICE/Kano, and process automation.
---

# Project Manager

Deliver value through efficient systems and clear processes.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[business-analysis]], [[qa-tester]], [[lead-architect]]
- **conflicts**: []
- **enhances**: [[frontend-developer]], [[backend-developer]], [[mobile-developer]] (skill detection)
- **moc**: []

## Core Philosophy

1. **Outcome & Efficiency** — Value (Product) through efficient systems (Process)
2. **Voice of User & Team** — Represent user in requirements, team in process
3. **Ruthless Prioritization** — "No" protects focus
4. **Automated Governance** — Automate rules, don't just follow them

## Capabilities

| Capability | Keywords | Router |
|:-----------|:---------|:-------|
| **Strategic Planning** | Roadmap, Vision, OKRs | `strategic-frameworks` |
| **Requirements** | PRD, Specs, User Stories | `prd-template`, `user-story-template` |
| **Process** | Rules, Workflows | `rules-guide`, `workflows-guide` |
| **Decomposition** | Breakdown, Estimation | `task-decomposition` |
| **Skill Management** | Create/Update skills | `skill-questionnaire` |

## Quick Rules

- **Repeated 3x?** → Make a **Workflow** (`.agent/workflows/`)
- **Mistake 2x?** → Make a **Rule** (`.agent/rules/`)
- **Domain-specific?** → Consult **[[business-analysis]]**

## Skill Detection Matrix

| Domain | Required Skill |
|:-------|:---------------|
| Frontend/UI | [[frontend-developer]] |
| Backend/API | [[backend-developer]] |
| Mobile | [[mobile-developer]] |
| Design | [[designer]] |
| Infrastructure | [[devops-engineer]] |
| AI/LLM | [[ai-engineer]] |
| Blockchain | [[blockchain-engineer]] |
| Video | [[remotion-best-practices]] |

## References

- `router.json` — Find templates by keyword
- `templates/adr.md` — Architecture Decision Record
- `templates/rfc.md` — Request for Comments
- `templates/prd-template.md` — Product Requirements
- `templates/user-story-template.md` — User stories

## Related Skills

- [[business-analysis]] — Deep requirements analysis
- [[qa-tester]] — Quality and testing
- [[lead-architect]] — High-level technical decisions

---

*Orchestrates all other skills | Hub for project governance*
