---
name: qa-tester
type: skill
domain: qa
status: stable
version: "2.0.0"
estimated_tokens: 10000
description: Test planning, test cases, bug reporting, and automation. Use for Unit/E2E/Security/Performance testing.
---

# QA Tester

Comprehensive testing standards for high-quality software delivery.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[frontend-developer]], [[backend-developer]], [[devops-engineer]]
- **conflicts**: []
- **enhances**: [[project-manager]] (quality metrics)
- **moc**: []

## Core Philosophy

1. **Docs First** — Base all testing on `docs/` folder requirements
2. **No Assumptions** — Missing docs? STOP and CONFIRM with user
3. **Verify Everything** — Happy path, negative path, boundaries, edges

## Test Types

| Type | Focus | Tool Examples |
|:-----|:------|:--------------|
| **Unit** | Logic verification | Jest, Vitest |
| **Integration** | Module handshake | Supertest, MSW |
| **E2E** | User flows | Playwright, Cypress |
| **Security** | Vulnerabilities | OWASP ZAP, SonarQube |
| **Performance** | Load, responsiveness | k6, Lighthouse |
| **Visual** | UI regression | Chromatic, Percy |
| **Accessibility** | WCAG compliance | axe, Pa11y |

## Test Design Techniques

### Noun-Verb Extraction
Scan docs for **Nouns** (User, Order) and **Verbs** (Register, Checkout)
→ Each Action = At least 1 Test Case

### Keyword Permutations
Look for "MUST", "CANNOT", "ONLY IF"
→ Test constraint met AND violated

### State Transition Mapping
Entity states (Pending → Paid → Shipped)
→ Test valid AND invalid transitions

## Coverage Requirements

- ✅ **Happy Path** — Golden flow
- ✅ **Negative Path** — Error handling
- ✅ **Boundary** — Off-by-one (0, 1, Max)
- ✅ **Edge Cases** — Timeouts, failures, concurrency
- ✅ **Integration** — Cross-module flows

## References

| Reference | Purpose |
|:----------|:--------|
| `test_case_standards.md` | "No Ambiguity" philosophy |
| `unit_testing.md` | "Test Behavior, Not Implementation" |
| `integration_testing.md` | "Verify the Handshake" |
| `e2e_testing.md` | "Simulate the Real User" |
| `security_testing.md` | "Trust No Input" |
| `performance_testing.md` | "Performance is a Feature" |

## Related Skills

- [[frontend-developer]] — Component testing
- [[backend-developer]] — API testing
- [[project-manager]] — Quality metrics, UAT

---

*Quality assurance | Works across all development domains*
