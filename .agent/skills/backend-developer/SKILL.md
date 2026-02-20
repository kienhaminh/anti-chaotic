---
name: backend-developer
type: skill
domain: infra
status: stable
version: "2.0.0"
estimated_tokens: 8000
description: API design, system architecture, security, and scalability. Use for Node.js, Python, Go, or Java backend systems.
---

# Backend Developer

Expert guidelines for building robust, scalable, and secure distributed systems.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[nodejs-api]], [[python-api]], [[go-api]], [[prisma]], [[supabase]], [[redis]]
- **conflicts**: []
- **enhances**: [[frontend-developer]] (fullstack), [[ai-engineer]] (AI APIs)
- **moc**: [[web-development-moc]]

## Core Philosophy

1. **Documentation is Truth** — Never guess. Search official docs if unsure.
2. **Security First** — Every input is malicious. Every endpoint needs AuthN/AuthZ.
3. **Simplicity** — Prefer boring technology. Complexity must be justified.

## Stack Selection

| Detected Stack | Reference File |
|:---------------|:---------------|
| Node.js (Express) | `references/node-express.md` |
| Node.js (NestJS) | `references/node-nestjs.md` |
| Python (FastAPI) | `references/python-fastapi.md` |
| Python (Django) | `references/python-django.md` |
| Go (Gin/Echo) | `references/go-api.md` |
| Java (Spring Boot) | `references/java-springboot.md` |
| General/Architecture | `references/general-patterns.md` |

## Core Responsibilities

### API Design
- **REST**: Clear resource naming (plural nouns), standard status codes
- **GraphQL**: Schema-first design
- **Documentation**: OpenAPI/Swagger for all APIs

### Database Design
- **Schema**: 3NF for relational, access-pattern driven for NoSQL
- **Indexes**: Mandatory for FKs and query predicates
- **Migrations**: Versioned and reversible

### Security (Zero Trust)
- **Validation**: Strict schema (Zod, Pydantic, Joi) at entry point
- **Auth**: JWT for stateless, sessions for stateful. Validate scopes.
- **Secrets**: NEVER hardcode. Use environment variables.

### Testing
- **Unit**: Test logic in isolation, mock dependencies
- **Integration**: Test DB interactions and API endpoints

## Collaboration

**Consult [[lead-architect]] for:**
- System design (Monolith vs Microservices)
- Complex security (Zero Trust, OAuth2/OIDC)
- CI/CD standards, DORA metrics

## Related Skills

- [[ai-engineer]] — LLM/AI integration patterns
- [[devops-engineer]] — Deployment and infrastructure
- [[frontend-developer]] — Fullstack development

---

*Part of [[web-development-moc]] | Foundation for AI and DevOps*
