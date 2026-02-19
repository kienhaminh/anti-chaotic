#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const crypto = require("crypto");
const os = require("os");

program.version("0.0.1").description("Anti-Chaotic Agent Kit CLI");

const REPO_URI = "kienhaminh/anti-chaotic/.agent";

/**
 * Calculates SHA-256 hash of a file
 */
async function getFileHash(filePath) {
  const buffer = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * Recursively gets all files in a directory
 */
async function getAllFiles(dirPath, baseDir = dirPath) {
  let results = [];
  const list = await fs.readdir(dirPath, { withFileTypes: true });

  for (const item of list) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      results = results.concat(await getAllFiles(fullPath, baseDir));
    } else {
      results.push(path.relative(baseDir, fullPath));
    }
  }
  return results;
}

/**
 * Load skills manifest from directory
 */
async function loadManifest(dirPath) {
  const manifestPath = path.join(dirPath, "skills-manifest.json");
  if (await fs.pathExists(manifestPath)) {
    return fs.readJson(manifestPath);
  }
  return null;
}

program
  .command("init")
  .description("Initialize the Anti-Chaotic Agent Kit (download from GitHub)")
  .option("-m, --minimal", "Install only core skills")
  .option("-f, --full", "Install all skills")
  .action(async (options) => {
    const projectRoot = process.cwd();
    const targetAgentDir = path.join(projectRoot, ".agent");
    const tempDir = path.join(os.tmpdir(), `anti-chaotic-init-${Date.now()}`);

    try {
      console.log(chalk.blue("Initializing Anti-Chaotic Agent Kit..."));
      console.log(chalk.yellow(`Fetching from GitHub: ${REPO_URI}...`));

      const { downloadTemplate } = await import("giget");
      const { default: inquirer } = await import("inquirer");

      // Download to temp first
      await downloadTemplate(`github:${REPO_URI}`, {
        dir: tempDir,
        force: true,
      });

      // Load manifest
      const manifest = await loadManifest(tempDir);
      let selectedSkills = [];
      const coreSkills = manifest ? manifest.core : [];
      const allSkills = manifest ? Object.keys(manifest.skills) : [];

      if (!manifest) {
        console.warn(
          chalk.yellow(
            "Warning: skills-manifest.json not found. Installing all files.",
          ),
        );
        // Fallback to full copy if no manifest
        await fs.copy(tempDir, targetAgentDir);
      } else {
        if (options.full) {
          selectedSkills = allSkills;
        } else if (options.minimal) {
          selectedSkills = coreSkills;
        } else {
          // Interactive selection
          const optionalSkills = allSkills.filter(
            (s) => !coreSkills.includes(s),
          );
          const choices = optionalSkills.map((s) => {
            const meta = manifest.skills[s];
            return {
              name: `${meta.name} (${meta.size}) - ${meta.description}`,
              value: s,
              checked: false,
            };
          });

          console.log(
            chalk.cyan(
              `\nCore skills will be installed: ${coreSkills.join(", ")}`,
            ),
          );

          const { chosen } = await inquirer.prompt([
            {
              type: "checkbox",
              name: "chosen",
              message: "Select additional skills to install:",
              choices: choices,
              pageSize: 15,
            },
          ]);
          selectedSkills = [...coreSkills, ...chosen];
        }

        console.log(
          chalk.blue(
            `\nInstalling selected skills: ${selectedSkills.join(", ")}...`,
          ),
        );

        // Copy everything EXCEPT skills folder
        await fs.copy(tempDir, targetAgentDir, {
          filter: (src) => !src.includes(path.join(tempDir, "skills")),
        });

        // Create skills dir
        const targetSkillsDir = path.join(targetAgentDir, "skills");
        await fs.ensureDir(targetSkillsDir);

        // Copy selected skills
        for (const skill of selectedSkills) {
          const srcSkill = path.join(tempDir, "skills", skill);
          const destSkill = path.join(targetSkillsDir, skill);
          if (await fs.pathExists(srcSkill)) {
            await fs.copy(srcSkill, destSkill);
          } else {
            console.warn(
              chalk.yellow(`Warning: Skill source not found for ${skill}`),
            );
          }
        }
      }

      console.log(
        chalk.green("✔ Successfully installed Anti-Chaotic Agent Kit."),
      );
      console.log(chalk.dim(`  Location: ${targetAgentDir}`));

      // Cleanup
      await fs.remove(tempDir);
    } catch (err) {
      console.error(chalk.red("✘ Error initializing framework:"), err.message);
      if (await fs.pathExists(tempDir)) await fs.remove(tempDir);
    }
  });

program
  .command("install-skill <skillName>")
  .description("Install a specific skill")
  .action(async (skillName) => {
    const projectRoot = process.cwd();
    const targetSkillsDir = path.join(projectRoot, ".agent", "skills");
    const manifestPath = path.join(
      projectRoot,
      ".agent",
      "skills-manifest.json",
    );

    try {
      if (!(await fs.pathExists(targetSkillsDir))) {
        console.error(
          chalk.red("✘ .agent directory not found. Please run 'init' first."),
        );
        return;
      }

      // Check manifest if available
      let manifest = null;
      if (await fs.pathExists(manifestPath)) {
        manifest = await fs.readJson(manifestPath);
        if (manifest.skills && !manifest.skills[skillName]) {
          console.error(
            chalk.red(`✘ Skill '${skillName}' not found in manifest.`),
          );
          console.log("Run 'list-skills' to see available skills.");
          return;
        }
      }

      const destSkill = path.join(targetSkillsDir, skillName);
      if (await fs.pathExists(destSkill)) {
        console.log(chalk.yellow(`Skill '${skillName}' is already installed.`));
        return;
      }

      console.log(chalk.blue(`Installing skill: ${skillName}...`));

      const { downloadTemplate } = await import("giget");

      // Download specific skill folder
      await downloadTemplate(`github:${REPO_URI}/skills/${skillName}`, {
        dir: destSkill,
        force: true,
      });

      console.log(chalk.green(`✔ Successfully installed skill: ${skillName}`));
    } catch (err) {
      console.error(chalk.red("✘ Error installing skill:"), err.message);
    }
  });

program
  .command("list-skills")
  .description("List available and installed skills")
  .option("-i, --installed", "Show only installed skills")
  .action(async (options) => {
    const projectRoot = process.cwd();
    const targetAgentDir = path.join(projectRoot, ".agent");
    const manifestPath = path.join(targetAgentDir, "skills-manifest.json");

    try {
      if (!(await fs.pathExists(manifestPath))) {
        console.error(chalk.red("✘ skills-manifest.json not found."));
        return;
      }

      const manifest = await fs.readJson(manifestPath);
      const installedSkills = await fs.readdir(
        path.join(targetAgentDir, "skills"),
      );

      console.log(chalk.bold("\nAvailable Skills:"));
      console.log(chalk.dim("----------------------------------------"));

      const allSkills = Object.keys(manifest.skills).sort();

      for (const skill of allSkills) {
        const isInstalled = installedSkills.includes(skill);
        const meta = manifest.skills[skill];
        const isCore = manifest.core.includes(skill);

        if (options.installed && !isInstalled) continue;

        const status = isInstalled
          ? chalk.green("✔ Installed")
          : chalk.dim("○ Available");
        const type = isCore ? chalk.cyan("[Core]") : chalk.gray("[Optional]");

        console.log(
          `${status} ${type} ${chalk.bold(meta.name)} (${meta.size})`,
        );
        console.log(`  ${chalk.dim(meta.description)}\n`);
      }
    } catch (err) {
      console.error(chalk.red("✘ Error listing skills:"), err.message);
    }
  });

program
  .command("update")
  .description("Update .agent configuration from GitHub")
  .action(async () => {
    const projectRoot = process.cwd();
    const targetAgentDir = path.join(projectRoot, ".agent");
    const tempDir = path.join(os.tmpdir(), `anti-chaotic-update-${Date.now()}`);
    const { default: inquirer } = await import("inquirer");

    try {
      if (!(await fs.pathExists(targetAgentDir))) {
        console.log(
          chalk.red("✘ .agent directory not found. Please run 'init' first."),
        );
        return;
      }

      console.log(chalk.blue("Checking for updates from GitHub..."));

      const { downloadTemplate } = await import("giget");
      await downloadTemplate(`github:${REPO_URI}`, {
        dir: tempDir,
        force: true,
      });

      const localFiles = await getAllFiles(targetAgentDir);
      const remoteFiles = await getAllFiles(tempDir);

      // Filter remote files to only include installed skills + base files
      // This prevents "update" from re-installing unselected skills
      const installedSkills = await fs.readdir(
        path.join(targetAgentDir, "skills"),
      );

      const relevantRemoteFiles = remoteFiles.filter((file) => {
        // Keep files not in skills folder
        if (!file.startsWith("skills/")) return true;

        // Keep files in installed skills directories
        const skillName = file.split(path.sep)[1];
        return installedSkills.includes(skillName);
      });

      const modified = [];
      const added = [];
      const deleted = [];

      // Check for modified and deleted files
      for (const file of localFiles) {
        const localPath = path.join(targetAgentDir, file);
        const remotePath = path.join(tempDir, file);

        // Only check against relevant remote files
        const isRelevant =
          !file.startsWith("skills/") ||
          installedSkills.includes(file.split(path.sep)[1]);

        if ((await fs.pathExists(remotePath)) && isRelevant) {
          const localHash = await getFileHash(localPath);
          const remoteHash = await getFileHash(remotePath);
          if (localHash !== remoteHash) {
            modified.push(file);
          }
        }
        // Note: We don't mark as deleted if it's missing in remote but present locally
        // unless we are sure it was removed from upstream.
        // For now, let's strictly check if it WAS in remote but now isn't?
        // Or simplified: if it's in localFiles but not in relevantRemoteFiles?
        // Let's stick to simple update logic: compare what we have.
      }

      // Check for new files from remote (only relevant ones)
      for (const file of relevantRemoteFiles) {
        if (!localFiles.includes(file)) {
          added.push(file); // New file in an installed skill or base dir
        }
      }

      if (modified.length === 0 && added.length === 0) {
        console.log(chalk.green("✔ Your installed components are up to date."));
        await fs.remove(tempDir);
        return;
      }

      console.log(chalk.yellow("\nUpdate Summary:"));

      let filesToOverwrite = [];
      let filesToAdd = [];

      if (modified.length > 0) {
        const { selectedModified } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "selectedModified",
            message:
              "Select MODIFIED files to OVERWRITE (Unselected = Keep Local):",
            choices: modified.map((f) => ({
              name: f,
              value: f,
              checked: false,
            })),
            pageSize: 20,
          },
        ]);
        filesToOverwrite = selectedModified;
      }

      if (added.length > 0) {
        const { selectedAdded } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "selectedAdded",
            message: "Select NEW files to ADD (Unselected = Skip):",
            choices: added.map((f) => ({ name: f, value: f, checked: true })),
            pageSize: 20,
          },
        ]);
        filesToAdd = selectedAdded;
      }

      if (filesToOverwrite.length === 0 && filesToAdd.length === 0) {
        console.log(chalk.yellow("No changes selected. Update cancelled."));
        await fs.remove(tempDir);
        return;
      }

      console.log(chalk.blue("\nApplying updates..."));

      // Process Overwrites
      for (const file of filesToOverwrite) {
        const src = path.join(tempDir, file);
        const dest = path.join(targetAgentDir, file);
        await fs.copy(src, dest, { overwrite: true });
        console.log(chalk.green(`  ✔ Overwritten: ${file}`));
      }

      // Process New Files
      for (const file of filesToAdd) {
        const src = path.join(tempDir, file);
        const dest = path.join(targetAgentDir, file);
        await fs.copy(src, dest, { overwrite: false });
        console.log(chalk.green(`  ✔ Added: ${file}`));
      }

      console.log(chalk.green("\n✔ Selected updates applied successfully."));

      // Cleanup
      await fs.remove(tempDir);
    } catch (err) {
      console.error(chalk.red("✘ Error updating framework:"), err.message);
      if (await fs.pathExists(tempDir)) await fs.remove(tempDir);
    }
  });

program.parse(process.argv);
