# Codebase Normalization & Quality Gates

This guide outlines standards and instructions for implementing codebase normalization tools to ensure code quality, consistency, and stability.

## 🧰 Toolchain Selection

| Feature            | Husky + Lint-staged            | Lefthook                             | Biome                           | ESLint + Prettier              |
| :----------------- | :----------------------------- | :----------------------------------- | :------------------------------ | :----------------------------- |
| **Role**           | Git Hooks Manager              | Git Hooks Manager                    | Formatter + Linter              | Linter + Formatter             |
| **Speed**          | Standard                       | Fast (Go-based)                      | Extremely Fast (Rust)           | Standard                       |
| **Usage**          | Industry Standard for Node.js  | Growing popularity, multi-language   | Modern, zero-config replacement | Mature, vast ecosystem         |
| **Recommendation** | **Default** for JS/TS projects | Projects with heavy pre-commit tasks | Greenfields needing speed       | Legacy or complex custom rules |

## 🚀 Implementation Guides

### 1. Husky & Lint-staged (Standard)

Use this setup to enforce checks before every commit.

```bash
# 1. Install dependencies
npm install --save-dev husky lint-staged

# 2. Initialize Husky
npx husky init

# 3. Configure lint-staged in package.json
# Add this to your package.json
"lint-staged": {
  "*.{js,ts,jsx,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}

# 4. Create pre-commit hook
# In .husky/pre-commit
echo "npx lint-staged" > .husky/pre-commit
```

### 2. Commitlint (Conventional Commits)

Enforce meaningful commit messages.

```bash
# 1. Install dependencies
npm install --save-dev @commitlint/{cli,config-conventional}

# 2. Configure Commitlint
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# 3. Add commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

### 3. Biome (All-in-one Alternative)

Replace ESLint & Prettier for performance.

```bash
# 1. Install Biome
npm install --save-dev --save-exact @biomejs/biome

# 2. Initialize
npx @biomejs/biome init

# 3. Use in lint-staged
"lint-staged": {
  "*.{js,ts,jsx,tsx,json}": [
    "npx @biomejs/biome check --apply"
  ]
}
```

## 🏗️ Workflow Integration

### Pre-commit Strategy

- **Goal**: Prevent bad code from entering the repo.
- **Scope**: Run ONLY on staged files (don't lint the whole repo).
- **Checks**:
  - Linting (ESLint/Biome)
  - Formatting (Prettier/Biome)
  - Type Checking (tsc --noEmit) -> _Note: tsc often needs the whole project, consider running in CI instead or using `tsc-files` for partial checks._
  - Unit Tests (related files only)

### CI Strategy

- **Goal**: Verify state of the branch.
- **Scope**: Run on all files.
- **Checks**:
  - Full Lint
  - Full Type Check
  - Full Audit (`npm audit`)
  - Integration/E2E tests

## 🛡️ Best Practices

1.  **Keep Hooks Fast**: Developers hate waiting. If pre-commit takes >5s, move heavy tasks to CI.
2.  **Escape Hatches**: Allow `--no-verify` for emergencies, but log it.
3.  **Consistency**: Ensure local checks match CI checks exactly.
