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

      const modified = [];
      const added = [];
      const deleted = [];

      // Check for modified and deleted files
      for (const file of localFiles) {
        const localPath = path.join(targetAgentDir, file);
        const remotePath = path.join(tempDir, file);

        if (await fs.pathExists(remotePath)) {
          const localHash = await getFileHash(localPath);
          const remoteHash = await getFileHash(remotePath);
          if (localHash !== remoteHash) {
            modified.push(file);
          }
        } else {
          deleted.push(file);
        }
      }

      // Check for new files from remote
      for (const file of remoteFiles) {
        if (!localFiles.includes(file)) {
          added.push(file);
        }
      }

      if (modified.length === 0 && added.length === 0 && deleted.length === 0) {
        console.log(
          chalk.green("✔ Your .agent configuration is already up to date."),
        );
        await fs.remove(tempDir);
        return;
      }

      console.log(chalk.yellow("\nUpdate Summary:"));

      let filesToOverwrite = [];
      let filesToAdd = [];
      let filesToDelete = [];

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

      if (deleted.length > 0) {
        const { selectedDeleted } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "selectedDeleted",
            message:
              "Select DELETED files to REMOVE locally (Unselected = Keep Local):",
            choices: deleted.map((f) => ({ name: f, value: f, checked: true })),
            pageSize: 20,
          },
        ]);
        filesToDelete = selectedDeleted;
      }

      if (
        filesToOverwrite.length === 0 &&
        filesToAdd.length === 0 &&
        filesToDelete.length === 0
      ) {
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

      // Process Deletions
      for (const file of filesToDelete) {
        const dest = path.join(targetAgentDir, file);
        await fs.remove(dest);
        console.log(chalk.red(`  ✘ Deleted: ${file}`));
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
