# Document Templates - Full Collection

## 1. Project Brief Template

```markdown
# [Project Name] - Project Brief

## Executive Summary

[2-3 sentences describing the project and its value]

## Problem Statement

### Current Situation

[Describe current state and pain points]

### Desired Outcome

[What success looks like]

## Scope

### In Scope

- Item 1
- Item 2

### Out of Scope

- Item 1
- Item 2

## Stakeholders

| Role          | Name | Interest Level | Influence |
| ------------- | ---- | -------------- | --------- |
| Sponsor       |      | High           | High      |
| Product Owner |      | High           | High      |
| End Users     |      | High           | Low       |

## Timeline

| Phase       | Duration | Deliverables |
| ----------- | -------- | ------------ |
| Discovery   | X weeks  | Requirements |
| Development | X weeks  | MVP          |
| Testing     | X weeks  | QA Report    |
| Launch      | X weeks  | Production   |

## Budget

- Development: $X
- Infrastructure: $X/month
- Third-party services: $X/month

## Success Criteria

1. Criterion 1 - measurable
2. Criterion 2 - measurable

## Risks

| Risk | Probability | Impact | Mitigation |
| ---- | ----------- | ------ | ---------- |
|      |             |        |            |
```

---

## 2. Business Requirements Document (BRD) Template

```markdown
# [Project Name] - Business Requirements Document

**Version**: 1.0
**Status**: Draft | Review | Approved
**Last Updated**: YYYY-MM-DD
**Author**: [Name]

---

## 1. Executive Summary

[Brief overview of business need and proposed solution]

## 2. Business Objectives

| ID   | Objective | Success Metric |
| ---- | --------- | -------------- |
| BO-1 |           |                |
| BO-2 |           |                |

## 3. Current State Analysis

### 3.1 Current Process

[Describe existing process or system]

### 3.2 Pain Points

- Pain point 1
- Pain point 2

### 3.3 Gap Analysis

| Current State | Desired State | Gap |
| ------------- | ------------- | --- |
|               |               |     |

## 4. Stakeholder Analysis

| Stakeholder | Role | Needs | Priority |
| ----------- | ---- | ----- | -------- |
|             |      |       |          |

## 5. Business Requirements

### BR-001: [Requirement Title]

- **Description**: [What is needed]
- **Business Value**: [Why it matters]
- **Priority**: Must Have | Should Have | Nice to Have
- **Source**: [Stakeholder/Document]
- **Acceptance Criteria**:
  - [ ] Criteria 1
  - [ ] Criteria 2

### BR-002: [Requirement Title]

[Repeat structure]

## 6. Constraints and Assumptions

### Constraints

- Budget: $X
- Timeline: X months
- Technology: [limitations]

### Assumptions

- Assumption 1
- Assumption 2

## 7. Dependencies

| Dependency | Type              | Owner | Status |
| ---------- | ----------------- | ----- | ------ |
|            | Internal/External |       |        |

## 8. Glossary

| Term | Definition |
| ---- | ---------- |
|      |            |
```

---

## 3. Product Requirements Document (PRD) Template

```markdown
# [Product Name] - Product Requirements Document

**Version**: 1.0
**Status**: Draft | Review | Approved
**Product Owner**: [Name]
**Last Updated**: YYYY-MM-DD

---

## 1. Product Overview

### 1.1 Vision

[One-sentence product vision]

### 1.2 Problem Statement

[Problem being solved]

### 1.3 Target Users

| Persona | Description | Primary Need |
| ------- | ----------- | ------------ |
|         |             |              |

## 2. Goals and Success Metrics

| Goal | Metric | Target | Timeline |
| ---- | ------ | ------ | -------- |
|      |        |        |          |

## 3. Features

### 3.1 Feature: [Feature Name]

**Priority**: P0 (Must Have) | P1 (Should Have) | P2 (Nice to Have)
**Epic**: [Link to epic]

#### Description

[What this feature does]

#### User Stories

- As a [role], I want [goal] so that [benefit]

#### Acceptance Criteria

- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

#### UI/UX Requirements

[Wireframes, mockups, or descriptions]

#### Technical Notes

[Any technical considerations]

### 3.2 Feature: [Feature Name]

[Repeat structure]

## 4. User Flows

### Flow 1: [Flow Name]

1. User does X
2. System responds with Y
3. User does Z

## 5. Non-Functional Requirements

| Category     | Requirement      | Target    |
| ------------ | ---------------- | --------- |
| Performance  | Page load time   | < 2s      |
| Scalability  | Concurrent users | 10,000    |
| Security     | Authentication   | OAuth 2.0 |
| Availability | Uptime           | 99.9%     |

## 6. Release Plan

| Phase | Features     | Target Date |
| ----- | ------------ | ----------- |
| MVP   | Feature 1, 2 |             |
| v1.1  | Feature 3, 4 |             |

## 7. Open Questions

| Question | Owner | Due Date | Resolution |
| -------- | ----- | -------- | ---------- |
|          |       |          |            |
```

---

## 4. User Stories Template

```markdown
# [Epic Name] - User Stories

**Epic ID**: EPIC-XXX
**Epic Owner**: [Name]
**Sprint**: [Sprint number or Backlog]

---

## Epic Summary

[Brief description of the epic]

## User Stories

### US-001: [Story Title]

**Priority**: High | Medium | Low
**Story Points**: X
**Status**: To Do | In Progress | Done

**User Story**:

> As a **[type of user]**,
> I want **[goal/desire]**,
> So that **[benefit/value]**.

**Acceptance Criteria**:

- [ ] **Given** [precondition], **when** [action], **then** [expected result]
- [ ] **Given** [precondition], **when** [action], **then** [expected result]
- [ ] **Given** [precondition], **when** [action], **then** [expected result]

**Technical Notes**:

- Note 1
- Note 2

**Dependencies**:

- US-XXX: [Story title]

**Mockups/Wireframes**:
[Link or embed]

---

### US-002: [Story Title]

[Repeat structure]

---

## Definition of Done

- [ ] Code complete and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Acceptance criteria verified
- [ ] Product Owner approved
```

---

## 5. Technical Specification Template

````markdown
# [Feature/System] - Technical Specification

**Version**: 1.0
**Author**: [Name]
**Reviewers**: [Names]
**Status**: Draft | Review | Approved

---

## 1. Overview

### 1.1 Purpose

[What this spec covers]

### 1.2 Background

[Context and motivation]

### 1.3 Goals

- Goal 1
- Goal 2

### 1.4 Non-Goals

- Non-goal 1

## 2. Architecture

### 2.1 System Overview

[High-level architecture diagram]

### 2.2 Components

| Component | Responsibility |
| --------- | -------------- |
|           |                |

### 2.3 Data Flow

[Data flow diagram or description]

## 3. Detailed Design

### 3.1 API Design

#### Endpoint: [Method] /api/path

**Description**: [What it does]

**Request**:

```json
{
  "field": "type"
}
```
````

**Response**:

```json
{
  "field": "type"
}
```

**Error Codes**:
| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | |
| 404 | Not Found | |

### 3.2 Database Schema

```sql
CREATE TABLE table_name (
  id UUID PRIMARY KEY,
  field_name TYPE CONSTRAINTS
);
```

### 3.3 Business Logic

[Key algorithms or rules]

## 4. Security Considerations

- Authentication method
- Authorization rules
- Data encryption
- Input validation

## 5. Performance Considerations

- Expected load
- Caching strategy
- Database indexing

## 6. Testing Strategy

- Unit tests: [Approach]
- Integration tests: [Approach]
- E2E tests: [Approach]

## 7. Deployment Plan

- Environment requirements
- Migration steps
- Rollback plan

## 8. Open Questions

| Question | Status |
| -------- | ------ |
|          |        |

````

---

## 6. Architecture Decision Record (ADR) Template

```markdown
# ADR-XXX: [Decision Title]

**Status**: Proposed | Accepted | Deprecated | Superseded
**Date**: YYYY-MM-DD
**Decision Makers**: [Names]

## Context
[What is the situation that is driving this decision?]

## Decision Drivers
- Driver 1
- Driver 2

## Options Considered

### Option 1: [Name]
**Pros**:
- Pro 1
- Pro 2

**Cons**:
- Con 1
- Con 2

### Option 2: [Name]
**Pros**:
- Pro 1

**Cons**:
- Con 1

## Decision
[Which option was chosen and why]

## Consequences
### Positive
- Consequence 1

### Negative
- Consequence 2

### Neutral
- Consequence 3

## Related Decisions
- ADR-XXX: [Title]
````
