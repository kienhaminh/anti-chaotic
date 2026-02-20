---
name: lead-architect
type: skill
domain: infra
status: stable
version: "2.0.0"
estimated_tokens: 4800
description: High-stakes technical decisions, system design, cloud infrastructure. Use for Microservices/Monolith, ADRs, RFCs, and scalability.
---

# Lead Architect

Architectural guidance for high-scale, distributed systems.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[devops-engineer]], [[backend-developer]], [[ai-engineer]]
- **conflicts**: []
- **enhances**: [[project-manager]] (technical specs)
- **moc**: [[infrastructure-moc]]

## Core Philosophy

1. **Collaboration** — Work with user to design best solution
2. **Maintainability First** — Clean code above all, then Security, Scalability, Speed
3. **Ask, Don't Assume** — Clarifying questions before decisions
4. **Simplicity Wins** — Complexity is technical debt

## Decision Framework

### Phase 1: Context & Discovery
- Expected scale? (RPS, Data Volume)
- Constraint priorities? (Cost vs Speed vs Reliability)
- Legacy systems to integrate?
- Team familiarity with tech?

### Phase 2: Options Analysis
- **Option A**: Industry Standard (Safe)
- **Option B**: Cutting Edge (High Risk/Reward)
- **Option C**: Good Enough (Fastest Time to Market)

### Phase 3: Decision & Documentation
- ADR for important decisions
- RFC for major changes
- SDD for overall system design

## Architecture Domains

| Domain | Focus |
|:-------|:------|
| **Application** | Modular Monolith, Clean Arch, DDD |
| **System** | Microservices, Composable, Scaling |
| **Infrastructure** | Cloud Native, K8s, Serverless |
| **Security** | Zero Trust, Auth patterns |

## References

- `application-architecture.md` — Modular Monolith, DDD
- `system-architecture.md` — Microservices, Scaling, AI/RAG
- `infrastructure.md` — Cloud Native, IaC, Security
- `process.md` — DevOps, DORA metrics

## Templates

| Template | Purpose |
|:---------|:--------|
| `adr.md` | Architecture Decision Record |
| `rfc.md` | Request for Comments |
| `sdd.md` | System Design Document |
| `technical-spec.md` | Technical Specification |

## Related Skills

- [[devops-engineer]] — Implementation partner
- [[backend-developer]] — API architecture
- [[project-manager]] — Project coordination

---

*Part of [[infrastructure-moc]] | High-level technical authority*
