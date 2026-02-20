const fs = require("fs-extra");
const path = require("path");

const REPO_URI = "kienhaminh/anti-chaotic/.agent";

/**
 * Load graph index from local .agent directory
 */
async function loadGraph(projectRoot) {
  const graphPath = path.join(projectRoot, ".agent", "graph-index.json");
  if (!(await fs.pathExists(graphPath))) {
    return null;
  }
  return fs.readJson(graphPath);
}

/**
 * Load manifest from local .agent directory
 */
async function loadManifest(projectRoot) {
  const manifestPath = path.join(projectRoot, ".agent", "skills-manifest.json");
  if (!(await fs.pathExists(manifestPath))) {
    return null;
  }
  return fs.readJson(manifestPath);
}

/**
 * Resolve skill with transitive dependencies using graph
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
    if (node.edges?.conflicts) {
      for (const conflict of node.edges.conflicts) {
        if (visited.has(conflict)) {
          conflicts.push({ skill: name, conflictsWith: conflict });
        }
      }
    }

    // Visit requires first (hard dependencies)
    if (node.edges?.requires) {
      for (const dep of node.edges.requires) {
        if (dep) visit(dep, currentDepth + 1);
      }
    }

    // Visit extends (parent skills)
    if (node.edges?.extends) {
      for (const parent of node.edges.extends) {
        if (parent) visit(parent, currentDepth + 1);
      }
    }

    // Collect suggestions
    if (includeSuggests && node.edges?.suggests) {
      for (const sug of node.edges.suggests) {
        if (sug && !visited.has(sug) && !suggests.includes(sug) && sug !== skillName) {
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
 * Calculate total context size for a set of skills
 */
function calculateContextSize(graph, skillNames) {
  const allSkills = new Set();
  
  for (const name of skillNames) {
    const resolution = resolveSkill(graph, name);
    for (const skill of resolution.loadOrder) {
      allSkills.add(skill);
    }
  }
  
  return {
    skillCount: allSkills.size,
    totalTokens: [...allSkills].reduce((sum, name) => {
      return sum + (graph.nodes[name]?.estimated_tokens || 0);
    }, 0),
    skills: [...allSkills]
  };
}

/**
 * Find skills that extend a base skill
 */
function findSpecializations(graph, baseSkill) {
  const specs = [];
  for (const [name, node] of Object.entries(graph.nodes)) {
    if (node.edges?.extends?.includes(baseSkill)) {
      specs.push(name);
    }
  }
  return specs;
}

module.exports = {
  REPO_URI,
  loadGraph,
  loadManifest,
  resolveSkill,
  calculateContextSize,
  findSpecializations
};
