# Graph Resolver API Reference

Complete API documentation for knowledge graph resolution.

## Core Functions

### parseSkillFile(filePath)

Parse a SKILL.md file into a structured object.

**Parameters:**
- `filePath` (string): Absolute path to SKILL.md

**Returns:** `SkillNode | null`

```javascript
const skill = await parseSkillFile('/path/to/SKILL.md');
// {
//   name: 'react-nextjs',
//   type: 'skill',
//   domain: 'web',
//   edges: { extends: ['frontend-developer'], requires: ['typescript'] }
// }
```

### buildGraph(skillsDir)

Build complete graph from skills directory.

**Parameters:**
- `skillsDir` (string): Path to .agent/skills/

**Returns:** `Graph`

```javascript
const graph = await buildGraph('.agent/skills/');
```

### resolveSkill(graph, skillName, options)

Resolve skill with all dependencies.

**Parameters:**
- `graph` (Graph): The knowledge graph
- `skillName` (string): Skill to resolve
- `options` (Object):
  - `depth` (number): Max traversal depth (default: Infinity)
  - `includeSuggests` (boolean): Include soft deps (default: false)
  - `onConflict` (string): 'error' | 'warn' | 'skip'

**Returns:** `ResolutionResult`

```javascript
const result = resolveSkill(graph, 'react-nextjs', {
  depth: Infinity,
  includeSuggests: true
});
// {
//   target: 'react-nextjs',
//   loadOrder: ['typescript', 'frontend-developer', 'react-nextjs'],
//   conflicts: [],
//   suggests: ['threejs'],
//   totalTokens: 25000
// }
```

### detectCycles(graph)

Detect circular dependencies in graph.

**Returns:** `string[][]` - Array of cycles (each cycle is array of skill names)

```javascript
const cycles = detectCycles(graph);
if (cycles.length > 0) {
  console.log('Cycles:', cycles.map(c => c.join(' → ')));
}
```

### topologicalSort(graph)

Return skills in dependency order (dependencies first).

**Returns:** `string[]` - Ordered skill names

### findPath(graph, from, to)

Find shortest path between two skills.

**Parameters:**
- `from` (string): Starting skill
- `to` (string): Target skill

**Returns:** `string[] | null` - Path or null if not connected

```javascript
const path = findPath(graph, 'frontend-developer', 'react-nextjs');
// ['frontend-developer', 'react-nextjs']
```

## Data Types

### SkillNode

```typescript
interface SkillNode {
  name: string;
  type: 'skill' | 'capability' | 'moc';
  domain: string;
  status: 'stable' | 'draft' | 'deprecated';
  version: string;
  estimated_tokens: number;
  path: string;  // Relative to .agent/
  edges: {
    extends?: string[];    // Inheritance
    requires?: string[];   // Hard dependencies
    suggests?: string[];   // Soft dependencies
    conflicts?: string[];  // Mutual exclusion
    enhances?: string[];   // Capability adds
    moc?: string[];        // Domain membership
  };
}
```

### Graph

```typescript
interface Graph {
  version: string;
  generated_at: string;
  schema: 'knowledge-graph';
  nodes: { [name: string]: SkillNode };
  mocs: { [name: string]: MocNode };
  conflict_matrix: { [skill: string]: string[] };
  learning_paths?: { [name: string]: string[] };
}
```

## Resolution Algorithm

```
resolve(skill):
  visited = {}
  order = []
  
  visit(name, depth):
    if depth > maxDepth: return
    if name in visited: return
    
    node = graph.nodes[name]
    if not node: add to notFound; return
    
    // Check conflicts
    for conflict in node.edges.conflicts:
      if conflict in visited:
        add to conflicts
    
    // Visit dependencies first
    for dep in node.edges.requires:
      visit(dep, depth + 1)
    
    for parent in node.edges.extends:
      visit(parent, depth + 1)
    
    // Collect suggestions
    if includeSuggests:
      for sug in node.edges.suggests:
        if sug not in visited:
          add to suggests
    
    visited.add(name)
    order.push(name)
  
  visit(skill, 0)
  return { loadOrder: order, conflicts, suggests, notFound }
```

## CLI Commands

### build-graph.js

```bash
node scripts/build-graph.js [--output path]
```

Builds graph-index.json from all SKILL.md files.

### resolve-skill.js

```bash
node scripts/resolve-skill.js <skill-name> [--depth N] [--suggests]
```

Shows what would be loaded for a given skill.

### validate-graph.js

```bash
node scripts/validate-graph.js [--fix]
```

Checks for cycles, broken links, and orphaned skills.

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| CircularDependency | extends/requires forms cycle | Break cycle in SKILL.md |
| SkillNotFound | Wiki link to non-existent skill | Create skill or fix link |
| ConflictDetected | Both conflicting skills selected | Choose one, uninstall other |
| InvalidFrontmatter | Missing required fields | Add name, type, etc. |

## Best Practices

1. **Always run validate before commit**
2. **Keep extends chain short** (max 3 levels)
3. **Use requires for hard deps**, suggests for optional
4. **Make conflicts bidirectional** (A conflicts B implies B conflicts A)
5. **Estimated tokens** helps with context budgeting
