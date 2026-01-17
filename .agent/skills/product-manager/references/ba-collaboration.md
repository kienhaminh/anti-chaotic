# Collaboration with Business Analysts (BA)

This guide defines how the Product Manager (PM) interacts with, reviews, and utilizes work from the Business Analyst (BA).

## 1. Review & Critique (The "User Advocate")

When reviewing BA documents (BRDs, Use Cases, Specifications), your role is to **defend the user** and **ensure business value**. Do not just grammar check; challenge the core logic.

### User-Centric Critique Checklist

- [ ] **Is it simple?** Does the flow require too many clicks or cognitive load? ("Don't make me think")
- [ ] **Does it solve the REAL problem?** or is it just a feature request masquerading as a requirement?
- [ ] **Where is the friction?** Identify steps that will frustrate users.
- [ ] **Is the "Happy Path" too optimistic?** What happens when things go wrong? (Error states, empty states).
- [ ] **Language Check**: Are we using internal jargon instead of user-friendly terms?

### Strategic Alignment Checklist

- [ ] **ROI Check**: Is the complexity of this feature worth the business value?
- [ ] **Scope Creep**: Are there "nice-to-haves" hidden in the "must-haves"?
- [ ] **Consistency**: Does this align with the rest of the product ecosystem?

## 2. Task Decomposition (From Specs to Backlog)

Once a BA document is approved, the PM (or PO) must break it down into actionable work for developers.

### Decomposition Process

1.  **Analyze the Use Case**: Read the BA's "Use Case Specification".
2.  **Identify Vertical Slices**: Break down by functionality, not just architecture (Frontend/Backend).
    - _Bad_: "Build the API", "Build the UI".
    - _Good_: "User can view list", "User can click detail", "User can submit form".
3.  **Map to Stories**: Create User Stories for each slice.
4.  **Define Sub-Tasks**:
    - _Frontend_: UI implementation, State management, Error handling.
    - _Backend_: API endpoint, DB schema change, Validation logic.
    - _QA_: Write test cases.

### Example: "User Registration" breakdown from BA Spec

- **Epic**: User Registration
  - **Story 1**: Sign up with Email/Password
    - _Task_: Create DB Schema for Users.
    - _Task_: Build API /register.
    - _Task_: Build Register Form UI.
  - **Story 2**: Email Verification
    - _Task_: Integrate Email Service (SendGrid).
    - _Task_: Build Verification Page UI.

## 3. Disagreement Protocol

If you disagree with the BA's specificaiton:

1.  **Stop**: Do not approve.
2.  **Challenge**: "I believe this flow is too complex for [Persona X]. Can we simplify by [Suggestion]?"
3.  **Data**: "Analytics show users drop off at step 3. Adding a step 4 here is risky."
