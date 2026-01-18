# Security Testing Insights & Patterns

## Core Philosophy

**"Trust No Input"**
Assume every input field, header, and parameter is an attack vector. Security testing proactively seeks to exploit these vectors.

## Key Attack Vectors

1.  **XSS (Cross-Site Scripting)**:
    - **Insight**: Browsers execute scripts reflected from the server.
    - **Test**: Inject `<img src=x onerror=alert(1)>` into comments/profiles.
2.  **SQL Injection (SQLi)**:
    - **Insight**: Manipulating queries via input.
    - **Test**: Input `' OR '1'='1` in search bars or login forms.
3.  **IDOR (Insecure Direct Object References)**:
    - **Insight**: Changing an ID in the URL (`/orders/5`) to access another user's data (`/orders/6`).
    - **Test**: Login as User A, request User B's resource ID.

## Automation

- **SAST (Static Application Security Testing)**: Scan code for known vulnerabilities (e.g., `npm audit`, `SonarQube`).
- **DAST (Dynamic Application Security Testing)**: Attack the running app (e.g., `OWASP ZAP`).

## Checklist

- [ ] Are dependencies patched? (`npm audit`)
- [ ] Is Rate Limiting active?
- [ ] Are sensitive headers (Authorization) leaked in logs?
- [ ] Do 403 Forbidden errors leak implementation details?
