# Cross-Skill Collaboration Workflow

## 1. Interaction Model

The Business Analyst (BA) defines **WHAT** and **WHY**.

- The **Lead Architect** defines **HOW** (Backend/Data).
- The **Designer** defines **HOW** (Frontend/UX).
- The **Product Manager** approves **WHEN** (Scope/Roadmap).

## 2. Integration Points

### With `lead-architect`

- **Trigger**: When functional requirements need concrete technical details (Schema, API, Stack).
- **Prompt**:
  > "I have defined the User Stories for [Feature]. Acting as Lead Architect, please transform this into a Technical Specification, specifically defining the DB Schema and API Endpoints."
- **Validation**:
  - Does the Schema support the "Given" preconditions?
  - Do the API error codes cover the "Negative Paths"?

### With `designer`

- **Trigger**: When requirements involve user interaction (UI).
- **Prompt**:
  > "I have defined the User Flow for [Feature]. Acting as Designer, please propose a wireframe description or Component Hierarchy that meets these accessibility requirements."
- **Validation**:
  - Does the design include the "Empty States" identified?
  - Are verification steps (e.g., "Confirm Email") visible?

### With `product-manager`

- **Trigger**: When scope creep happens or priorities are unclear.
- **Prompt**:
  > "We identified 5 edge cases. Acting as Product Manager, should we include these in MVP or defer to Phase 2?"

## 3. Simulation Mode

If other skills are not explicitly active in the agent session, the BA must **simulate** their persona to generate complete specs.

- _Self-Correction_: "Speaking as the Architect, that query is too expensive. Let's denormalize..."
