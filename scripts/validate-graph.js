#!/usr/bin/env node
/**
 * Validate graph integrity
 * Usage: node validate-graph.js [--fix]
 */

const fsp = require('fs').promises;
const path = require('path');

// fs-extra compatibility helpers
const fs = {
  readFile: (p, enc) => fsp.readFile(p, enc),
  writeFile: (p, data) => fsp.writeFile(p, data),
  pathExists: async (p) => {
    try {
      await fsp.access(p);
      return true;
    } catch {
      return false;
    }
  },
  readJson: async (p) => {
    const data = await fsp.readFile(p, 'utf-8');
    return JSON.parse(data);
  }
};

const GRAPH_PATH = path.join(__dirname, '..', '.agent', 'graph-index.json');

/**
 * Load graph
 */
async function loadGraph() {
  if (!await fs.pathExists(GRAPH_PATH)) {
    console.error('❌ graph-index.json not found. Run build-graph.js first.');
    process.exit(1);
  }
  return fs.readJson(GRAPH_PATH);
}

/**
 * Detect cycles using DFS
 */
function detectCycles(graph) {
  const cycles = [];
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = {};
  const parent = {};

  // Initialize
  for (const node of Object.keys(graph.nodes)) {
    color[node] = WHITE;
  }

  function dfs(node, path) {
    color[node] = GRAY;
    path.push(node);

    const edges = [
      ...(graph.nodes[node]?.edges?.requires || []),
      ...(graph.nodes[node]?.edges?.extends || [])
    ];

    for (const neighbor of edges) {
      if (!graph.nodes[neighbor]) continue; // Skip missing

      if (color[neighbor] === GRAY) {
        // Found cycle
        const cycleStart = path.indexOf(neighbor);
        const cycle = path.slice(cycleStart).concat([neighbor]);
        cycles.push(cycle);
      } else if (color[neighbor] === WHITE) {
        parent[neighbor] = node;
        dfs(neighbor, [...path]);
      }
    }

    color[node] = BLACK;
  }

  for (const node of Object.keys(graph.nodes)) {
    if (color[node] === WHITE) {
      dfs(node, []);
    }
  }

  return cycles;
}

/**
 * Find orphaned skills (no incoming edges)
 */
function findOrphaned(graph) {
  const incoming = new Set();
  
  for (const node of Object.values(graph.nodes)) {
    for (const edgeType of ['requires', 'extends', 'suggests', 'enhances']) {
      for (const target of (node.edges?.[edgeType] || [])) {
        if (graph.nodes[target]) {
          incoming.add(target);
        }
      }
    }
  }

  const allSkills = new Set(Object.keys(graph.nodes));
  const orphaned = [...allSkills].filter(s => !incoming.has(s) && s !== 'frontend-developer');
  
  return orphaned;
}

/**
 * Find broken links (references to non-existent skills)
 */
function findBrokenLinks(graph) {
  const broken = [];

  for (const [name, node] of Object.entries(graph.nodes)) {
    for (const edgeType of ['requires', 'extends', 'suggests', 'conflicts', 'enhances']) {
      for (const target of (node.edges?.[edgeType] || [])) {
        if (!graph.nodes[target] && !graph.mocs[target]) {
          broken.push({ from: name, to: target, type: edgeType });
        }
      }
    }
  }

  return broken;
}

/**
 * Check bidirectional conflicts
 */
function checkConflictSymmetry(graph) {
  const issues = [];

  for (const [name, node] of Object.entries(graph.nodes)) {
    for (const conflict of (node.edges?.conflicts || [])) {
      const other = graph.nodes[conflict];
      if (other && !other.edges?.conflicts?.includes(name)) {
        issues.push({ 
          skill: name, 
          conflictsWith: conflict,
          issue: 'Not bidirectional' 
        });
      }
    }
  }

  return issues;
}

/**
 * Main validation
 */
async function main() {
  const args = process.argv.slice(2);
  const fix = args.includes('--fix');

  console.log('🔍 Validating knowledge graph...\n');

  const graph = await loadGraph();
  let hasErrors = false;

  // 1. Check cycles
  console.log('1️⃣  Checking for cycles...');
  const cycles = detectCycles(graph);
  if (cycles.length > 0) {
    console.log(`   ❌ Found ${cycles.length} cycle(s):`);
    for (const cycle of cycles) {
      console.log(`      ${cycle.join(' → ')}`);
    }
    hasErrors = true;
  } else {
    console.log('   ✅ No cycles detected');
  }

  // 2. Check broken links
  console.log('\n2️⃣  Checking for broken links...');
  const broken = findBrokenLinks(graph);
  if (broken.length > 0) {
    console.log(`   ⚠️  Found ${broken.length} broken link(s):`);
    for (const link of broken.slice(0, 5)) {
      console.log(`      [[${link.from}]] --${link.type}--> [[${link.to}]] (not found)`);
    }
    if (broken.length > 5) {
      console.log(`      ... and ${broken.length - 5} more`);
    }
  } else {
    console.log('   ✅ All links valid');
  }

  // 3. Check conflict symmetry
  console.log('\n3️⃣  Checking conflict symmetry...');
  const asymConflicts = checkConflictSymmetry(graph);
  if (asymConflicts.length > 0) {
    console.log(`   ⚠️  Found ${asymConflicts.length} asymmetric conflict(s):`);
    for (const issue of asymConflicts) {
      console.log(`      [[${issue.skill}]] conflicts [[${issue.conflictsWith}]] but not vice versa`);
    }
  } else {
    console.log('   ✅ All conflicts bidirectional');
  }

  // 4. Check orphaned skills
  console.log('\n4️⃣  Checking for orphaned skills...');
  const orphaned = findOrphaned(graph);
  if (orphaned.length > 0) {
    console.log(`   ℹ️  ${orphaned.length} skill(s) with no incoming edges:`);
    console.log(`      ${orphaned.slice(0, 5).join(', ')}${orphaned.length > 5 ? '...' : ''}`);
  } else {
    console.log('   ✅ All skills connected');
  }

  // Summary
  console.log('\n' + '═'.repeat(50));
  if (hasErrors) {
    console.log('❌ Validation FAILED - Fix errors before committing');
    process.exit(1);
  } else {
    console.log('✅ Validation PASSED');
    console.log(`   Skills: ${Object.keys(graph.nodes).length}`);
    console.log(`   MOCs: ${Object.keys(graph.mocs).length}`);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
