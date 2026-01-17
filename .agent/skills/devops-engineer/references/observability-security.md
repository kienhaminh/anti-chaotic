# Observability & Security

## Observability (The 3 Pillars)

### 1. Logs

- **Structured Logging**: JSON over plain text.
  - Bad: `console.log("User login failed for " + user)`
  - Good: `logger.error({ event: "login_failed", user_id: 123 })`
- **Aggregation**: ELK Stack, Splunk, Datadog Logs.

### 2. Metrics

- **Golden Signals**:
  - **Latency**: Time it takes to serve a request.
  - **Traffic**: Demand placed on the system.
  - **Errors**: Rate of requests failing.
  - **Saturation**: How "full" the service is.
- **Tools**: Prometheus (collection) + Grafana (visualization).

### 3. Traces

- **Distributed Tracing**: Tracking a request across microservices.
- **Tools**: OpenTelemetry (Standard), Jaeger, Zipkin.

## Security (DevSecOps)

### Pipeline Integration

1.  **SAST (Static Application Security Testing)**: Scan source code.
    - _Tools_: SonarQube, CodeQL.
2.  **SCA (Software Composition Analysis)**: Scan dependencies.
    - _Tools_: `npm audit`, Snyk, Dependabot.
3.  **Container Scanning**:
    - _Tools_: Trivy, Clair.
4.  **DAST (Dynamic Application Security Testing)**: Scan running app.
    - _Tools_: OWASP ZAP.

### Secret Management

- **Vault Strategy**:
  - **Local**: `.env` (gitignored).
  - **CI/CD**: Repo Secrets.
  - **Runtime**: AWS Secrets Manager, HashiCorp Vault.
- **Scanning**: Use `git-secrets` or TruffleHog to prevent leaks.
