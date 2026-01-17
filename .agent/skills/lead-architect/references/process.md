# Engineering Process Guide

This guide defines the workflows, metrics, and quality gates for high-performing engineering teams.

## DevOps & Delivery

### Continuous Integration (CI)

- **Pipeline as Code**: Define pipelines in YAML (GitHub Actions, GitLab CI).
- **Fast Feedback**: Unit tests and linters should run on every commit. Total CI time < 10 mins.
- **Trunk-Based Development**: Merge small, frequent changes to `main`. Avoid long-lived feature branches which delay integration pain.

### Continuous Deployment (CD)

- **Blue-Green Deployment**: Two identical environments. Switch traffic from Blue (old) to Green (new) instantly. Easy rollback.
- **Canary Release**: Roll out to small % of users first. Monitor metrics. Ramp up if healthy.
- **Feature Flags**: Decouple deployment from release. Deploy code behind a flag, toggle it on for users later.

## Metrics (DORA)

Optimize for the "Elite" cluster of DevOps Research and Assessment (DORA) metrics:

1.  **Deployment Frequency**: How often do we deploy? (Elite: On-demand / Multiple times per day).
2.  **Lead Time for Changes**: Time from commit to running in production. (Elite: < 1 hour).
3.  **Change Failure Rate**: % of deployments causing failure in production. (Elite: < 5%).
4.  **Time to Restore Service**: Time to recover from a failure. (Elite: < 1 hour).

## Code Review Standards

### Philosophy

- **Shared Ownership**: The reviewer is just as responsible for the code quality as the author.
- **Trust but Verify**: Trust the author's intent, verify the implementation details.
- **Blocking vs. Non-blocking**: Differentiate between "Must Fix" (bugs, spec violation) and "Nitpick" (style, minor pref).

### Checklist

1.  **Correctness**: Does it do what it says? Are edge cases handled?
2.  **Test Coverage**: Are there tests? Do they actually test the logic or just coverage?
3.  **Readability**: Is the variable naming clear? Is the complexity necessary?
4.  **Security/Performance**: Any obvious SQL injection, N+1 queries, or exposed secrets?
5.  **Architecture**: Does this fit the agreed-upon pattern? (e.g., Domain logic leaking into Controllers).
