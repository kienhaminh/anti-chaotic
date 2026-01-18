# Deep Task Decomposition Guide

This guide provides a comprehensive methodology for breaking down documentation into maximum granular, actionable tasks.

## Core Philosophy

> **"A task that takes more than 4 hours is not a task—it's a mini-project hiding complexity."**

The goal is to decompose until:

1. Each task is **independently testable**
2. Each task is **estimable** (ideally 1-4 hours)
3. Each task has **clear Definition of Done**
4. Each task can be **assigned to one person**

## Decomposition Levels

### Level 1: Epic (Feature/Module)

- **Size**: Days to weeks
- **Source**: PRD sections, major features
- **Example**: "User Authentication System"

### Level 2: Story (User-Facing Capability)

- **Size**: 1-3 days
- **Source**: Use cases, user flows
- **Format**: "As a [role], I want [action], so that [value]"
- **Example**: "As a user, I want to reset my password, so that I can regain access"

### Level 3: Task (Technical Work Unit)

- **Size**: 2-8 hours
- **Source**: Story breakdown by layer/component
- **Example**: "Implement forgot password API endpoint"

### Level 4: Sub-Task (Atomic Action)

- **Size**: 30min - 2 hours
- **Source**: Implementation steps
- **Example**: "Add email validation regex", "Write unit test for token expiry"

## Decomposition Algorithm

### Step 1: Document Analysis

Extract from document:

1. **Nouns** → Entities/Objects (User, Order, Product)
2. **Verbs** → Actions/Operations (Create, Update, Delete, View)
3. **Adjectives** → Constraints/Rules (valid, unique, max 10)
4. **Flows** → Sequences (Step 1 → Step 2 → Step 3)

### Step 2: Entity-Action Matrix

Create a matrix:

| Entity | Create | Read | Update | Delete | Special Actions       |
| ------ | ------ | ---- | ------ | ------ | --------------------- |
| User   | ✓      | ✓    | ✓      | ✓      | Login, Logout, Verify |
| Order  | ✓      | ✓    | ✓      | -      | Cancel, Refund        |

Each ✓ = At least 1 Story

### Step 3: Vertical Slice Decomposition

For each Story, break into **vertical slices** (not horizontal layers):

**❌ Bad (Horizontal)**:

- Build all APIs
- Build all UI screens
- Write all tests

**✅ Good (Vertical)**:

- User can view product list (API + UI + Test)
- User can view product detail (API + UI + Test)
- User can add to cart (API + UI + Test)

### Step 4: Task Breakdown Template

For each Story, create tasks using this structure:

```markdown
## Story: [Story Title]

### Database/Schema

- [ ] Create migration for [table]
- [ ] Add index for [column]
- [ ] Seed test data

### Backend/API

- [ ] Define request/response types
- [ ] Implement [endpoint] handler
- [ ] Add input validation
- [ ] Add authorization check
- [ ] Write unit tests
- [ ] Write integration tests

### Frontend/UI

- [ ] Create [component] component
- [ ] Implement state management
- [ ] Connect to API
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Handle empty state
- [ ] Add form validation (if applicable)
- [ ] Write component tests

### Cross-Cutting

- [ ] Add logging
- [ ] Add error tracking
- [ ] Update API documentation
- [ ] Update user documentation (if needed)
```

### Step 5: Edge Case Extraction

For each flow, identify:

- **Happy Path**: Normal successful flow
- **Validation Errors**: Invalid inputs
- **Business Rule Violations**: Constraint failures
- **System Errors**: Network, timeout, service unavailable
- **Concurrency**: Race conditions, optimistic locking
- **Authorization**: Permission denied scenarios

Each edge case may generate additional tasks.

## Output Format

### Task Card Template

```markdown
## [TASK-ID]: [Task Title]

**Story**: [Parent Story ID]
**Type**: Backend | Frontend | Database | DevOps | Documentation
**Priority**: P0 | P1 | P2
**Estimate**: [X hours]

### Description

[Brief description of what needs to be done]

### Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

### Technical Notes

- [Any implementation hints or constraints]

### Dependencies

- Blocked by: [TASK-ID] (if any)
- Blocks: [TASK-ID] (if any)

### Definition of Done

- [ ] Code complete
- [ ] Tests written and passing
- [ ] Code reviewed
- [ ] Documentation updated
```

## Decomposition Triggers

Use this capability when user says:

- "Break down this PRD..."
- "Decompose this feature..."
- "Create tasks from this document..."
- "Split this into smaller tasks..."
- "What tasks do we need for..."

## Quality Checklist

Before finalizing decomposition:

- [ ] **No task > 8 hours** - If larger, break it down further
- [ ] **Each task is testable** - Has clear pass/fail criteria
- [ ] **Dependencies are explicit** - Blocked/blocks relationships
- [ ] **No hidden complexity** - Edge cases extracted as tasks
- [ ] **Estimates are realistic** - Include testing time
- [ ] **Vertical slices preferred** - End-to-end functionality
- [ ] **Documentation tasks included** - API docs, user docs
- [ ] **Test tasks explicit** - Not "included" in dev tasks
