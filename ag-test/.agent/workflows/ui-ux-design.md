---
description: Transform a requirements document into a comprehensive UI/UX design.
---

# UI/UX Design Workflow

This workflow guides the process of creating a UI/UX design from a requirements document.

## Step 1: Analyze Requirements

**Goal**: Extract core design drivers from the input document.

1.  **Read the Document**: Use `read_file` or `view_file` to inspect the target requirements document.
2.  **Identify Key Elements**:
    - **Target Audience**: Who is this for?
    - **Problem Statement**: What are we solving?
    - **Core Features**: What functionality is required?
    - **Constraints**: Technical, brand, or platform limitations?
3.  **Synthesize**: Create a brief summary of the design goals.

## Step 2: Define Design System

**Goal**: Establish the visual language. **Prioritize the specific design requirements found in the document.**

1.  **Check Existing Codebase**:
    - Scan for existing styles (`app.css`, `tailwind.config.ts`, `globals.css`) or UI components.
    - **Condition**:
      - **IF Codebase has Design System**: Analyze and extract the current design system (tokens, colors, typography). Use this as the foundation. Then, apply specific user requirements or overrides from the document on top of this existing system.
      - **IF New/Empty Codebase**: Create the design system from scratch based strictly on the requirements document.

2.  **Consult Designer Skill**: Use `designer` skill for principles to ensure high quality (Premium, Distinctive), but ensure strict adherence to the document's specific constraints.

3.  **Determine Aesthetic** (derived from Doc or Codebase):
    - **Visual Style**: Minimal/Clean vs. Bold/Playful (as defined in Doc).
    - **Theme**: Light vs. Dark mode preference.

4.  **Select Foundations**:
    - **Typography**: Adhere to existing fonts if present; otherwise select based on Doc (e.g., Inter, Roboto, Outfit).
    - **Color Palette**: Extract from codebase or define new primary/secondary/neutral colors based on Doc.
    - **Spacing/Layout**: Harmonize with existing grid or define a new one (e.g., 4px/8px grid).

## Step 3: Map User Flows

**Goal**: Outline how users interact with the system.

1.  **Identify Critical Paths**: What are the main tasks (e.g., "Sign Up", "Checkout", "Create Post")?
2.  **Step-by-Step Flow**: List the screens or states users will encounter for each path.
3.  **Information Architecture**: Structure the navigation and hierarchy suitable for the flows.

## Step 4: Create Rapid Prototypes

**Goal**: Create high-fidelity HTML/CSS prototypes for user approval. **Focus on "Look & Feel" and "Flow" rather than production component code.**

1.  **Orchestrate Project Structure**:
    - All design artifacts must be contained within a `prototype/` directory at the project root.
    - Sub-assets (images, icons, illustrations) must be stored in `prototype/assets/`.

2.  **Generate Assets First**:
    - **Proactively use "Nano Banana" (`generate_image`)** to create high-fidelity demo images, icons, or UI backgrounds.
    - **Asset Storage**: Save these generated images directly into `prototype/assets/`.

3.  **Build Interactive Prototypes**:
    - Create functional **HTML/CSS files** (e.g., `prototype/home.html`, `prototype/dashboard.html`).
    - **Focus**: Visual impact, layout, spacing, and responsiveness.
    - **Do NOT**: Break down into complex React/Vue components (e.g., `.tsx`, `.vue`) at this stage. Keep it as raw HTML/CSS for easy iteration.
    - **Resource Linking**: Ensure all image `src` paths correctly reference the `./assets/` folder relative to the prototype file.

4.  **Review against Principles**: Check against the designer skill's "Core Design Principles" (Intentionality, Distinction, Technical Excellence).

## Step 5: Verification & Approval

**Goal**: Get user buy-in on the design directives.

1.  **Present Prototypes**: Show the `prototype/*.html` files to the user for review.
2.  **Iterate**: Refine the HTML/CSS based on feedback.
3.  **Approval Gate**: Explicitly ask: _"Does this prototype meet your expectations?"_
4.  **Handoff Prep**: **ONLY after approval**, verify technical feasibility and prepare for the developer to convert into production components.
