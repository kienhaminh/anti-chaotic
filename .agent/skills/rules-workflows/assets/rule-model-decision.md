---
trigger: model_decision
description: Apply when working with authentication, authorization, or security-related features
---

# Security Guidelines

> **Activation**: This rule is automatically applied when the model detects security-related work based on the description above.

## Authentication Requirements

- Use secure password hashing (bcrypt, argon2)
- Implement rate limiting on login endpoints
- Use HTTP-only cookies for session tokens
- Validate JWT tokens on every protected route

## Authorization Patterns

- Implement Row Level Security (RLS) in database
- Check user permissions before data access
- Use RBAC (Role-Based Access Control) consistently
- Log all authorization failures

## Data Protection

- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Sanitize all user inputs
- Never log sensitive information (passwords, tokens)

## Security Headers

```typescript
// Required security headers
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Strict-Transport-Security': 'max-age=31536000',
  'Content-Security-Policy': "default-src 'self'"
}
```

## Vulnerability Prevention

| Threat            | Prevention                        |
| ----------------- | --------------------------------- |
| SQL Injection     | Use parameterized queries         |
| XSS               | Escape output, CSP headers        |
| CSRF              | Anti-CSRF tokens                  |
| Session Hijacking | HTTP-only cookies, secure flag    |
| IDOR              | Verify ownership on all resources |
