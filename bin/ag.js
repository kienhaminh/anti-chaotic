#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const tiged = require("tiged");

program.version("0.0.1").description("Anti-Chaotic Agent Kit CLI");

const REPO_URI = "kienhaminh/anti-chaotic/.agent";

program
  .command("init")
  .description("Initialize the Anti-Chaotic framework structure (local copy)")
  .option(
    "-r, --remote",
    "Fetch from remote GitHub repository instead of local package",
  )
  .action(async (cmd) => {
    const projectRoot = process.cwd();
    const sourceAgentDir = path.join(__dirname, "..", ".agent");
    const targetAgentDir = path.join(projectRoot, ".agent");

    try {
      console.log(chalk.blue("Initializing Anti-Chaotic framework..."));

      if (cmd.remote) {
        console.log(chalk.yellow(`Fetching from GitHub: ${REPO_URI}...`));
        const emitter = tiged(REPO_URI, {
          disableCache: true,
          force: true,
          mode: "git",
        });

        await emitter.clone(targetAgentDir);
        console.log(chalk.green("✔ Successfully fetched .agent from GitHub."));
      } else {
        // Local Copy
        if (!(await fs.pathExists(sourceAgentDir))) {
          // Fallback to remote if local not found (e.g. npx cache issue), though unlikely in packaged env
          console.log(
            chalk.yellow("Local source not found, attempting remote fetch..."),
          );
          const emitter = tiged(REPO_URI, {
            disableCache: true,
            force: true,
            mode: "git",
          });
          await emitter.clone(targetAgentDir);
          console.log(
            chalk.green(
              "✔ Successfully fetched .agent from GitHub (fallback).",
            ),
          );
        } else {
          await fs.copy(sourceAgentDir, targetAgentDir, { overwrite: true });
          console.log(
            chalk.green(
              "✔ Successfully installed .agent configuration from local package.",
            ),
          );
        }
      }

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
        chalk.blue(`Updating Anti-Chaotic framework from ${REPO_URI}...`),
      );

      const emitter = tiged(REPO_URI, {
        disableCache: true,
        force: true,
        mode: "git",
      });

      await emitter.clone(targetAgentDir);

      console.log(chalk.green("✔ Successfully updated .agent from GitHub."));
      console.log(chalk.dim(`  Location: ${targetAgentDir}`));
    } catch (err) {
      console.error(chalk.red("✘ Error updating framework:"), err.message);
    }
  });

program
  .command("add <type> <name>")
  .description("Add a new component (skill, rule, or workflow)")
  .action(async (type, name) => {
    const agentDir = path.join(process.cwd(), ".agent");

    if (!(await fs.pathExists(agentDir))) {
      console.error(
        chalk.red(
          '✘ Documentation framework not initialized. Run "ag init" first.',
        ),
      );
      return;
    }

    try {
      if (type === "skill") {
        const skillDir = path.join(agentDir, "skills", name);
        await fs.ensureDir(skillDir);
        await fs.ensureDir(path.join(skillDir, "scripts"));
        await fs.writeFile(
          path.join(skillDir, "SKILL.md"),
          `# ${name} Skill\n\nDescription of the ${name} skill.\n`,
        );
        console.log(
          chalk.green(`✔ Added skill: ${name} at .agent/skills/${name}`),
        );
      } else if (type === "workflow") {
        const workflowFile = path.join(agentDir, "workflows", `${name}.md`);
        await fs.writeFile(
          workflowFile,
          `---\ndescription: ${name} workflow\n---\n\n1. Step one\n2. Step two\n`,
        );
        console.log(
          chalk.green(
            `✔ Added workflow: ${name} at .agent/workflows/${name}.md`,
          ),
        );
      } else if (type === "rule") {
        const ruleFile = path.join(agentDir, "rules", `${name}.md`);
        await fs.writeFile(ruleFile, `# ${name} Rules\n\n- Rule 1\n`);
        console.log(
          chalk.green(`✔ Added rule: ${name} at .agent/rules/${name}.md`),
        );
      } else {
        console.error(
          chalk.red(
            `✘ Unknown type: ${type}. Use "skill", "rule", or "workflow".`,
          ),
        );
      }
    } catch (err) {
      console.error(chalk.red("✘ Error adding component:"), err.message);
    }
  });

program.parse(process.argv);
