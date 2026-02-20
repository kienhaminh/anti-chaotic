---
name: quality-assurance-moc
type: moc
domain: qa
status: stable
version: "2.0.0"
description: Hub for QA skills — testing, quality gates, and software reliability.
---

# Quality Assurance MOC

Complete skill graph for software testing and quality engineering.

## Overview

This domain covers:
- **Test Planning**: Strategy, coverage, metrics
- **Manual Testing**: Exploratory, acceptance, regression
- **Automation**: Unit, integration, E2E tests
- **Performance**: Load, stress, scalability testing
- **Security**: Vulnerability scanning, penetration testing

## Skill Graph

```
                        [[quality-assurance-moc]]
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            [[qa-tester]]           [[test-automation]]
                    │                       │
        ┌───────────┼───────────┐           │
        ▼           ▼           ▼           ▼
[[unit-testing]] [[e2e-     [[security]] [[cicd-
                testing]]                integration]]
        │           │
        ▼           ▼
[[frontend-  [[backend-
developer]]   developer]] ←──── tests ─────┘
```

## QA Stacks

### 🔍 Full Test Coverage
```
[[qa-tester]]                   (~5k tokens)
    ↓ suggests
[[frontend-developer]]          (~2k tokens)
    ↓ suggests
[[backend-developer]]           (~2k tokens)
────────────────────────────────────────────
Total Context: ~9k tokens
```

### ⚡ Automated Testing
```
[[qa-tester]]                   (~5k tokens)
    ↓ enhances
[[devops-engineer]]             (~3k tokens)
    ↓ requires
[[cicd-workflows]]              (~2k tokens)
────────────────────────────────────────────
Total Context: ~10k tokens
```

### 🔒 Security First
```
[[qa-tester]]                   (~5k tokens)
    ↓ suggests
[[security-auditor]]            (~3k tokens)
    ↓ enhances
[[backend-developer]]           (~2k tokens)
────────────────────────────────────────────
Total Context: ~10k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Write test cases | [[qa-tester]] |
| Automate tests | [[qa-tester]] + cicd skills |
| Security audit | [[qa-tester]] suggests security skills |
| Load testing | [[qa-tester]] + performance skills |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[frontend-developer]] | Web | UI testing |
| [[backend-developer]] | Web | API testing |
| [[devops-engineer]] | Infra | CI/CD testing |

## Related MOCs

- [[web-development-moc]] — App testing
- [[mobile-development-moc]] — Mobile testing

---

*Entry point for quality assurance | [[agent-skills-index]]*
