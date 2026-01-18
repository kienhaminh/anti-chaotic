#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

program.version("0.0.1").description("Anti-Chaotic Agent Kit CLI");

const REPO_URI = "kienhaminh/anti-chaotic/.agent";

program
  .command("init")
  .description("Initialize the Anti-Chaotic Agent Kit (download from GitHub)")
  .action(async () => {
    const projectRoot = process.cwd();
    const targetAgentDir = path.join(projectRoot, ".agent");

    try {
      console.log(chalk.blue("Initializing Anti-Chaotic Agent Kit..."));
      console.log(chalk.yellow(`Fetching from GitHub: ${REPO_URI}...`));

      const { downloadTemplate } = await import("giget");
      await downloadTemplate(`github:${REPO_URI}`, {
        dir: targetAgentDir,
        force: true,
      });

      console.log(
        chalk.green("✔ Successfully installed Anti-Chaotic Agent Kit."),
      );

      console.log(chalk.dim(`  Location: ${targetAgentDir}`));
    } catch (err) {
      console.error(chalk.red("✘ Error initializing framework:"), err.message);
    }
  });

program
  .command("update")
  .description("Update .agent configuration from GitHub")
  .action(async () => {
    const targetAgentDir = path.join(process.cwd(), ".agent");

    try {
      console.log(
        chalk.blue(`Updating Anti-Chaotic Agent Kit from ${REPO_URI}...`),
      );

      const { downloadTemplate } = await import("giget");
      await downloadTemplate(`github:${REPO_URI}`, {
        dir: targetAgentDir,
        force: true,
      });

      console.log(chalk.green("✔ Successfully updated .agent from GitHub."));
      console.log(chalk.dim(`  Location: ${targetAgentDir}`));
    } catch (err) {
      console.error(chalk.red("✘ Error updating framework:"), err.message);
    }
  });

program.parse(process.argv);
