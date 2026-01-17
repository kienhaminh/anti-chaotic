---
description: Requirement Analysis Workflow (PM -> BA -> Architect)
---

# Requirement Analysis Workflow

This workflow orchestrates the **Product Manager**, **Business Analyst**, and **Lead Architect** skills to transform a raw user request into a comprehensive, validated implementation plan.

## Step 1: Strategic Vision & Scope (The "Why")

**Role: Product Manager**
// turbo

1.  **Analyze the Request**: Understand the user's high-level goal.
2.  **Define Strategy**:
    - Clarify business objectives and success metrics (OKRs).
    - Define the target audience/user persona.
    - Apply prioritization frameworks (MoSCoW or RICE) to features.
3.  **Output**: A high-level **Product Requirements Document (PRD)** or **Strategic Brief** summarizing the "Why" and "What".
    - _Trigger_: "As a Product Manager, I will analyze this request to define the strategic vision..."

## Step 2: Deep Dive & Logic Analysis (The "Functional How")

**Role: Business Analyst**
// turbo

1.  **Analyze Constraints**: Identify business and technical constraints based on the PM's vision.
2.  **Logic & Flow Mapping**:
    - **MANDATORY**: Use `sequential-thinking` to break down complex logical flows (Happy Path, Negative Path, Edge Cases).
3.  **Visualisation**:
    - Generate **Mermaid diagrams** (Flowcharts, Sequence Diagrams) to visualize the user journey and system logic.
4.  **Output**: **Functional Specification** and **User Stories** with clear Acceptance Criteria.
    - _Trigger_: "As a Business Analyst, I will now take the PM's vision and break it down into detailed requirements..."

## Step 3: Technical Feasibility Review (The "Technical How")

**Role: Lead Architect**
// turbo

1.  **Review Requirements**: Validate the BA's specifications for technical feasibility.
2.  **System Design**:
    - Propose high-level system components (API inputs, Database Schema changes).
    - Identify architectural risks, security implications, and scalability concerns.
    - Determine if an **Architecture Decision Record (ADR)** is needed.
3.  **Output**: **Technical Constraints Definition** and preliminary **System Design**.
    - _Trigger_: "As the Lead Architect, I will review these requirements to ensure they are technically sound..."

## Step 4: Final Consolidation & Handover

**Role: Product Manager**
// turbo

1.  **Review & Consolidate**: Gather outputs from all roles.
2.  **Validation**: Ensure the technical plan still aligns with the original business goals.
3.  **Output**: A consolidated **"Ready for Development"** package (Strategic Vision + Functional Specs + Technical Design).
    - _Trigger_: "As Product Manager, I will consolidate our findings into a final plan..."
