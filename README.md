# 🚀 Anti-Chaotic Agent Kit v2.0

<p align="center">
  <img src="web/logo.png" width="400" alt="Anti-Chaotic Logo">
</p>

> **Knowledge Graph Powered Agent Kit for AI-Driven Development**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/kienhaminh/anti-chaotic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 🎯 What's New in v2.0

> See [CHANGELOG.md](CHANGELOG.md) for full release history.

### 🕸️ Knowledge Graph Architecture

Skills are now organized in a **knowledge graph** with explicit relationships:

```
[[ai-engineer]]              [[react-nextjs]]
      ↑ extends                     ↑ extends
[[backend-developer]] ←──→ [[frontend-developer]] ←──→ [[mobile-developer]]
                                    ↑ enhances
                              [[designer]]
```

**Relationship Types:**
- **`extends`** — Inherit all patterns from parent skill (auto-loaded)
- **`requires`** — Hard dependencies (must be installed)
- **`suggests`** — Optional related skills (prompted)
- **`conflicts`** — Mutually exclusive (error if both selected)
- **`enhances`** — Adds capabilities to base skill

**Benefits:**
- ✅ **Automatic dependency resolution** — Install `react-nextjs`, get `frontend-developer` automatically
- ✅ **Context budget management** — Know exact token count before loading
- ✅ **Conflict detection** — Prevent incompatible skill combinations

> 📖 **Migration Guide**: See [CHANGELOG.md](CHANGELOG.md#migration-guide) for upgrading from v1.x

---

## 🚀 Quick Start

### Installation

```bash
# Auto-detect project type and install with dependencies
npx @kienha/anti-chaotic init

# Start from specific skill
npx @kienha/anti-chaotic init --skill react-nextjs

# Preview without installing
npx @kienha/anti-chaotic init --dry-run
```

### Knowledge Graph CLI

```bash
# Resolve skill dependencies
npx @kienha/anti-chaotic resolve react-nextjs
# Output:
# 📦 Resolution for [[react-nextjs]]
# 📝 Load Order:
#   1. [[frontend-developer]] (~1k tokens)
#   2. [[react-nextjs]] (~1k tokens)
# 📊 Total: 2 skills, ~2k tokens

# Include suggestions
npx @kienha/anti-chaotic resolve ai-engineer --suggests

# List all skills
npx @kienha/anti-chaotic graph --list

# Show statistics
npx @kienha/anti-chaotic graph --stats

# Install with dependencies
npx @kienha/anti-chaotic install-skill threejs --resolve
```

---

## 📚 Skill Hierarchy

### Foundation Skills (Base)

| Skill | Domain | Description |
|:------|:-------|:------------|
| **[[frontend-developer]]** | web | Foundation for all frontend development |
| **[[backend-developer]]** | infra | API design, architecture, security |
| **[[project-manager]]** | management | Planning, requirements, prioritization |

### Specializations (extends Foundation)

| Skill | Extends | Use For |
|:------|:--------|:--------|
| **[[react-nextjs]]** | frontend-developer | Next.js App Router, RSC |
| **[[mobile-developer]]** | frontend-developer | React Native, Expo |
| **[[ai-engineer]]** | backend-developer | LLM, RAG, Agents |
| **[[devops-engineer]]** | — | CI/CD, Infrastructure |

### Capabilities (enhances Specializations)

| Skill | Enhances | Use For |
|:------|:---------|:--------|
| **[[threejs]]** | any frontend | 3D graphics, WebGL |
| **[[remotion-best-practices]]** | react-nextjs | Programmatic video |
| **[[tailwind-setup]]** | any frontend | Utility-first CSS |

---

## 🎭 All Skills (24+)

### Development

| Skill | Type | Description |
|:------|:-----|:------------|
| **frontend-developer** | skill | Foundation for React, Vue, Angular |
| **react-nextjs** | skill | Next.js App Router, Server Components |
| **mobile-developer** | skill | React Native & Expo |
| **backend-developer** | skill | Node, Python, Go APIs |
| **ai-engineer** | skill | LLM integration, RAG, Agents |
| **blockchain-engineer** | skill | Smart contracts, Web3 |
| **devops-engineer** | skill | CI/CD, Cloud, Observability |

### Quality & Design

| Skill | Type | Description |
|:------|:-----|:------------|
| **designer** | skill | UI/UX, Design systems, Accessibility |
| **qa-tester** | skill | Test planning, E2E, Security testing |
| **lead-architect** | skill | System design, ADRs, RFCs |

### Management

| Skill | Type | Description |
|:------|:-----|:------------|
| **project-manager** | skill | Roadmaps, PRDs, Prioritization |
| **business-analysis** | skill | Requirements, User stories |
| **marketer** | skill | Content, SEO, Growth |

### Capabilities

| Skill | Type | Description |
|:------|:-----|:------------|
| **remotion-best-practices** | capability | Video creation with Remotion |

---

## 🔄 Workflows

Automated workflows for common development tasks:

| Workflow | Use When |
|:---------|:---------|
| **`/brainstorm`** | Starting a new project or feature |
| **`/break-tasks`** | Breaking PRD into actionable tasks |
| **`/implement-feature`** | End-to-end feature development |
| **`/development`** | Day-to-day coding tasks |
| **`/debug`** | Systematic bug investigation |
| **`/ui-ux-design`** | Transform requirements to designs |
| **`/documentation`** | Generate architecture/API docs |
| **`/gen-tests`** | Create test coverage |
| **`/qa`** | Test planning and execution |
| **`/bootstrap`** | Initialize new project structure |
| **`/custom-behavior`** | Customize agent rules |

---

## 🎯 Core Philosophy

> **Process over Speed**: This kit prioritizes robust processes, structure, and long-term maintainability over "fast shipping". It brings standard engineering practices to AI-assisted coding.

### Concepts

- **Skills = Knowledge** — What the agent knows (embedded in `SKILL.md` files)
- **Rules = Constraints** — How the agent must behave
- **Workflows = Processes** — Step-by-step execution patterns
- **Knowledge Graph = Relationships** — How skills connect and depend

---

## 🛠️ Advanced Usage

### Custom Entry Points

Instead of auto-detect, explicitly choose your starting point:

```bash
# Web development
npx @kienha/anti-chaotic init --skill react-nextjs

# Mobile app
npx @kienha/anti-chaotic init --skill mobile-developer

# AI-powered backend
npx @kienha/anti-chaotic init --skill ai-engineer

# Video generation
npx @kienha/anti-chaotic init --skill remotion-best-practices
```

### Context Budget Planning

Before installing, check the context cost:

```bash
$ npx @kienha/anti-chaotic resolve ai-engineer

📦 Resolution for [[ai-engineer]]
══════════════════════════════════════════════════
📝 Load Order:
  1. [[backend-developer]] (~2k tokens)
  2. [[ai-engineer]] (~1k tokens)
📊 Total: 2 skills, ~3k tokens
══════════════════════════════════════════════════
```

### Working with Suggestions

Skills can suggest related capabilities:

```bash
$ npx @kienha/anti-chaotic resolve mobile-developer --suggests

💡 Suggested:
  ○ [[react-nextjs]] — Shared patterns with Expo Router
  ○ [[backend-developer]] — For API integration
```

---

## 📁 Project Structure

```
.agent/
├── graph-index.json          # Auto-generated skill graph
├── skills-manifest.json      # Skill registry
├── skills/
│   ├── frontend-developer/
│   │   └── SKILL.md          # Skill definition + Knowledge Graph
│   ├── react-nextjs/
│   │   └── SKILL.md
│   └── mobile-developer/
│       ├── SKILL.md
│       └── api-routes/       # Sub-skills
├── mocs/
│   └── web-development-moc.md  # Domain hubs
├── rules/
│   └── *.md                  # Global rules
└── workflows/
    └── *.md                  # Reusable workflows
```

---

## 🔧 MCP Server Recommendations

For best results, install these MCP servers:

- **[sequence-thinking](https://github.com/axiom-team/mcp-server-sequence-thinking)** — Advanced problem breakdown
- **[context7](https://github.com/axiom-team/mcp-server-context7)** — Project context management

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Skill Authoring

Create new skills following the v2.0 format:

```markdown
---
name: my-skill
type: skill
domain: web
---

# My Skill

## Knowledge Graph
- **extends**: [[parent-skill]]
- **requires**: [[dependency]]
- **suggests**: [[optional-skill]]
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

<p align="center">
  <b>Made with ❤️ for the AI-Driven Development Community</b>
</p>
