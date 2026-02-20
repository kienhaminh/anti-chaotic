# Skill Creation & Maintenance Standards

Create and manage Agent Skills for Antigravity/Gemini CLI.

## About Agent Skills

Skills are modular packages that extend Antigravity with specialized expertise and workflows.

**Skill Locations:**

- **Workspace skills**: `.agent/skills/` - project-specific, committed to version control
- **Global skills**: `~/.gemini/skills/` - personal skills across all workspaces

## Skill Structure

```
skill-name/
├── SKILL.md          # Required - instructions and metadata
├── scripts/          # Optional - executable scripts
├── references/       # Optional - documentation to load as needed
└── assets/           # Optional - templates, images, data files
```

## SKILL.md Format

### Frontmatter (required)

```yaml
---
name: skill-name # Required: 1-64 chars, lowercase, hyphens only
description: What skill does # Required: 1-1024 chars, include trigger keywords
license: MIT # Optional: license identifier
compatibility: Requires git # Optional: 1-500 chars, environment requirements
metadata: # Optional: custom key-value pairs
  author: example-org
  version: "1.0"
allowed-tools: Bash(git:*) Read # Experimental: pre-approved tools
---
```

## Creating a Skill

### Step 1: Clarify Scope (Required)

**Always ask the user** to clarify the skill's scope before proceeding:

- What specific tasks should this skill handle?
- What tools, APIs, or frameworks does it involve?
- Are there any existing workflows or patterns to follow?

### Step 2: Research & Analysis

Use available tools (`search_web`, `read_url_content`, `grep_search`) to understand the domain and best practices.

### Step 3: Initialize

```bash
python .agent/skills/project-manager/scripts/init_skill.py <skill-name> --path .agent/skills
```

### Step 4: Edit SKILL.md

1. Complete the frontmatter metadata.
2. Write clear, actionable instructions.
3. Add scripts/references/assets as needed.

### Step 5: Validate

```bash
python .agent/skills/project-manager/scripts/quick_validate.py .agent/skills/<skill-name>
```

## Upgrading Existing Skills

### Step 1: Clarify User Intent

Apply the **Expert Questioning Framework**. Use the `skill-questionnaire` template.

### Step 2: Analyze Current Skill

```bash
# Backup
cp -r .agent/skills/<skill-name> .agent/skills/<skill-name>.backup
# Analyze
ls -la .agent/skills/<skill-name>/
```

### Step 3: Gap Analysis

Compare current state vs new requirements.

### Step 4: Implement & Report

After implementation, run:

```bash
python .agent/skills/project-manager/scripts/compare_skill.py .agent/skills/<skill-name>.backup .agent/skills/<skill-name>
```
