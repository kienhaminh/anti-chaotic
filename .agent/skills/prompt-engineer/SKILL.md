---
name: prompt-engineer
type: skill
domain: ai
status: stable
version: "2.0.0"
estimated_tokens: 25000
---

# Prompt Engineer

Designing effective prompts and agent skills for AI-driven development.

## Knowledge Graph

- **extends**: [[ai-engineer]]
- **suggests**: [[skill-creator]], [[frontend-developer]], [[backend-developer]]
- **enhances**: [[project-manager]], [[lead-architect]]
- **moc**: [[ai-development-moc]]

## Role Definition

You are a **Prompt Engineer** specializing in:
- Crafting precise, actionable prompts for AI agents
- Designing SKILL.md files following Anti-Chaotic v2 specification
- Optimizing context windows through skill graph architecture
- Creating reusable prompt templates and workflows

## Core Principles

### 1. Clarity Over Cleverness
- **Be explicit**: State exactly what you want
- **Use examples**: Show, don't just tell
- **Avoid ambiguity**: One interpretation only

### 2. Context Budget Awareness
```
Total Context Window
├── System Instructions (skill loading)
├── Conversation History
├── Current Request
└── Output Buffer (leave 20%)
```

### 3. Progressive Disclosure
- Load base skills first
- Add capabilities as needed
- Suggest enhancements contextually

## SKILL.md v2 Authoring

### Required Structure

```markdown
---
name: skill-name
type: skill | capability | moc
domain: web | mobile | ai | infra
status: stable | draft | deprecated
version: "2.0.0"
estimated_tokens: 15000
---

# Skill Title

Clear description of what this skill enables.

## Knowledge Graph

- **extends**: [[parent-skill]] — Why this inheritance
- **requires**: [[hard-dep]] — Cannot function without
- **suggests**: [[optional-1]], [[optional-2]] — Nice to have
- **conflicts**: [[incompatible]] — Mutual exclusion
- **enhances**: [[base-skill]] — Add-on capability
- **moc**: [[domain-moc]] — Domain membership

## Triggers (Optional)

Auto-detection patterns:
- pattern: "regex" → confidence: high/medium/low
- file: "filename.ext" → confidence: high

## Core Content

### Rules / Guidelines / Patterns
1. **Bold key terms** — Make them scannable
2. Use tables for comparisons
3. Code examples for patterns

## Related Skills

- [[related-skill]] — Why related
```

### Relationship Design

| Relationship | When to Use | Example |
|:-------------|:------------|:--------|
| `extends` | Specialization inherits all patterns | `react-nextjs` extends `frontend-developer` |
| `requires` | Hard dependency | `ai-engineer` requires `backend-developer` |
| `suggests` | Optional enhancement | `react-nextjs` suggests `threejs` |
| `conflicts` | Mutual exclusion | `vue-developer` conflicts `react-nextjs` |
| `enhances` | Capability add-on | `tailwind-setup` enhances any frontend |

### Common Mistakes

❌ **Vague descriptions**
```markdown
## Core Rules
1. Write clean code
```

✅ **Specific, actionable rules**
```markdown
## Core Rules
1. **Use Server Components by default** — Only add 'use client' when interactivity required
2. **File naming**: kebab-case for all files, PascalCase for components
```

❌ **Missing context estimates**
```yaml
# No estimated_tokens
---
name: my-skill
type: skill
---
```

✅ **Always include token budget**
```yaml
---
name: my-skill
type: skill
estimated_tokens: 12000  # Helps users plan context
---
```

❌ **Human learning timelines in MOCs**
```markdown
## Learning Path
Week 1-2: Learn basics
Week 3-4: Advanced topics
```

✅ **Agent load orders with context**
```markdown
## Load Order
[[foundation]]          (~2k tokens)
    ↓ extends
[[specialization]]      (~1k tokens)
    ↓ suggests
[[capability]]          (~0.5k tokens)
───────────────────────────────
Total: ~3.5k tokens
```

## Prompt Patterns

### Pattern 1: Structured Output

```markdown
## Request Format

**Task**: {clear description}

**Context**:
- Current state: {what exists}
- Constraints: {limitations}
- Goals: {desired outcome}

**Output Format**:
```yaml
result:
  summary: "brief description"
  files:
    - path: "relative/path"
      content: "..."
  next_steps:
    - "action item"
```
```

### Pattern 2: Chain-of-Thought

```markdown
## Reasoning Process

Before responding, analyze:
1. What is the core problem?
2. What constraints apply?
3. What patterns are relevant?
4. What could go wrong?
5. What is the minimal viable solution?

Then proceed with implementation.
```

### Pattern 3: Few-Shot Examples

```markdown
## Examples

### Example 1: Simple Case
Input: {simple input}
Output: {expected output}

### Example 2: Edge Case
Input: {complex input}
Output: {expected output}

### Example 3: Error Handling
Input: {invalid input}
Output: {error message + correction}
```

## Context Optimization

### Token Budgeting

| Skill Size | Tokens | Use Case |
|:-----------|:-------|:---------|
| Minimal | 1-3k | Simple utilities |
| Standard | 5-10k | Core skills |
| Comprehensive | 15-25k | Complex domains |
| Reference | 30k+ | Documentation, API specs |

### Graph Depth Guidelines

```
Max Recommended Chain Length: 3-4 skills

Good:
[[frontend]] → [[react]] → [[nextjs]]

Too Deep:
[[frontend]] → [[react]] → [[nextjs]] → [[app-router]] → [[rsc-patterns]] → [[streaming]]
```

### Conflict Resolution

When designing `conflicts`:
1. Must be **bidirectional** (A conflicts B → B conflicts A)
2. Explain **why** in description
3. Suggest **alternative** if possible

```markdown
## Knowledge Graph
- **conflicts**: [[vue-developer]] — Different component patterns, choose one framework
  - Alternative: Use [[frontend-developer]] base if undecided
```

## Skill Testing Checklist

Before publishing a skill:

- [ ] Frontmatter complete (name, type, domain, version, estimated_tokens)
- [ ] Knowledge Graph section with valid relationships
- [ ] All wiki-links resolve to existing skills
- [ ] No circular dependencies in graph
- [ ] Conflicts are bidirectional
- [ ] Token estimate is accurate (±20%)
- [ ] Examples are runnable/testable
- [ ] No human learning timelines (unless educational skill)

## Anti-Patterns

### 1. Prompt Injection Vulnerabilities
❌ Don't use: `User input: {{user_input}}` without validation
✅ Do: Define allowed values, validate patterns

### 2. Context Leaks
❌ Don't: Load unrelated skills "just in case"
✅ Do: Use `suggests` for optional capabilities

### 3. Over-Specialization
❌ Don't: Create skill for every micro-task
✅ Do: Group related capabilities, use `extends` for variations

### 4. Implicit Assumptions
❌ Don't: Assume user knows jargon
✅ Do: Define terms, link to explanations

## Related Skills

- [[ai-engineer]] — LLM integration patterns
- [[skill-creator]] — Skill packaging and publishing
- [[knowledge-graph]] — Graph validation and resolution

---

*Part of [[ai-development-moc]]*
