---
description: Generate comprehensive documentation from existing codebase (Architecture, API, Specs).
---

# Workflow: Generate Documentation from Codebase

Use this workflow to automatically generate structured documentation from an existing codebase. This workflow follows the project's **documentation rule** (`documentation.md`) to ensure proper folder structure and knowledge graph linking.

## Prerequisites

- The `docs/` folder structure should exist (or will be created based on `documentation.md` rule).
- Agent should understand the project's tech stack.

---

## Step 1: Codebase Discovery & Analysis

**Goal**: Understand the project structure, tech stack, and architecture.

// turbo

1. **Read Configuration Files**:
   - `package.json` / `pyproject.toml` / `go.mod` (dependencies & scripts)
   - `tsconfig.json` / `drizzle.config.ts` / `vite.config.ts` (build config)
   - `.env.example` (environment variables)

2. **Analyze Folder Structure**:
   - Run `list_dir` on root, `app/` or `src/`, `db/` or `schema/`
   - Identify patterns: routes, components, services, models

3. **Identify Key Components**:
   - Entry points (`main.ts`, `index.ts`, `app/root.tsx`)
   - API routes (`app/routes/api/`, `app/api/`)
   - Database schemas (`app/db/schema/`, `prisma/schema.prisma`)
   - Shared utilities and types

**Output**: Mental map of the codebase structure.

---

## Step 2: Determine Documentation Scope

**Goal**: Decide which documentation types to generate based on analysis.

// turbo

Ask the user which documentation to generate (or generate all by default):

| Doc Type                | Target Folder                  | Description                              |
| ----------------------- | ------------------------------ | ---------------------------------------- |
| **System Architecture** | `docs/030-Specs/Architecture/` | C4 diagrams, component relationships     |
| **API Documentation**   | `docs/030-Specs/API/`          | Endpoint specs, request/response schemas |
| **Database Schema**     | `docs/030-Specs/Schema/`       | Entity descriptions, relationships       |
| **Component Reference** | `docs/030-Specs/Components/`   | Frontend component documentation         |
| **Technical Overview**  | `docs/030-Specs/`              | High-level technical summary             |

**Output**: List of documentation targets to generate.

---

## Step 3: Generate System Architecture Documentation

**Role**: Lead Architect (use `lead-architect` skill if complex)

// turbo

1. **Create Architecture Overview**:
   - File: `docs/030-Specs/Architecture/System-Context.md`
   - Include: Technology stack, deployment targets, external integrations
   - Generate: C4 Context Diagram (Mermaid)

2. **Create Component Diagram**:
   - File: `docs/030-Specs/Architecture/Component-View.md`
   - Include: Major components and their interactions
   - Generate: C4 Component Diagram (Mermaid)

3. **Document Data Flow**:
   - File: `docs/030-Specs/Architecture/Data-Flow.md`
   - Include: Request lifecycle, data transformation points

**Template**:

```markdown
---
id: ARCH-001
type: architecture
status: generated
created: { DATE }
tags: [architecture, c4, system-design]
---

# System Architecture Overview

## Context Diagram

\`\`\`mermaid
C4Context
title System Context Diagram
Person(user, "User", "End user of the system")
System(app, "Application", "The main application")
System_Ext(db, "Database", "Data persistence")
\`\`\`

## Technology Stack

- **Frontend**: {framework}
- **Backend**: {runtime}
- **Database**: {database}
- **Hosting**: {platform}

## Key Architectural Decisions

1. ...
```

---

## Step 4: Generate API Documentation

**Goal**: Document all API endpoints with request/response schemas.

// turbo

1. **Scan API Routes**:
   - Find all route handlers in `app/routes/api/` or equivalent
   - Extract: method, path, parameters, response types

2. **Generate Endpoint Docs**:
   - Create one file per major API resource
   - Location: `docs/030-Specs/API/`
   - Naming: `Endpoint-{Resource}-{Action}.md`

3. **Create API Index**:
   - File: `docs/030-Specs/API/API-Standards.md`
   - Include: Base URL, authentication, common patterns

**Template**:

```markdown
---
id: API-{NUMBER}
type: api-spec
status: generated
created: { DATE }
tags: [api, { resource }]
---

# API: {Resource Name}

## Endpoints

### `{METHOD} {PATH}`

**Description**: {what this endpoint does}

**Authentication**: Required / Public

**Request**:
\`\`\`typescript
// Request body type
interface Request {
field: type;
}
\`\`\`

**Response**:
\`\`\`typescript
// Response type
interface Response {
data: type;
}
\`\`\`

**Example**:
\`\`\`bash
curl -X {METHOD} {BASE_URL}{PATH} \
 -H "Authorization: Bearer $TOKEN" \
 -d '{"field": "value"}'
\`\`\`
```

---

## Step 5: Generate Database Schema Documentation

**Goal**: Document database entities and relationships.

// turbo

1. **Scan Schema Definitions**:
   - Drizzle: `app/db/schema/*.ts`
   - Prisma: `prisma/schema.prisma`
   - Raw SQL: `migrations/`

2. **Generate Entity Docs**:
   - Location: `docs/030-Specs/Schema/`
   - Naming: `DB-Entity-{TableName}.md`

3. **Create ERD**:
   - File: `docs/030-Specs/Schema/ERD.md`
   - Generate: Mermaid ER Diagram

**Template**:

```markdown
---
id: DB-{NUMBER}
type: schema
status: generated
created: { DATE }
tags: [database, { table_name }]
---

# Entity: {TableName}

## Description

{Purpose of this table}

## Schema

| Column | Type | Nullable | Default           | Description |
| ------ | ---- | -------- | ----------------- | ----------- |
| id     | uuid | No       | gen_random_uuid() | Primary key |
| ...    | ...  | ...      | ...               | ...         |

## Relationships

- **belongs_to**: [[DB-Entity-{Parent}]]
- **has_many**: [[DB-Entity-{Child}]]

## Indexes

- `idx_{table}_{column}` - {purpose}
```

---

## Step 6: Generate MOC (Map of Content) Files

**Goal**: Create index files for navigation.

// turbo

1. **Create Specs MOC**:
   - File: `docs/030-Specs/Specs-MOC.md`
   - Link to all generated specs

2. **Update Main Index**:
   - File: `docs/000-Index.md`
   - Add links to new documentation

**Template**:

```markdown
---
id: MOC-030
type: moc
status: active
created: { DATE }
---

# Specifications (Map of Content)

## Architecture

- [[System-Context]] - High-level system overview
- [[Component-View]] - Internal component structure
- [[Data-Flow]] - Request/response lifecycle

## API

- [[API-Standards]] - API conventions and authentication
- [[Endpoint-Users]] - User management endpoints
- ...

## Database Schema

- [[ERD]] - Entity relationship diagram
- [[DB-Entity-User]] - User table schema
- ...
```

---

## Step 7: Validation & Linking

**Goal**: Ensure generated documentation is complete and properly linked.

// turbo

1. **Check Frontmatter**: All files must have YAML frontmatter with required fields.
2. **Verify Links**: All `[[Wiki-links]]` should point to existing files.
3. **Cross-Reference**: Technical specs should link to related requirements if they exist.

**Validation Checklist**:

- [ ] All docs have `id`, `type`, `status`, `created` in frontmatter
- [ ] MOC files link to all related documents
- [ ] Mermaid diagrams render correctly
- [ ] No broken wiki-links

---

## Step 8: Summary & Next Steps

// turbo

1. **Report Generated Files**: List all created documentation files.
2. **Suggest Improvements**:
   - Missing documentation areas
   - Outdated sections that need manual review
3. **Recommend Follow-ups**:
   - Run `/ui-ux-design-from-doc` if design docs are needed
   - Run `/requirement-analysis` for new features

**Output Example**:

```
✅ Documentation generated successfully!

📁 Files Created:
- docs/030-Specs/Architecture/System-Context.md
- docs/030-Specs/Architecture/Component-View.md
- docs/030-Specs/API/API-Standards.md
- docs/030-Specs/API/Endpoint-Users.md
- docs/030-Specs/Schema/ERD.md
- docs/030-Specs/Schema/DB-Entity-User.md
- docs/030-Specs/Specs-MOC.md

🔗 Next Steps:
- Review generated docs for accuracy
- Add missing business context to architecture docs
- Link specs to existing requirements
```
