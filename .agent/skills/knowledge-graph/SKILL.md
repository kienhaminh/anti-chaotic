---
name: knowledge-graph
type: skill
domain: general
status: stable
version: "2.0.0"
estimated_tokens: 8000
description: Parse, resolve, and navigate skill knowledge graphs. Use when building graph index, resolving dependencies, detecting cycles, or traversing skill relationships.
license: MIT
allowed-tools: Read Edit Bash(node:*) Bash(python3:*)
---

# Knowledge Graph

Core skill for graph-based skill management and dependency resolution.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: []
- **conflicts**: []
- **enhances**: []
- **moc**: []

## When to Use

Parse SKILL.md v2 files, build dependency graphs, and resolve skill relationships with cycle detection and path finding.

## When to Use

- Building `graph-index.json` from SKILL.md files
- Resolving skill dependencies before installation
- Detecting circular dependencies
- Finding shortest path between skills
- Validating skill graph integrity

## Core Concepts

### Relationship Types

| Type | Direction | CLI Behavior |
|------|-----------|--------------|
| `extends` | A ← B | Auto-load parent when loading child |
| `requires` | A ← B | Hard dependency (auto-install) |
| `suggests` | A ↔ B | Soft dependency (prompt user) |
| `conflicts` | A ⊘ B | Error if both selected |
| `enhances` | A → B | Suggest when base loaded |
| `moc` | A → MOC | Used for domain discovery |

### Graph Structure

```
[[react-nextjs]]
    │ extends
    ▼
[[frontend-developer]]
    │ requires
    ▼
[[typescript]]
```

## Workflow: Build Graph Index

### Step 1: Parse All SKILL.md Files

```javascript
// For each skill directory
const skills = await parseSkillDirectory('.agent/skills/');
// Returns: Array of parsed skill objects
```

### Step 2: Extract Wiki Links

Parse `[[skill-name]]` syntax from:
- `## Knowledge Graph` section
- `## Related Skills` section  
- Throughout content

### Step 3: Build Adjacency List

```javascript
const graph = {
  nodes: {
    "react-nextjs": {
      type: "skill",
      edges: {
        extends: ["frontend-developer"],
        requires: ["typescript"],
        suggests: ["threejs"],
        conflicts: ["vue-developer"]
      }
    }
  }
};
```

### Step 4: Detect Cycles

```javascript
// Must be DAG (Directed Acyclic Graph)
const cycles = detectCycles(graph);
if (cycles.length > 0) {
  throw new Error(`Circular dependency: ${cycles[0].join(' → ')}`);
}
```

### Step 5: Write graph-index.json

Output to `.agent/graph-index.json`

## Workflow: Resolve Skill

### Step 1: Collect Dependencies

```javascript
const resolution = await resolveSkill("react-nextjs", {
  depth: Infinity,
  includeSuggests: false
});
```

### Step 2: Load Order (Topological Sort)

```
Load order:
1. [[typescript]] (leaf dependency)
2. [[frontend-developer]] (parent)
3. [[react-nextjs]] (requested)
```

### Step 3: Handle Conflicts

```javascript
if (resolution.conflicts.length > 0) {
  // Error: Cannot install react-nextjs with vue-developer
}
```

## Scripts

### build-graph.js

Build `graph-index.json` from all SKILL.md files:

```bash
node .agent/skills/knowledge-graph/scripts/build-graph.js
```

### resolve-skill.js

Test skill resolution:

```bash
node .agent/skills/knowledge-graph/scripts/resolve-skill.js react-nextjs
```

### validate-graph.js

Check for cycles and orphaned skills:

```bash
node .agent/skills/knowledge-graph/scripts/validate-graph.js
```

## API Reference

### parseSkillFile(filePath)

Parse single SKILL.md to skill object.

### buildGraph(skillsDir)

Build complete graph from skills directory.

### resolveSkill(skillName, options)

Resolve skill with all dependencies.

Options:
- `depth`: Max traversal depth (Infinity)
- `includeSuggests`: Include soft dependencies (false)
- `onConflict`: 'error' | 'warn' | 'skip'

### detectCycles(graph)

Return array of circular dependency paths.

### topologicalSort(graph)

Return skills in dependency order.

### findPath(from, to)

Find shortest path between two skills.

## Examples

### Example 1: Build Graph Index

User: "Rebuild the skill graph index"

```bash
node .agent/skills/knowledge-graph/scripts/build-graph.js
```

Output: Updated `.agent/graph-index.json`

### Example 2: Resolve Before Install

User: "What gets installed with react-nextjs?"

```bash
node .agent/skills/knowledge-graph/scripts/resolve-skill.js react-nextjs
```

Output:
```
Resolution for [[react-nextjs]]:
  Requires: [[typescript]]
  Extends: [[frontend-developer]]
  Load order:
    1. typescript
    2. frontend-developer
    3. react-nextjs
```

### Example 3: Check Conflicts

User: "Can I use react-nextjs and vue together?"

```bash
node .agent/skills/knowledge-graph/scripts/check-conflicts.js react-nextjs vue-developer
```

Output:
```
❌ Conflict detected:
  [[react-nextjs]] conflicts with [[vue-developer]]
  Choose one: React OR Vue
```

## Related Skills

- [[project-manager]] — Skill creation and maintenance
- [[frontend-developer]] — Example skill with graph relationships

## References

- `references/graph-schema.json` — JSON Schema for graph-index.json
- `references/resolver-api.md` — Full API documentation

---

*Core skill for graph-based skill management*
