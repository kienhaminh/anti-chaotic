---
trigger: manual
---

# Deep Code Review Guidelines

> **Usage**: Mention `@deep-code-review` in Agent's input box to activate this rule.

## Review Scope

- Security vulnerabilities
- Performance bottlenecks
- Code duplication
- Architectural violations

## Analysis Steps

1. **Security Audit**
   - Check for SQL injection vulnerabilities
   - Validate input sanitization
   - Review authentication flows

2. **Performance Review**
   - Identify N+1 queries
   - Check for unnecessary re-renders
   - Evaluate bundle size impact

3. **Code Quality**
   - Verify adherence to SOLID principles
   - Check test coverage
   - Review error handling patterns

## Output Format

Provide findings in this structure:

```
## 🔴 Critical Issues
[List with severity and fix recommendations]

## 🟡 Warnings
[Non-blocking but important]

## ✅ Good Practices Observed
[Positive feedback]
```
