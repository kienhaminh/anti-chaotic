# User Story Template (Agile/Scrum)

## Core Story

**Title**: [User Role] - [Feature Key Name]

> **As a** [Role]
> **I want** [Feature/Action]
> **So that** [Benefit/Value]

## Acceptance Criteria (Gherkin)

```gherkin
Scenario: [Happy Path Title]
Given [Precondition]
When [Action]
Then [Expected Result]

Scenario: [Negative Path Title]
Given [Precondition]
When [Action on Edge Case]
Then [Error Message/Fallback state]
```

## Developer Notes

- **API Dependency**: [Link to API Endpoint if known]
- **UI Component**: [Component Name/Design Link]
- **State Impact**: [Which Redux/Context slice is affected]

## Definition of Done (DoD)

- [ ] Component implemented
- [ ] Unit tests passed
- [ ] Visual regression tested
- [ ] Accessibility (ARIA) checked
