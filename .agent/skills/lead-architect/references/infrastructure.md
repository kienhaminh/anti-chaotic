# Infrastructure Guide

This guide defines the standards for cloud-native infrastructure, security, and observability.

## Cloud Native Patterns

### Container Orchestration (Kubernetes)

- **Immutable Infrastructure**: Never patch running servers. Build new images and replace.
- **Sidecar Pattern**: Attach auxiliary tasks (logging, proxy, auth) to a main container (e.g., Envoy).
- **Operator Pattern**: Codify operational knowledge to automate application lifecycle management.

### Serverless

- **FaaS (Function as a Service)**: AWS Lambda, Google Cloud Functions.
  - _Best for_: Event-driven workloads, "glue" code, sporadic traffic.
- **Serverless Containers**: AWS Fargate, Google Cloud Run.
  - _Best for_: HTTP services, existing containerized apps, easier developer experience.

## Infrastructure as Code (IaC)

- **Declarative vs. Imperative**: "What I want" (Terraform/K8s manifests) vs. "How to do it" (Shell scripts). Always prefer **Declarative**.
- **GitOps**: Git repository as the single source of truth for infrastructure state (e.g., ArgoCD).
- **Tools**:
  - **Terraform/OpenTofu**: Industry standard, vast provider ecosystem.
  - **Pulumi**: Use programming languages (TS/Python) for infrastructure. Good for complex logic.
  - **Crossplane**: Manage cloud resources using Kubernetes APIs.

## Security (Zero Trust)

- **Principles**:
  - **Verify Explicitly**: Authenticate and authorize every request based on all data points (identity, location, device health).
  - **Least Privilege**: JIT/JEA (Just-In-Time/Just-Enough-Administration). Limit access to only what is needed.
  - **Assume Breach**: Design assuming an attacker is already inside the network. Use micro-segmentation.
- **IAM (Identity & Access Management)**: Centralize identity (OIDC, SAML). Avoid long-lived keys; use short-lived tokens/roles.

## Observability

Move beyond "Monitoring" (is it up?) to "Observability" (why is it broken?).

### The Pillars (MELT)

1.  **Metrics**: Aggregates, counts, gauges. (Prometheus/Grafana). "What is happening?"
2.  **Events**: Discrete changes. Deployments, scaling events, alerts.
3.  **Logs**: Structured text records. (ELK, Loki). "Details of distinct events."
4.  **Traces**: Lifecycle of a request across services. (Jaeger, Zipkin, OpenTelemetry). "Where is the latency?"

### OpenTelemetry (OTel)

- Standardize instrumentation. Avoid vendor lock-in for data collection.
- Use OTel collectors to route telemetry data to backend analysis tools.
