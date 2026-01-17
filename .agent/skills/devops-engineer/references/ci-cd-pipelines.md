# CI/CD Pipelines

## GitHub Actions

### Workflow Structure (`.github/workflows/main.yml`)

```yaml
name: Production Build
on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        env:
          API_KEY: ${{ secrets.PROD_API_KEY }}
        run: ./deploy.sh
```

### Best Practices

- **Secrets**: NEVER hardcode. Use `${{ secrets.NAME }}`.
- **Caching**: Use `setup-node` (or equivalent) built-in caching or `actions/cache`.
- **Reusable Workflows**: Use `workflow_call` for shared logic.

## GitLab CI

### Workflow Structure (`.gitlab-ci.yml`)

```yaml
stages:
  - test
  - build
  - deploy

test_job:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test

deploy_prod:
  stage: deploy
  script:
    - ./deploy.sh
  only:
    - main
  environment: production
```

### Best Practices

- **Templates**: Use `include:` to share config across projects.
- **Runners**: Tag jobs to run on specific runners (`tags: [docker]`).
- **Artifacts**: Use `artifacts` to pass binaries/files between stages.
