const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const chalk = require("chalk");
const { REPO_URI, loadGraph, resolveSkill } = require("./resolver");
const { detectTechStack, generateRecommendationMessage } = require("./detector");

/**
 * Initialize command
 */
async function init(options) {
  const projectRoot = process.cwd();
  const targetAgentDir = path.join(projectRoot, ".agent");
  const tempDir = path.join(os.tmpdir(), `anti-chaotic-init-${Date.now()}`);

  try {
    console.log(chalk.blue("🚀 Initializing Anti-Chaotic Agent Kit..."));
    
    const { default: inquirer } = await import("inquirer");
    const { downloadTemplate } = await import("giget");

    // Download to temp
    console.log(chalk.dim(`Fetching from GitHub: ${REPO_URI}...`));
    await downloadTemplate(`github:${REPO_URI}`, {
      dir: tempDir,
      force: true,
    });

    // Load graph from downloaded template
    const graph = await fs.readJson(path.join(tempDir, "graph-index.json"));
    
    if (!graph) {
      throw new Error("graph-index.json not found in template");
    }

    let entrySkill = null;

    if (options.skill) {
      entrySkill = options.skill;
      if (!graph.nodes[entrySkill]) {
        console.error(chalk.red(`✘ Skill '${entrySkill}' not found in graph.`));
        console.log(chalk.yellow("Available skills:", Object.keys(graph.nodes).slice(0, 10).join(", ") + "..."));
        await fs.remove(tempDir);
        return;
      }
    } else {
      // Auto-detect
      console.log(chalk.blue("\n🔍 Analyzing your project..."));
      const detected = await detectTechStack(projectRoot);
      
      if (detected.suggestedProfile || detected.suggestedSkills.length > 0) {
        console.log(generateRecommendationMessage(detected));
        
        const { useRecommended } = await inquirer.prompt([
          {
            type: "confirm",
            name: "useRecommended",
            message: detected.suggestedProfile 
              ? `Use recommended entry point '${detected.suggestedProfile}'?`
              : "Use detected skills?",
            default: true,
          },
        ]);
        
        if (useRecommended) {
          entrySkill = detected.suggestedProfile || detected.suggestedSkills[0];
        }
      }
      
      if (!entrySkill) {
        const choices = Object.entries(graph.nodes).map(([name, node]) => ({
          name: `${name} (${node.type})${node.domain ? ` [${node.domain}]` : ''}`,
          value: name
        }));
        
        const { selected } = await inquirer.prompt([
          {
            type: "list",
            name: "selected",
            message: "Select entry point skill:",
            choices,
            pageSize: 15
          }
        ]);
        entrySkill = selected;
      }
    }

    // Resolve dependencies
    console.log(chalk.blue(`\n📦 Resolving dependencies for [[${entrySkill}]]...`));
    const resolution = resolveSkill(graph, entrySkill, { 
      includeSuggests: options.suggests 
    });

    if (resolution.conflicts.length > 0) {
      console.error(chalk.red("\n✘ Conflicts detected:"));
      for (const c of resolution.conflicts) {
        console.error(`  ❌ [[${c.skill}]] conflicts with [[${c.conflictsWith}]]`);
      }
      await fs.remove(tempDir);
      return;
    }

    // Show resolution tree
    console.log(chalk.green("\n✓ Resolution complete:"));
    console.log(chalk.dim("  Load order:"));
    resolution.loadOrder.forEach((skill, i) => {
      const node = graph.nodes[skill];
      const indent = "  ".repeat(i);
      const tokens = node?.estimated_tokens 
        ? chalk.dim(` ~${Math.round(node.estimated_tokens/1000)}k tokens`)
        : "";
      console.log(`${indent}${i + 1}. [[${skill}]]${tokens}`);
    });

    if (resolution.suggests.length > 0 && !options.suggests) {
      console.log(chalk.dim(`\n  Suggested (use --suggests to include):`));
      resolution.suggests.forEach(s => console.log(chalk.dim(`    ○ [[${s}]]`)));
    }

    console.log(chalk.cyan(`\n📊 Context Budget:`));
    console.log(`  Skills: ${resolution.loadOrder.length}`);
    console.log(`  Estimated tokens: ~${Math.round(resolution.totalTokens/1000)}k`);

    if (options.dryRun) {
      console.log(chalk.yellow("\n⚠ Dry run - nothing installed."));
      await fs.remove(tempDir);
      return;
    }

    const { proceed } = await inquirer.prompt([
      {
        type: "confirm",
        name: "proceed",
        message: "\nProceed with installation?",
        default: true
      }
    ]);

    if (!proceed) {
      console.log(chalk.yellow("Installation cancelled."));
      await fs.remove(tempDir);
      return;
    }

    // Install
    console.log(chalk.blue("\n📥 Installing..."));

    await fs.copy(path.join(tempDir, "graph-index.json"), path.join(targetAgentDir, "graph-index.json"));
    await fs.copy(path.join(tempDir, "skills-manifest.json"), path.join(targetAgentDir, "skills-manifest.json"));
    if (await fs.pathExists(path.join(tempDir, "mocs"))) {
      await fs.copy(path.join(tempDir, "mocs"), path.join(targetAgentDir, "mocs"));
    }

    const targetSkillsDir = path.join(targetAgentDir, "skills");
    await fs.ensureDir(targetSkillsDir);

    for (const skill of resolution.loadOrder) {
      const srcSkill = path.join(tempDir, "skills", skill);
      const destSkill = path.join(targetSkillsDir, skill);
      if (await fs.pathExists(srcSkill)) {
        await fs.copy(srcSkill, destSkill);
        console.log(chalk.green(`  ✓ [[${skill}]]`));
      } else {
        console.warn(chalk.yellow(`  ⚠ Skill source not found: ${skill}`));
      }
    }

    if (await fs.pathExists(path.join(tempDir, "rules"))) {
      await fs.copy(path.join(tempDir, "rules"), path.join(targetAgentDir, "rules"));
    }
    if (await fs.pathExists(path.join(tempDir, "workflows"))) {
      await fs.copy(path.join(tempDir, "workflows"), path.join(targetAgentDir, "workflows"));
    }

    console.log(chalk.green("\n✔ Installation complete!"));
    console.log(chalk.dim(`  Location: ${targetAgentDir}`));
    console.log(chalk.dim(`  Skills: ${resolution.loadOrder.length}`));

    await fs.remove(tempDir);
  } catch (err) {
    console.error(chalk.red("✘ Error:"), err.message);
    if (await fs.pathExists(tempDir)) await fs.remove(tempDir);
    process.exit(1);
  }
}

/**
 * Resolve command
 */
async function resolve(skillName, options) {
  const projectRoot = process.cwd();
  const graph = await loadGraph(projectRoot);
  
  if (!graph) {
    console.error(chalk.red("✘ graph-index.json not found. Run 'init' first."));
    return;
  }

  if (!graph.nodes[skillName]) {
    console.error(chalk.red(`✘ Skill '${skillName}' not found.`));
    console.log(chalk.yellow("Available:", Object.keys(graph.nodes).slice(0, 10).join(", ") + "..."));
    return;
  }

  const resolution = resolveSkill(graph, skillName, {
    depth: options.depth || Infinity,
    includeSuggests: options.suggests
  });

  console.log(chalk.cyan(`\n📦 Resolution for [[${skillName}]]\n`));
  console.log(chalk.dim("═".repeat(50)));
  
  console.log(chalk.green("\n📝 Load Order:"));
  resolution.loadOrder.forEach((name, i) => {
    const node = graph.nodes[name];
    const tokens = node?.estimated_tokens 
      ? chalk.dim(` (~${Math.round(node.estimated_tokens/1000)}k tokens)`)
      : "";
    console.log(`  ${i + 1}. [[${name}]]${tokens}`);
  });

  console.log(chalk.cyan(`\n📊 Stats:`));
  console.log(`  Total skills: ${resolution.loadOrder.length}`);
  console.log(`  Estimated tokens: ~${Math.round(resolution.totalTokens/1000)}k`);

  if (resolution.suggests.length > 0) {
    console.log(chalk.yellow(`\n💡 Suggested:`));
    resolution.suggests.forEach(s => {
      const node = graph.nodes[s];
      const desc = node?.description ? chalk.dim(` - ${node.description}`) : "";
      console.log(`  ○ [[${s}]]${desc}`);
    });
  }

  if (resolution.notFound.length > 0) {
    console.log(chalk.red(`\n❓ Not Found:`));
    resolution.notFound.forEach(nf => console.log(`  ⚠️  [[${nf}]]`));
  }

  console.log(chalk.dim("═".repeat(50)));
}

/**
 * Graph command
 */
async function graph(options) {
  const projectRoot = process.cwd();
  const graph = await loadGraph(projectRoot);
  
  if (!graph) {
    console.error(chalk.red("✘ graph-index.json not found. Run 'init' first."));
    return;
  }

  if (options.list) {
    console.log(chalk.cyan("\n📚 Skills in Graph:\n"));
    const sorted = Object.entries(graph.nodes).sort((a, b) => a[0].localeCompare(b[0]));
    
    for (const [name, node] of sorted) {
      const type = chalk.gray(`[${node.type}]`);
      const domain = node.domain ? chalk.dim(`(${node.domain})`) : "";
      console.log(`  ${chalk.bold(name)} ${type} ${domain}`);
      if (node.description) {
        console.log(chalk.dim(`    ${node.description.slice(0, 60)}...`));
      }
    }
  }

  if (options.mocs) {
    console.log(chalk.cyan("\n🗺️  Maps of Content:\n"));
    for (const [name, moc] of Object.entries(graph.mocs || {})) {
      console.log(`  ${chalk.bold(name)}`);
      console.log(chalk.dim(`    Skills: ${moc.skills?.length || 0}`));
    }
  }

  if (options.stats || (!options.list && !options.mocs)) {
    console.log(chalk.cyan("\n📊 Graph Statistics:\n"));
    console.log(`  Total skills: ${Object.keys(graph.nodes).length}`);
    console.log(`  Total MOCs: ${Object.keys(graph.mocs || {}).length}`);
    
    const types = {};
    const domains = {};
    for (const node of Object.values(graph.nodes)) {
      types[node.type] = (types[node.type] || 0) + 1;
      if (node.domain) domains[node.domain] = (domains[node.domain] || 0) + 1;
    }
    
    console.log(chalk.dim("\n  By type:"));
    for (const [type, count] of Object.entries(types)) {
      console.log(chalk.dim(`    ${type}: ${count}`));
    }
    
    console.log(chalk.dim("\n  By domain:"));
    for (const [domain, count] of Object.entries(domains).sort((a, b) => b[1] - a[1])) {
      console.log(chalk.dim(`    ${domain}: ${count}`));
    }
  }
}

/**
 * Install command
 */
async function install(skillName, options) {
  const projectRoot = process.cwd();
  const targetSkillsDir = path.join(projectRoot, ".agent", "skills");
  const graph = await loadGraph(projectRoot);

  try {
    if (!(await fs.pathExists(targetSkillsDir))) {
      console.error(chalk.red("✘ .agent not found. Run 'init' first."));
      return;
    }

    if (!graph || !graph.nodes[skillName]) {
      console.error(chalk.red(`✘ Skill '${skillName}' not found in graph.`));
      return;
    }

    let skillsToInstall = [skillName];

    if (options.resolve) {
      const resolution = resolveSkill(graph, skillName);
      skillsToInstall = resolution.loadOrder;
      
      console.log(chalk.blue(`\n📦 Will install ${skillsToInstall.length} skill(s):`));
      skillsToInstall.forEach(s => console.log(`  • [[${s}]]`));
      
      const { default: inquirer } = await import("inquirer");
      const { proceed } = await inquirer.prompt([{
        type: "confirm",
        name: "proceed",
        message: "Proceed?",
        default: true
      }]);
      
      if (!proceed) return;
    }

    const { downloadTemplate } = await import("giget");
    const tempDir = path.join(os.tmpdir(), `anti-chaotic-install-${Date.now()}`);

    await downloadTemplate(`github:${REPO_URI}`, { dir: tempDir, force: true });

    for (const skill of skillsToInstall) {
      const destSkill = path.join(targetSkillsDir, skill);
      if (await fs.pathExists(destSkill)) {
        console.log(chalk.yellow(`  ⚠ [[${skill}]] already installed`));
        continue;
      }

      const srcSkill = path.join(tempDir, "skills", skill);
      if (await fs.pathExists(srcSkill)) {
        await fs.copy(srcSkill, destSkill);
        console.log(chalk.green(`  ✓ [[${skill}]]`));
      } else {
        console.warn(chalk.yellow(`  ⚠ Source not found: ${skill}`));
      }
    }

    await fs.remove(tempDir);
    console.log(chalk.green("\n✔ Installation complete"));

  } catch (err) {
    console.error(chalk.red("✘ Error:"), err.message);
  }
}

module.exports = {
  init,
  resolve,
  graph,
  install
};
