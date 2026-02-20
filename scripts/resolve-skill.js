#!/usr/bin/env node
/**
 * Resolve skill with dependencies
 * Usage: node resolve-skill.js <skill-name> [--depth N] [--suggests]
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
 * Load graph index
 */
async function loadGraph() {
  if (!await fs.pathExists(GRAPH_PATH)) {
    console.error('❌ graph-index.json not found. Run build-graph.js first.');
    process.exit(1);
  }
  return fs.readJson(GRAPH_PATH);
}

/**
 * Resolve skill with dependencies
 */
function resolveSkill(graph, skillName, options = {}) {
  const { depth = Infinity, includeSuggests = false } = options;
  
  const visited = new Set();
  const loadOrder = [];
  const conflicts = [];
  const suggests = [];
  const notFound = [];

  function visit(name, currentDepth = 0) {
    if (currentDepth > depth) return;
    if (visited.has(name)) return;
    
    const node = graph.nodes[name];
    if (!node) {
      notFound.push(name);
      return;
    }

    // Check conflicts
    if (node.edges.conflicts) {
      for (const conflict of node.edges.conflicts) {
        if (visited.has(conflict)) {
          conflicts.push({ skill: name, conflictsWith: conflict });
        }
      }
    }

    // Visit requires first (hard dependencies)
    if (node.edges.requires) {
      for (const dep of node.edges.requires) {
        visit(dep, currentDepth + 1);
      }
    }

    // Visit extends (parent skills)
    if (node.edges.extends) {
      for (const parent of node.edges.extends) {
        visit(parent, currentDepth + 1);
      }
    }

    // Collect suggests
    if (includeSuggests && node.edges.suggests) {
      for (const sug of node.edges.suggests) {
        if (!visited.has(sug) && !suggests.includes(sug)) {
          suggests.push(sug);
        }
      }
    }

    visited.add(name);
    loadOrder.push(name);
  }

  visit(skillName);

  return {
    target: skillName,
    loadOrder,
    conflicts,
    suggests,
    notFound,
    totalTokens: loadOrder.reduce((sum, name) => {
      return sum + (graph.nodes[name]?.estimated_tokens || 0);
    }, 0)
  };
}

/**
 * Format output
 */
function formatOutput(result, graph) {
  console.log(`\n📦 Resolution for [[${result.target}]]\n`);
  console.log('═'.repeat(50));

  // Load order
  console.log('\n📝 Load Order:');
  result.loadOrder.forEach((name, i) => {
    const node = graph.nodes[name];
    const tokens = node?.estimated_tokens 
      ? ` (~${Math.round(node.estimated_tokens / 1000)}k tokens)` 
      : '';
    console.log(`  ${i + 1}. [[${name}]]${tokens}`);
  });

  // Stats
  console.log(`\n📊 Total: ${result.loadOrder.length} skills`);
  if (result.totalTokens > 0) {
    console.log(`🎯 Estimated: ~${Math.round(result.totalTokens / 1000)}k tokens`);
  }

  // Conflicts
  if (result.conflicts.length > 0) {
    console.log('\n⚠️  Conflicts Detected:');
    for (const c of result.conflicts) {
      console.log(`  ❌ [[${c.skill}]] conflicts with [[${c.conflictsWith}]]`);
    }
  }

  // Suggestions
  if (result.suggests.length > 0) {
    console.log('\n💡 Suggested (optional):');
    for (const sug of result.suggests) {
      const node = graph.nodes[sug];
      const desc = node ? ` - ${node.description || ''}` : '';
      console.log(`  ○ [[${sug}]]${desc}`);
    }
  }

  // Not found
  if (result.notFound.length > 0) {
    console.log('\n❓ Not Found:');
    for (const nf of result.notFound) {
      console.log(`  ⚠️  [[${nf}]]`);
    }
  }

  console.log('\n' + '═'.repeat(50));
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);
  const skillName = args[0];

  if (!skillName) {
    console.log('Usage: node resolve-skill.js <skill-name> [--depth N] [--suggests]');
    console.log('');
    console.log('Options:');
    console.log('  --depth N      Maximum traversal depth (default: Infinity)');
    console.log('  --suggests     Include suggested skills in output');
    process.exit(1);
  }

  const depth = args.includes('--depth') 
    ? parseInt(args[args.indexOf('--depth') + 1]) || Infinity
    : Infinity;
  
  const includeSuggests = args.includes('--suggests');

  const graph = await loadGraph();

  if (!graph.nodes[skillName]) {
    console.error(`❌ Skill "${skillName}" not found in graph.`);
    console.log('\nAvailable skills:');
    console.log('  ' + Object.keys(graph.nodes).slice(0, 10).join(', ') + '...');
    process.exit(1);
  }

  const result = resolveSkill(graph, skillName, { depth, includeSuggests });
  formatOutput(result, graph);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
