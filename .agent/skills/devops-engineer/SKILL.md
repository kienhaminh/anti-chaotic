---
name: devops-engineer
type: skill
domain: infra
status: stable
version: "2.0.0"
estimated_tokens: 6000
description: CI/CD, multi-cloud infrastructure, and observability. Use for AWS/GCP/Azure, Docker, Kubernetes, and SRE practices.
---

# DevOps Engineer

Infrastructure automation, deployment pipelines, and observability systems.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: []
- **conflicts**: []
- **enhances**: [[backend-developer]], [[mobile-developer]] (EAS CI/CD)
- **moc**: [[infrastructure-moc]]

## Capability Add-ons

| Sub-capability | Location | Use For |
|:---------------|:---------|:--------|
| Docker Compose | `docker-compose/` | Local development environments |
| Kubernetes | Load `kubernetes/` reference | Container orchestration |
| Observability | Load `observability/` reference | Monitoring & logging |

## Using Sub-capabilities

When a task requires Docker Compose expertise:

1. Load `docker-compose/README.md` from this skill directory
2. Apply patterns for multi-container local development
3. Reference docker-compose.yml examples provided

Example workflow:
```
User: "Set up local dev environment with Postgres and Redis"
→ Load devops-engineer/docker-compose/README.md
→ Define services, volumes, networks
→ Provide docker-compose.yml configuration
```

## Core Philosophy

1. **Automate Everything** — If done twice, script it
2. **Infrastructure as Code** — No click-ops (Terraform, Pulumi)
3. **Security First** — Secrets via Vault/KMS, not env vars
4. **Observability** — Logs, Metrics, Traces are mandatory

## Stack Selection

| Component | Options | Best For |
|:----------|:--------|:---------|
| **Cloud** | AWS / GCP / Azure | AWS=Enterprise, GCP=Data/AI, Azure=Windows |
| **IaC** | Terraform / Pulumi / CDK | TF=Standard, Pulumi=Dev-friendly |
| **CI/CD** | GitHub Actions / GitLab CI / Jenkins | GHA=Open Source, GitLab=DevSecOps |
| **Containers** | Docker / Kubernetes | Docker=Simple, K8s=Orchestration |
| **Observability** | Datadog / Grafana / CloudWatch | Full stack monitoring |

## Security Standards

- **Least Privilege** — IAM strictly scoped
- **Encryption** — At rest (KMS) and in transit (TLS 1.2+)
- **Scanning** — SAST, DAST, Container scanning (Trivy)

## References

- `cloud-providers.md` — AWS/GCP/Azure specifics
- `iac-tools.md` — Terraform/Pulumi patterns
- `ci-cd-pipelines.md` — Pipeline design
- `container-orchestration.md` — Docker/Kubernetes
- `observability-security.md` — Monitoring, logging

## Related Skills

- [[backend-developer]] — Application deployment
- [[mobile-developer]] — EAS CI/CD for mobile
- [[lead-architect]] — High-level infrastructure decisions

---

*Part of [[infrastructure-moc]] | Foundation for all deployments*
