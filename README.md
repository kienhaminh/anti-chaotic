# 🚀 Anti-Chaotic Agent Kit

> **The Unified Agent Kit for AI-Driven Development** - A comprehensive toolkit for software development powered by AI Agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 🎯 Introduction

**Anti-Chaotic** is a comprehensive **Agent Kit** for Antigravity, designed to standardize and optimize your software development workflow. It serves as a versatile toolkit rather than a rigid framework:

- 🧠 **12+ Multi-domain AI Skills** - From Product Manager, Business Analyst to Lead Architect, DevOps Engineer
- 🔄 **5 Automated Workflows** - Pre-defined, reusable work processes
- 📜 **Rules Engine** - A rule system that ensures AI Agents follow project standards
- 📚 **References Library** - Documentation references for various technologies and frameworks

---

## ✨ Key Features

### 🎭 AI Skills (12 Virtual Experts)

| Skill                   | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| **product-manager**     | Product management, roadmap, RICE/Kano prioritization |
| **business-analysis**   | Business analysis, user stories, use cases            |
| **lead-architect**      | System architecture, ADR, RFC, technical specs        |
| **designer**            | UI/UX design, design systems, accessibility           |
| **frontend-developer**  | React, Vue, Angular, performance optimization         |
| **backend-developer**   | Node, Python, Go, Java - API design, security         |
| **devops-engineer**     | CI/CD, multi-cloud, observability                     |
| **qa-tester**           | Test planning, unit/E2E/security testing              |
| **ai-engineer**         | RAG pipelines, prompt engineering, AI integration     |
| **blockchain-engineer** | Smart contracts, Web3, decentralized protocols        |
| **rules-workflows**     | Create and manage rules, workflows                    |
| **skill-creator**       | Create new skills for the framework                   |

### 🔄 Automated Workflows

| Workflow                       | Description                                   | Trigger                      |
| ------------------------------ | --------------------------------------------- | ---------------------------- |
| `/requirement-analysis`        | Analyze requirements → PRD, SDD, User Stories | Starting a new project       |
| `/generate-docs-from-codebase` | Generate documentation from existing code     | Project without docs         |
| `/ui-ux-design-from-doc`       | Transform requirements → UI/UX design         | After having PRD             |
| `/workflow-rule-from-codebase` | Create project rules from code                | Onboarding to a project      |
| `/workflow-rule-from-feedback` | Update rules based on feedback                | Fixing recurring AI mistakes |

### 📜 Smart Rules Engine

- **Documentation Rules**: Standard document structure and formatting
- **Clean Code Rules**: Coding standards and best practices
- **Project Rules**: Project-specific conventions

---

## 📁 Directory Structure

```
anti-chaotic/
├── .agent/
│   ├── skills/           # 12 AI skills with detailed instructions
│   │   ├── product-manager/
│   │   ├── business-analysis/
│   │   ├── lead-architect/
│   │   ├── designer/
│   │   ├── frontend-developer/
│   │   ├── backend-developer/
│   │   ├── devops-engineer/
│   │   ├── qa-tester/
│   │   ├── ai-engineer/
│   │   ├── blockchain-engineer/
│   │   ├── rules-workflows/
│   │   └── skill-creator/
│   ├── workflows/        # Automated workflows
│   │   ├── requirement-analysis.md
│   │   ├── generate-docs-from-codebase.md
│   │   ├── ui-ux-design-from-doc.md
│   │   ├── workflow-rule-from-codebase.md
│   │   └── workflow-rule-from-feedback.md
│   └── rules/            # Project & documentation rules
│       ├── documentation.md
│       └── clean-code.md
├── bin/                  # CLI utilities
├── docs/                 # Generated documentation
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/kienhaminh/anti-chaotic.git
cd anti-chaotic
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Using the Framework

#### Start a new project with AI:

```
/requirement-analysis Create a sales management application for a fashion store
```

#### Generate docs for an existing project:

```
/generate-docs-from-codebase
```

#### Design UI from requirements:

```
/ui-ux-design-from-doc docs/020-Requirements/PRD-YourProject.md
```

---

## 📖 Workflow Guide

### How to Use Workflows

**Method 1: Slash Command**

```
/requirement-analysis [Your project description]
```

**Method 2: Direct Request**

```
Please run the requirement-analysis workflow to analyze requirements for an e-commerce project
```

**Method 3: File Reference**

```
Read and execute the workflow at .agent/workflows/requirement-analysis.md
```

### Special Annotations

| Annotation     | Meaning                                  |
| -------------- | ---------------------------------------- |
| `// turbo`     | Auto-run this step without user approval |
| `// turbo-all` | Auto-run ALL steps in the workflow       |

---

## 🔗 Workflow Chaining

Workflows can be chained together to create a complete process:

```
┌──────────────────────────────────────────────────────────────┐
│                    🔄 FULL PROJECT LIFECYCLE                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. /requirement-analysis                                    │
│     │                                                        │
│     ▼                                                        │
│  2. /ui-ux-design-from-doc (with the generated PRD)          │
│     │                                                        │
│     ▼                                                        │
│  3. [Development Phase - implement code]                     │
│     │                                                        │
│     ▼                                                        │
│  4. /generate-docs-from-codebase                             │
│     │                                                        │
│     ▼                                                        │
│  5. /workflow-rule-from-feedback (if needed)                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎓 Workflow Details

### `/requirement-analysis`

> **Description**: Analyze requirements from raw ideas → complete documentation

#### 🎯 When to Use?

- Starting a new project from scratch
- Converting ideas into technical documentation
- Need to create PRD, SDD, Epics, User Stories

#### 📊 Process Flow

```
┌─────────────────────────────────────────────────────┐
│ Step 0: Clarification & Understanding (PM)          │
│         → Create clarification-questions.md         │
├─────────────────────────────────────────────────────┤
│ Step 1: Create Roadmap (PM)                         │
│         → docs/010-Planning/Roadmap-{Project}.md    │
├─────────────────────────────────────────────────────┤
│ Step 2: Create PRD (PM)                             │
│         → docs/020-Requirements/PRD-{Project}.md    │
├─────────────────────────────────────────────────────┤
│ Step 3: Create SDD (Architect)                      │
│         → docs/030-Specs/Architecture/SDD-{...}.md  │
├─────────────────────────────────────────────────────┤
│ Step 4: Create Epics (BA)                           │
│         → docs/022-User-Stories/Epics/*.md          │
├─────────────────────────────────────────────────────┤
│ Step 5: Create Use Cases (BA)                       │
│         → docs/020-Requirements/Use-Cases/*.md      │
├─────────────────────────────────────────────────────┤
│ Step 6: Create User Stories (BA)                    │
│         → docs/022-User-Stories/Backlog/*.md        │
├─────────────────────────────────────────────────────┤
│ Step 7: Create ADRs (Architect) - Optional          │
│         → docs/030-Specs/Architecture/ADR-*.md      │
├─────────────────────────────────────────────────────┤
│ Step 8: Finalize & Summary (PM)                     │
│         → Update MOC files & Index                  │
└─────────────────────────────────────────────────────┘
```

#### 💡 Example

```
/requirement-analysis Create a personal finance management app with features:
- Income/expense tracking
- Budget planning
- Analytics reports
- Bank synchronization
```

---

### `/generate-docs-from-codebase`

> **Description**: Automatically generate documentation from an existing codebase

#### 🎯 When to Use?

- Onboarding to an existing project without documentation
- Updating docs after significant code changes
- Need to create API docs, schema docs, architecture overview

#### 📊 Process Flow

```
┌─────────────────────────────────────────────────────┐
│ Step 1: Codebase Discovery & Analysis               │
│         → Scan package.json, config files           │
│         → Analyze folder structure                  │
├─────────────────────────────────────────────────────┤
│ Step 2: Determine Documentation Scope               │
│         → Choose: Architecture, API, Schema, etc.   │
├─────────────────────────────────────────────────────┤
│ Step 3: Generate System Architecture                │
│         → C4 diagrams, component relationships      │
├─────────────────────────────────────────────────────┤
│ Step 4: Generate API Documentation                  │
│         → Endpoint specs, request/response schemas  │
├─────────────────────────────────────────────────────┤
│ Step 5: Generate Database Schema Documentation      │
│         → Entity descriptions, ERD diagram          │
├─────────────────────────────────────────────────────┤
│ Step 6: Generate MOC Files                          │
│         → Index files for navigation                │
├─────────────────────────────────────────────────────┤
│ Step 7: Validation & Linking                        │
│         → Check frontmatter, wiki-links             │
├─────────────────────────────────────────────────────┤
│ Step 8: Summary & Next Steps                        │
│         → Report generated files                    │
└─────────────────────────────────────────────────────┘
```

#### 💡 Example

```
/generate-docs-from-codebase

Or specify a specific scope:
/generate-docs-from-codebase Only create API documentation and Database Schema
```

---

### `/ui-ux-design-from-doc`

> **Description**: Transform requirements documents into UI/UX designs

#### 🎯 When to Use?

- Already have PRD/requirements and need interface design
- Need to create a design system for the project
- Want to quickly prototype main screens

#### 📊 Process Flow

```
┌─────────────────────────────────────────────────────┐
│ Step 1: Analyze Requirements                        │
│         → Extract target audience, features         │
├─────────────────────────────────────────────────────┤
│ Step 2: Define Design System                        │
│         → Typography, colors, spacing               │
├─────────────────────────────────────────────────────┤
│ Step 3: Map User Flows                              │
│         → Critical paths, screen sequences          │
├─────────────────────────────────────────────────────┤
│ Step 4: Create Visual Artifacts                     │
│         → Components, page layouts                  │
├─────────────────────────────────────────────────────┤
│ Step 5: Verification                                │
│         → Req check, usability check                │
└─────────────────────────────────────────────────────┘
```

#### 💡 Example

```
/ui-ux-design-from-doc docs/020-Requirements/PRD-ShopManagement.md
```

---

### `/workflow-rule-from-codebase`

> **Description**: Analyze codebase to create project rules file

#### 🎯 When to Use?

- Newly joining an existing project
- Want AI Agent to "learn" project conventions
- Need to document coding standards

#### 📊 Process Flow

```
┌─────────────────────────────────────────────────────┐
│ Step 1: Discovery Scan                              │
│         → Read config, analyze structure            │
├─────────────────────────────────────────────────────┤
│ Step 2: Synthesize Observations                     │
│         → Tech stack, conventions, directories      │
├─────────────────────────────────────────────────────┤
│ Step 3: Create Project Rules                        │
│         → .agent/rules/project-rules.md             │
├─────────────────────────────────────────────────────┤
│ Step 4: Write the File                              │
│         → Save with standard format                 │
├─────────────────────────────────────────────────────┤
│ Step 5: Validation                                  │
│         → Check alignment with package.json         │
└─────────────────────────────────────────────────────┘
```

#### 💡 Example

```
/workflow-rule-from-codebase
```

---

### `/workflow-rule-from-feedback`

> **Description**: Create/update rules based on user feedback

#### 🎯 When to Use?

- Want AI Agent to remember a specific rule
- Fixing mistakes that AI frequently makes
- Adding preferences for the project

#### 📊 Process Flow

```
┌─────────────────────────────────────────────────────┐
│ Step 1: Analyze Feedback & Existing Rules           │
│         → Check conflicts, determine action         │
├─────────────────────────────────────────────────────┤
│ Step 2: Determine Target Rule File                  │
│         → project-rules.md or new file?             │
├─────────────────────────────────────────────────────┤
│ Step 3: Update Project Content                      │
│         → Append/update the rule                    │
├─────────────────────────────────────────────────────┤
│ Step 4: Write the File                              │
│         → Save changes                              │
├─────────────────────────────────────────────────────┤
│ Step 5: Confirmation                                │
│         → Notify user                               │
└─────────────────────────────────────────────────────┘
```

#### 💡 Example

```
/workflow-rule-from-feedback Always use Zod for validation instead of Yup

/workflow-rule-from-feedback Never use any type in TypeScript
```

---

## 💡 Tips & Best Practices

### ✅ Do's

1. **Read output carefully before approving** - Each step has a checkpoint for review
2. **Use artifacts for comments** - AI will create draft files for you to review first
3. **Provide complete context** - Describe requirements in detail from the start
4. **Chain workflows** - Combine multiple workflows for a complete process

### ❌ Don'ts

1. **Skip clarification step** - The clarification step is crucial
2. **Approve without reading** - Always review before confirming
3. **Run inappropriate workflows** - Choose the right workflow for the right use case

### 🔧 Troubleshooting

| Issue                      | Solution                                      |
| -------------------------- | --------------------------------------------- |
| Workflow doesn't run       | Check slash command syntax                    |
| Output has wrong format    | Ensure `.agent/rules/documentation.md` exists |
| AI asks too many questions | Provide more context in the initial request   |

---

## 🤝 Contributing

We welcome all contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📚 Additional Resources

- **Documentation Rules**: `.agent/rules/documentation.md`
- **Available Skills**: `.agent/skills/`
- **Project Rules**: `.agent/rules/project-rules.md` (if exists)
- **Agent Skills Specification**: [agentskills.io/specification](https://agentskills.io/specification)

---

## 📄 License

This project is released under the [MIT License](LICENSE).

---

<p align="center">
  <b>Made with ❤️ for the AI-Driven Development Community</b>
</p>

> 💡 **Tip**: You can create new workflows by adding `.md` files in the `.agent/workflows/` directory following the same structure as existing workflows.
