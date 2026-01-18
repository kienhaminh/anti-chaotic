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

## 🔄 Automated Workflows

| Workflow                           | Description                                                                                                   | Use Case                                                                        |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------ |
| **`/requirement-analysis`**        | Analyzes raw requirements and generates detailed documentation (Roadmap, PRD, SDD, Epics, User Stories).      | Start of a new project or feature when you only have a rough idea.              |
| **`/generate-docs-from-codebase`** | Scans the current codebase and generates comprehensive documentation (Architecture, API, Schema).             | Onboarding to a legacy project or updating docs after development.              |
| **`/ui-ux-design-from-doc`**       | Transforms PRD/requirements documents into UI/UX design specifications, design systems, and visual artifacts. | After requirements are finalized, before coding.                                |
| **`/workflow-rule-from-codebase`** | Analyzes the codebase to identify patterns and conventions, creating a project-specific rules file.           | Establishing coding standards for a new or existing team.                       |
| **`/workflow-rule-from-feedback`** | Updates or creates rules based on user feedback to prevent recurring AI errors.                               | When the Agent makes repeated mistakes or you want to enforce a new preference. |

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
