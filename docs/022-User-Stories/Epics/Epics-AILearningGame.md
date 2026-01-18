# Epics: AI Learning Web Game

**Project**: AI Learning Web Game
**Status**: Draft
**Related**: [[PRD-AILearningGame]], [[SDD-AILearningGame]]

---

## Epic Overview

| Epic ID | Name                            | Phase     | Priority    | Complexity |
| ------- | ------------------------------- | --------- | ----------- | ---------- |
| E-01    | Platform Foundation             | P1 (MVP)  | Must Have   | L          |
| E-02    | User System & Gamification      | P1 (MVP)  | Must Have   | M          |
| E-03    | Content Module: AI Basics       | P1 (MVP)  | Must Have   | L          |
| E-04    | Visual Novel Engine             | P1 (MVP)  | Must Have   | L          |
| E-05    | Quiz & Puzzle System            | P1 (MVP)  | Must Have   | M          |
| E-06    | Simulation Engine (Phaser)      | P2 (v1.0) | Should Have | XL         |
| E-07    | Content Module: Neural Networks | P2 (v1.0) | Should Have | L          |
| E-08    | Code Editor Module              | P3 (v2.0) | Could Have  | XL         |
| E-09    | 3D Visualization                | P3 (v2.0) | Could Have  | L          |
| E-10    | Content Module: LLMs            | P3 (v2.0) | Could Have  | L          |

---

## Phase 1: MVP Epics

---

### Epic E-01: Platform Foundation

**Description**: Set up the core Next.js application shell with routing, layouts, and essential infrastructure.

**Acceptance Criteria**:

- [ ] Next.js 16 project initialized with App Router
- [ ] TailwindCSS configured with custom design tokens
- [ ] Responsive layout (mobile-first)
- [ ] Dark/Light mode toggle
- [ ] Landing page with hero section
- [ ] Basic navigation (Header, Footer)
- [ ] SEO meta tags configured
- [ ] Vercel deployment pipeline

**Key Stories**:

- Setup Next.js 16 project with TypeScript
- Configure TailwindCSS design system
- Create responsive layout components
- Build landing page
- Setup CI/CD with Vercel

---

### Epic E-02: User System & Gamification

**Description**: Implement authentication, user profiles, and gamification elements (XP, levels, achievements).

**Acceptance Criteria**:

- [ ] Supabase Auth integration (email/password + social)
- [ ] Guest mode (play without account, limited progress save)
- [ ] User profile page (avatar, stats, achievements)
- [ ] XP system (earn XP per lesson completion)
- [ ] Level progression (unlock new content)
- [ ] Achievement badges (first lesson, module complete, etc.)
- [ ] Progress sync (localStorage → Supabase)

**Key Stories**:

- Integrate Supabase Auth
- Create user profile schema
- Build profile page UI
- Implement XP calculation logic
- Create achievement unlock system
- Build progress sync service

---

### Epic E-03: Content Module - AI Basics

**Description**: Create educational content for the first module covering AI fundamentals.

**Acceptance Criteria**:

- [ ] 5-7 lessons covering:
  - What is AI? (History, Definition)
  - AI vs Human Intelligence
  - Types of AI (Narrow, General, Super)
  - Real-world AI examples
  - How machines "learn"
- [ ] Content available in Vietnamese and English
- [ ] Each lesson has interactive elements (not just text)
- [ ] End-of-module quiz

**Key Stories**:

- Write lesson scripts (VN + EN)
- Create visual assets for each lesson
- Implement lesson data structure
- Build module navigation UI

---

### Epic E-04: Visual Novel Engine

**Description**: Build a reusable Visual Novel engine for story-driven lessons.

**Acceptance Criteria**:

- [ ] Dialogue box with typewriter effect
- [ ] Character sprites with multiple expressions
- [ ] Background scene management
- [ ] Player choice system (branching paths)
- [ ] Scene transitions (fade, slide)
- [ ] Script parser (JSON/YAML format)
- [ ] Save/Load game state
- [ ] Skip/Auto-play modes

**Key Stories**:

- Create DialogueBox component
- Build CharacterSprite system
- Implement ScriptParser
- Create choice/branching logic
- Add transition animations
- Implement save/load functionality

---

### Epic E-05: Quiz & Puzzle System

**Description**: Create interactive quiz and puzzle components to reinforce learning.

**Acceptance Criteria**:

- [ ] Multiple choice questions
- [ ] Drag-and-drop categorization
- [ ] Fill-in-the-blank
- [ ] Image-based matching
- [ ] Immediate feedback (correct/incorrect)
- [ ] Score calculation
- [ ] Retry mechanism

**Key Stories**:

- Build MultipleChoice component
- Create DragDropPuzzle component
- Implement FillBlank component
- Build MatchingGame component
- Create scoring service
- Add animations for feedback

---

## Phase 2: v1.0 Epics

---

### Epic E-06: Simulation Engine (Phaser)

**Description**: Integrate Phaser 3 for 2D game simulations to teach AI training concepts.

**Acceptance Criteria**:

- [ ] Phaser 3 integrated with Next.js (lazy-loaded)
- [ ] React overlay for UI elements
- [ ] "Train Your AI Pet" simulation:
  - Pet entity that responds to training
  - Data point objects to collect
  - Training feedback loop visualization
- [ ] Pause/Resume game
- [ ] Results screen with training metrics

**Key Stories**:

- Setup Phaser + React integration
- Create game boot scene
- Build AI Pet entity
- Implement training mechanics
- Create UI overlay
- Build results visualization

---

### Epic E-07: Content Module - Neural Networks

**Description**: Create content for the second module covering neural network fundamentals.

**Acceptance Criteria**:

- [ ] 5-7 lessons covering:
  - What is a Neural Network?
  - Neurons and Activation
  - Layers (Input, Hidden, Output)
  - Training and Backpropagation (simplified)
  - Computer Vision basics
- [ ] Interactive neuron simulation
- [ ] Visual network builder puzzle
- [ ] Content in VN + EN

**Key Stories**:

- Write lesson scripts
- Create neuron visualization component
- Build network puzzle game
- Integrate with Phaser simulation

---

## Phase 3: v2.0 Epics

---

### Epic E-08: Code Editor Module

**Description**: Provide an in-browser coding environment for hands-on AI experiments.

**Acceptance Criteria**:

- [ ] Monaco Editor integrated
- [ ] Pyodide (Python WASM) for code execution
- [ ] Pre-defined code challenges
- [ ] Test case runner
- [ ] Output console
- [ ] Code templates/starter code
- [ ] Sandbox security (no network access)

**Key Stories**:

- Integrate Monaco Editor
- Setup Pyodide runtime
- Create challenge data structure
- Build test runner
- Implement output console
- Create starter templates

---

### Epic E-09: 3D Visualization

**Description**: Add Three.js visualizations for advanced concepts like embeddings.

**Acceptance Criteria**:

- [ ] Three.js / React Three Fiber integrated
- [ ] Vector embedding space visualization
- [ ] Interactive camera controls
- [ ] Animated data point clustering
- [ ] Performance optimized for average hardware

**Key Stories**:

- Setup Three.js integration
- Create embedding visualizer
- Add camera controls
- Optimize for performance

---

### Epic E-10: Content Module - LLMs & Generative AI

**Description**: Create content for advanced module on Large Language Models.

**Acceptance Criteria**:

- [ ] 5-7 lessons covering:
  - What are LLMs?
  - Transformers architecture (simplified)
  - Tokenization
  - Prompt engineering basics
  - Generative AI applications
- [ ] Prompt playground (interactive)
- [ ] Token visualization tool
- [ ] Content in VN + EN

**Key Stories**:

- Write lesson scripts
- Create prompt playground UI
- Build tokenizer visualization
- Integrate with code editor for experiments

---

## Next Steps

- [ ] Review and Approve Epics
- [ ] Create detailed Use Cases for Phase 1 Epics
