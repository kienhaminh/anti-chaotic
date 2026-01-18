# Project Roadmap: AI Learning Web Game

**Project Name**: AI Learning Web Game
**Version**: 0.1 (Draft)
**Language**: Vietnamese & English

## Executive Summary

This project aims to build a comprehensive, multi-genre educational game platform to teach AI concepts from basics to advanced topics. Given the broad scope (multiple game types, wide audience), development will be phased to ensure steady delivery of value.

## Phases Overview

### 🏁 Phase 1: Foundation & The Basics (MVP)

**Goal**: Launch the platform structure, bilingual support, and intro content accessible to all audiences (Kids -> Beginners).
**Timeline**: Month 1-2

- **Core Platform**:
  - Next.js App Shell setup.
  - User Auth & Progress Tracking (Saves, XP, Levels).
  - Internationalization (i18n) Engine (VN/EN).
- **Content Module 1: AI Concepts**:
  - **Topic**: History of AI, What is AI?, AI vs Non-AI.
  - **Game Mechanics**:
    - _Visual Novel_: Story-driven introduction to AI.
    - _Quiz/Puzzle_: simple drag-and-drop to categorize technologies.
- **Tech**: React, Framer Motion (animations), TailwindCSS.

### 🚀 Phase 2: Machine Learning & Interaction (v1.0)

**Goal**: Introduce interactive simulations for intermediate learners.
**Timeline**: Month 3-4

- **Content Module 2: Neural Networks & Vision**:
  - **Topic**: Neurons, Layers, Training, Computer Vision basics.
  - **Game Mechanics**:
    - _Simulation_: "Train your Dragon" style pet that learns from user input (Phaser).
    - _Puzzle_: Connecting nodes in a Neural Network to solve logic gates.
- **Tech**: Phaser integration for 2D physics and game loops.

### 🧠 Phase 3: Advanced/Coding (v2.0)

**Goal**: Deep dive for Developers/Students with coding and 3D visualization.
**Timeline**: Month 5-6

- **Content Module 3: LLMs & Generative AI**:
  - **Topic**: Transformers, Prompts, Generative Models.
  - **Game Mechanics**:
    - _Coding Game_: "Code Block" or lightweight Python challenges to optimize a model.
    - _Visual Exploration_: 3D visualization of token embeddings (Three.js).
- **Tech**: Three.js, Monaco Editor (code input).

## Milestones & Deliverables

| Phase  | Milestone      | Deliverable                                          | Risk Level             |
| :----- | :------------- | :--------------------------------------------------- | :--------------------- |
| **P1** | Platform Alpha | System implementation (Auth, I18n), Landing Page     | Low                    |
| **P1** | Content MVP    | "AI Basics" Visual Novel Module                      | Medium                 |
| **P2** | Sim Engine     | Interactive Training Simulation (Phaser integration) | High (Tech complexity) |
| **P3** | Code Engine    | In-browser coding environment & 3D Visualizer        | High (Performance)     |

## Key Risks & Mitigation

1.  **Scope Creep**: attempting to do all game types at once.
    - _Mitigation_: Sticking strictly to One Game Type per Concept initially.
2.  **Performance**: Three.js and Phaser in the same React app can be heavy.
    - _Mitigation_: Lazy loading modules; separating heavy game routes.
3.  **Content Difficulty**: Balancing "Kids" vs "Developers".
    - _Mitigation_: "Difficulty Selector" or "Separate Tracks" (Explorer Mode vs. Engineer Mode).

## Next Steps

- [ ] Review and Approve Roadmap.
- [ ] Create Product Requirements Document (PRD).
