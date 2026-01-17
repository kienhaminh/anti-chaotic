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

**Goal**: Establish the visual language.

1.  **Consult Designer Skill**: Read `.agent/skills/designer/SKILL.md` for principles.
2.  **Determine Aesthetic**:
    - Minimal/Clean vs. Bold/Playful?
    - Light vs. Dark mode preference?
3.  **Select Foundations**:
    - **Typography**: Choose a primary heading font and a body font (e.g., Inter, Roboto, Outfit).
    - **Color Palette**: Define primary, secondary, and neutral colors.
    - **Spacing/Layout**: Define the grid system (e.g., 4px/8px grid).

## Step 3: Map User Flows

**Goal**: Outline how users interact with the system.

1.  **Identify Critical Paths**: What are the main tasks (e.g., "Sign Up", "Checkout", "Create Post")?
2.  **Step-by-Step Flow**: List the screens or states users will encounter for each path.
3.  **Information Architecture**: Structure the navigation and hierarchy suitable for the flows.

## Step 4: Create Visual Artifacts

**Goal**: Generate the actual design output.

1.  **Generate Components**:
    - Use `generate_image` (if available) or describe component structures in detail.
    - Define the CSS/Tailwind classes for key elements (Buttons, Cards, Inputs).
2.  **Draft Page Layouts**:
    - Create an HTML/CSS prototype or a high-fidelity description for each major screen.
    - Ensure responsiveness (Mobile vs. Desktop).
3.  **Review against Principles**: Check against the designer skill's "Core Design Principles" (Intentionality, Distinction, Technical Excellence).

## Step 5: Verification

**Goal**: Ensure the design meets the original requirements.

1.  **Req Check**: Does the design cover all features listed in Step 1?
2.  **Usability Check**: Are the flows logical? Are distinct actions clear?
3.  **Handoff Prep**: Package the design (color codes, font names, spacing rules) for the developer.
