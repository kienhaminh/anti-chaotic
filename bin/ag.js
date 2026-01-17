#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

program.version("0.0.1").description("Antigravity Framework CLI");

program
  .command("init")
  .description("Initialize the Antigravity framework structure")
  .action(async () => {
    const projectRoot = process.cwd();
    const agentDir = path.join(projectRoot, ".agent");
    const dirs = ["rules", "workflows", "skills"];

    try {
      for (const dir of dirs) {
        await fs.ensureDir(path.join(agentDir, dir));
      }
      console.log(
        chalk.green("✔ Initialized Antigravity framework in .agent/"),
      );

      // Create a default rule file
      const ruleFile = path.join(agentDir, "rules", "base.md");
      if (!(await fs.pathExists(ruleFile))) {
        await fs.writeFile(
          ruleFile,
          "# Base Rules\n\n- Follow clean code principles.\n- Always explain complex logic.\n",
        );
        console.log(chalk.blue("  - Created .agent/rules/base.md"));
      }
    } catch (err) {
      console.error(chalk.red("✘ Error initializing framework:"), err.message);
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
