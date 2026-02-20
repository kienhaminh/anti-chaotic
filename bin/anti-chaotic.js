#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");

// Import modules
const { loadGraph, loadManifest, resolveSkill, calculateContextSize, findSpecializations } = require("../lib/resolver");
const { detectTechStack, generateRecommendationMessage } = require("../lib/detector");
const commands = require("../lib/commands");

program.version("2.0.0").description("Anti-Chaotic Agent Kit CLI - Knowledge Graph Edition");

// Register commands
program
  .command("init")
  .description("Initialize Anti-Chaotic with Knowledge Graph resolution")
  .option("-s, --skill <skill>", "Start from specific skill")
  .option("-p, --profile <profile>", "Use predefined profile (legacy)")
  .option("--suggests", "Include suggested skills")
  .option("--dry-run", "Show what would be installed without installing")
  .action(commands.init);

program
  .command("resolve <skill>")
  .description("Resolve skill dependencies using knowledge graph")
  .option("--suggests", "Include suggested skills")
  .option("--depth <n>", "Maximum traversal depth", parseInt)
  .action(commands.resolve);

program
  .command("graph")
  .description("Show knowledge graph information")
  .option("--list", "List all skills")
  .option("--mocs", "List MOCs")
  .option("--stats", "Show graph statistics")
  .action(commands.graph);

program
  .command("install-skill <skillName>")
  .description("Install a skill with dependency resolution")
  .option("--resolve", "Resolve and install dependencies")
  .action(commands.install);

program.parse(process.argv);
