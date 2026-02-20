# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Knowledge Graph architecture for skill relationships
- New CLI commands: `resolve`, `graph`
- Context budget estimation (token counting)
- Skill dependency resolution (`extends`, `requires`, `suggests`, `conflicts`)

## [2.0.0] - 2025-02-20

### 🎉 Major Release: Knowledge Graph

This release introduces a complete architectural overhaul with Knowledge Graph-based skill organization.

### Added

#### Knowledge Graph System
- **Graph-based skill relationships** with 5 relationship types:
  - `extends` — Inherit patterns from parent skills
  - `requires` — Hard dependencies (auto-installed)
  - `suggests` — Optional related skills
  - `conflicts` — Mutually exclusive skills
  - `enhances` — Adds capabilities
- **Automatic dependency resolution** — Installing a skill automatically includes its dependencies
- **Context budget management** — Know exact token count before loading skills
- **Conflict detection** — Prevent incompatible skill combinations
- **Graph validation** — Detect cycles, broken links, orphaned skills

#### New CLI Commands
- `resolve <skill>` — Show dependency tree and load order
- `graph --list` — List all skills in graph
- `graph --stats` — Show graph statistics
- `graph --mocs` — List Maps of Content
- `install-skill --resolve` — Install with dependencies

#### New Skills (v2 Format)
- `knowledge-graph` — Core skill for graph operations
- `react-nextjs` — Next.js App Router specialization
- `marketer` — Marketing and content strategy
- `mobile-developer` — React Native & Expo (consolidated)

#### Skill Updates (Migrated to v2)
- All skills now include `## Knowledge Graph` section
- Added `type` field: `skill`, `capability`, `moc`
- Added `domain` categorization
- Added `estimated_tokens` for context budgeting
- Added wiki-link syntax `[[skill-name]]` for cross-references

#### Maps of Content (MOCs)
- `web-development-moc.md` — Hub for web technologies
- Foundation for domain-based skill discovery

#### Auto-Detection Improvements
- Enhanced project type detection (Expo, Next.js, Remotion, AI libraries)
- Automatic entry point suggestion based on `package.json`

### Changed

#### CLI `init` Command
- **Before**: Flat skill selection from manifest
- **After**: Graph-based resolution with dependency tree
- **New flags**:
  - `--skill <name>` — Start from specific skill
  - `--dry-run` — Preview without installing
  - `--suggests` — Include suggested skills

#### Skill Structure
- **Before**: `skills-manifest.json` flat list
- **After**: `graph-index.json` with full dependency graph
- **Before**: `sub-skills` array
- **After**: `extends` relationships in Knowledge Graph

### Removed

#### Legacy Features
- `--minimal` flag (replaced by graph resolution)
- `--full` flag (replaced by entry point selection)
- `--profile` flag (replaced by auto-detection + `--skill`)
- Flat `skills` array in manifest (replaced by graph nodes)

### Migration Guide

#### For Users
```bash
# Old way (v1.x)
npx @kienha/anti-chaotic init --minimal

# New way (v2.0)
npx @kienha/anti-chaotic init --skill frontend-developer
```

#### For Skill Authors
Add to your `SKILL.md`:
```markdown
## Knowledge Graph
- **extends**: [[parent-skill]]
- **requires**: [[dependency]]
- **suggests**: [[optional-1]], [[optional-2]]
- **conflicts**: [[incompatible-skill]]
- **moc**: [[domain-moc]]
```

---

## [1.0.11] - 2025-02-15

### Added
- Initial release with 12+ skills
- Basic CLI with `init`, `install-skill`, `list-skills`, `update`
- Skills: product-manager, business-analysis, lead-architect, designer, frontend-developer, backend-developer, devops-engineer, qa-tester, ai-engineer, blockchain-engineer
- 11 automated workflows: `/brainstorm`, `/break-tasks`, `/implement-feature`, etc.
- Rules engine for project standards

### Features
- GitHub-based skill distribution
- Interactive skill selection
- Project type detection (basic)
- Update mechanism with diff checking
