const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

/**
 * Detect tech stack from project files
 */
async function detectTechStack(projectRoot) {
  const detected = {
    frameworks: [],
    languages: [],
    platforms: [],
    features: [],
    suggestedSkills: [],
    suggestedProfile: null
  };

  // Check package.json
  const packageJsonPath = path.join(projectRoot, "package.json");
  let packageJson = null;
  if (await fs.pathExists(packageJsonPath)) {
    try {
      packageJson = await fs.readJson(packageJsonPath);
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      if (deps["next"]) {
        detected.frameworks.push("Next.js");
        detected.suggestedSkills.push("react-nextjs");
      }
      if (deps["react"]) {
        detected.frameworks.push("React");
        if (!detected.suggestedSkills.includes("react-nextjs")) {
          detected.suggestedSkills.push("frontend-developer");
        }
      }
      if (deps["vue"] || deps["@vue/runtime-core"]) {
        detected.frameworks.push("Vue");
        detected.suggestedSkills.push("frontend-developer");
      }
      if (deps["expo"] || deps["expo-router"]) {
        detected.frameworks.push("Expo");
        detected.platforms.push("mobile");
        detected.suggestedSkills.push("mobile-developer");
      }
      if (deps["react-native"]) {
        detected.frameworks.push("React Native");
        detected.platforms.push("mobile");
      }
      if (deps["remotion"]) {
        detected.frameworks.push("Remotion");
        detected.features.push("video");
        detected.suggestedSkills.push("remotion-best-practices");
      }
      if (deps["three"] || deps["@react-three/fiber"]) {
        detected.features.push("3D");
        detected.suggestedSkills.push("threejs");
      }
      if (deps["prisma"] || deps["mongoose"]) {
        detected.features.push("database");
        detected.suggestedSkills.push("backend-developer");
      }
      if (deps["express"] || deps["fastify"] || deps["koa"]) {
        detected.frameworks.push("Node.js API");
        detected.suggestedSkills.push("backend-developer");
      }
      if (deps["langchain"] || deps["openai"] || deps["@anthropic-ai/sdk"]) {
        detected.features.push("AI/LLM");
        detected.suggestedSkills.push("ai-engineer");
      }
      if (deps["tailwindcss"] || deps["nativewind"]) {
        detected.features.push("Tailwind CSS");
      }
      if (deps["typescript"]) {
        detected.languages.push("TypeScript");
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  // Determine profile
  if (detected.platforms.includes("mobile") && detected.frameworks.includes("Expo")) {
    detected.suggestedProfile = "mobile-developer";
  } else if (detected.features.includes("video") && detected.frameworks.includes("Remotion")) {
    detected.suggestedProfile = "remotion-best-practices";
  } else if (detected.features.includes("AI/LLM")) {
    detected.suggestedProfile = "ai-engineer";
  } else if (detected.frameworks.includes("Next.js") && detected.suggestedSkills.includes("backend-developer")) {
    detected.suggestedProfile = "fullstack-saas";
  } else if (detected.frameworks.includes("Next.js") || detected.frameworks.includes("React") || detected.frameworks.includes("Vue")) {
    detected.suggestedProfile = "frontend-developer";
  }

  return detected;
}

/**
 * Generate recommendation message from detection results
 */
function generateRecommendationMessage(detected) {
  const lines = [];
  
  lines.push(chalk.cyan("\n📊 Project Analysis Results:"));
  lines.push(chalk.dim("─".repeat(50)));
  
  if (detected.frameworks.length > 0) {
    lines.push(chalk.yellow("Frameworks:") + " " + detected.frameworks.join(", "));
  }
  if (detected.languages.length > 0) {
    lines.push(chalk.yellow("Languages:") + " " + detected.languages.join(", "));
  }
  if (detected.features.length > 0) {
    lines.push(chalk.yellow("Features:") + " " + detected.features.join(", "));
  }
  
  if (detected.suggestedProfile) {
    lines.push("");
    lines.push(chalk.green("✨ Recommended Entry Point:") + " " + chalk.bold(detected.suggestedProfile));
  }
  
  if (detected.suggestedSkills.length > 0) {
    lines.push(chalk.green("🎯 Detected Skills:") + " " + detected.suggestedSkills.join(", "));
  }
  
  lines.push(chalk.dim("─".repeat(50)));
  
  return lines.join("\n");
}

module.exports = {
  detectTechStack,
  generateRecommendationMessage
};
