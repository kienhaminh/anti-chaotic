#!/usr/bin/env node
/**
 * Build graph-index.json from all SKILL.md files
 * Usage: node build-graph.js [--output path]
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
  readdir: (p, opts) => fsp.readdir(p, opts),
  readJson: async (p) => {
    const data = await fsp.readFile(p, 'utf-8');
    return JSON.parse(data);
  },
  writeJson: async (p, data, opts) => {
    const json = opts?.spaces 
      ? JSON.stringify(data, null, opts.spaces) 
      : JSON.stringify(data);
    await fsp.writeFile(p, json);
  }
};

const AGENT_DIR = path.join(__dirname, '..', '.agent');  // Project .agent/
const SKILLS_DIR = path.join(AGENT_DIR, 'skills');
const MOCS_DIR = path.join(AGENT_DIR, 'mocs');
const OUTPUT_PATH = path.join(AGENT_DIR, 'graph-index.json');

/**
 * Parse wiki links [[skill-name]] from content
 */
function parseWikiLinks(content) {
  const links = [];
  const regex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1].trim());
  }
  return [...new Set(links)]; // Deduplicate
}

/**
 * Parse Knowledge Graph section
 */
function parseKnowledgeGraph(content) {
  const graph = {
    extends: [],
    requires: [],
    suggests: [],
    conflicts: [],
    enhances: [],
    moc: []
  };

  // Find Knowledge Graph section
  const kgMatch = content.match(/##\s*Knowledge\s*Graph[\s\S]*?(?=##\s|$)/i);
  if (!kgMatch) return graph;

  const kgSection = kgMatch[0];

  // Parse each relationship type
  const patterns = {
    extends: /\*\*extends\*\*:\s*\[\[([^\]]+)\]\]/gi,
    requires: /\*\*requires\*\*:\s*\[\[([^\]]+)\]\]/gi,
    suggests: /\*\*suggests\*\*:\s*\[\[([^\]]+)\]\]/gi,
    conflicts: /\*\*conflicts\*\*:\s*\[\[([^\]]+)\]\]/gi,
    enhances: /\*\*enhances\*\*:\s*\[\[([^\]]+)\]\]/gi,
    moc: /\*\*moc\*\*:\s*\[\[([^\]]+)\]\]/gi
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    let match;
    while ((match = pattern.exec(kgSection)) !== null) {
      const skills = match[1].split(',').map(s => s.trim().replace(/\[\[|\]\]/g, ''));
      graph[type].push(...skills);
    }
  }

  // Deduplicate
  for (const key of Object.keys(graph)) {
    graph[key] = [...new Set(graph[key])];
  }

  return graph;
}

/**
 * Simple YAML parser for frontmatter (handles basic key: value pairs)
 */
function parseFrontmatter(yamlContent) {
  const result = {};
  const lines = yamlContent.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^([\w-]+):\s*(.+)?$/);
    if (match) {
      const key = match[1];
      let value = match[2] ? match[2].trim() : '';
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Convert types
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (/^\d+$/.test(value)) value = parseInt(value);
      
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Recursively find all SKILL.md files
 */
async function findSkillFiles(dir, results = []) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      await findSkillFiles(fullPath, results);
    } else if (item.name === 'SKILL.md') {
      results.push(fullPath);
    }
  }
  
  return results;
}

/**
 * Parse single SKILL.md file
 */
async function parseSkillFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.warn(`Warning: No frontmatter in ${filePath}`);
    return null;
  }

  let metadata;
  try {
    metadata = parseFrontmatter(frontmatterMatch[1]);
  } catch (e) {
    console.warn(`Warning: Invalid frontmatter in ${filePath}: ${e.message}`);
    return null;
  }

  if (!metadata.name) {
    console.warn(`Warning: No name in ${filePath}`);
    return null;
  }

  // Parse knowledge graph
  const graph = parseKnowledgeGraph(content);

  // Calculate estimated tokens (rough approximation)
  const estimatedTokens = Math.ceil(content.length / 4);

  // Get relative path from .agent/
  const relativePath = path.relative(
    path.join(__dirname, '..', '..'),
    filePath
  );

  return {
    name: metadata.name,
    type: metadata.type || 'skill',
    domain: metadata.domain || 'general',
    status: metadata.status || 'draft',
    version: metadata.version || '1.0.0',
    estimated_tokens: estimatedTokens,
    path: relativePath,
    edges: graph
  };
}

/**
 * Parse MOC files
 */
async function parseMocs() {
  const mocs = {};
  
  if (!await fs.pathExists(MOCS_DIR)) {
    return mocs;
  }

  const mocFiles = await fs.readdir(MOCS_DIR);
  const mdFiles = mocFiles.filter(f => f.endsWith('.md'));
  
  for (const file of mdFiles) {
    const filePath = path.join(MOCS_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;

    let metadata;
    try {
      metadata = parseFrontmatter(frontmatterMatch[1]);
    } catch (e) {
      continue;
    }

    if (!metadata.name) continue;

    // Extract all wiki links from content
    const allLinks = parseWikiLinks(content);
    
    mocs[metadata.name] = {
      path: `mocs/${file}`,
      domain: metadata.domain || 'general',
      skills: allLinks
    };
  }

  return mocs;
}

/**
 * Build conflict matrix from all conflicts
 */
function buildConflictMatrix(nodes) {
  const matrix = {};
  
  for (const [name, node] of Object.entries(nodes)) {
    if (node.edges.conflicts?.length > 0) {
      matrix[name] = node.edges.conflicts;
    }
  }

  return matrix;
}

/**
 * Main build function
 */
async function build() {
  console.log('🔨 Building knowledge graph...\n');

  // Find all SKILL.md files
  const skillFiles = await findSkillFiles(SKILLS_DIR);

  console.log(`Found ${skillFiles.length} skill files`);

  // Parse all skills
  const nodes = {};
  const errors = [];

  for (const filePath of skillFiles) {
    try {
      const skill = await parseSkillFile(filePath);
      if (skill) {
        nodes[skill.name] = skill;
        console.log(`  ✓ ${skill.name}`);
      }
    } catch (e) {
      errors.push({ file: filePath, error: e.message });
      console.log(`  ✗ ${filePath}: ${e.message}`);
    }
  }

  // Parse MOCs
  console.log('\n📚 Parsing MOCs...');
  const mocs = await parseMocs();
  console.log(`  Found ${Object.keys(mocs).length} MOCs`);

  // Build output
  const graphIndex = {
    version: '2.0.0',
    generated_at: new Date().toISOString().split('T')[0],
    schema: 'knowledge-graph',
    nodes,
    mocs,
    conflict_matrix: buildConflictMatrix(nodes)
  };

  // Write output
  await fs.writeJson(OUTPUT_PATH, graphIndex, { spaces: 2 });

  console.log(`\n✅ Graph index written to: ${OUTPUT_PATH}`);
  console.log(`   Nodes: ${Object.keys(nodes).length}`);
  console.log(`   MOCs: ${Object.keys(mocs).length}`);
  console.log(`   Conflicts: ${Object.keys(graphIndex.conflict_matrix).length}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} errors encountered`);
  }
}

// Run
build().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
