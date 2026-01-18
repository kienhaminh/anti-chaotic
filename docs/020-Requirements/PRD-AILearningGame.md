# Product Requirements Document (PRD): AI Learning Web Game

**Project**: AI Learning Web Game
**Version**: 0.1
**Status**: Draft
**Owner**: Product Manager

## 1. Introduction

This project aims to democratize AI education through an engaging, multi-genre web game. By combining visual novels, simulations, and coding challenges, we simulate the journey of learning AI for a diverse audience ranging from children to developers.

## 2. Business Objectives & Success Metrics

### Objectives

- **Education**: Simplify complex AI concepts (Neural Networks, LLMs) into intuitive gameplay.
- **Engagement**: Create a "sticky" learning experience using gamification (XP, badges, story).
- **Accessibility**: Provide a bilingual (VN/EN) platform accessible on web browsers without high-end hardware.

### Success Metrics (KPIs)

- **User Acquisition**: 1,000 active users in the first month post-launch.
- **Retention**: 20% of users completing at least the first module (Foundation).
- **Learner Satisfaction**: Average rating of 4.5/5 on concept clarity.

## 3. User Personas

1.  **The Explorer (Kids/General Public)**:
    - _Goal_: Understand "magic" behind AI without math/code.
    - _Preferred Style_: Visual Novel, simple puzzles, drag-and-drop.
2.  **The Student (High School/Undergrad)**:
    - _Goal_: Grasp fundamental concepts for studies.
    - _Preferred Style_: Simulations, logic puzzles (connecting neurons).
3.  **The Tinkerer (Developer)**:
    - _Goal_: See how things work under the hood.
    - _Preferred Style_: Code challenges, parameter tuning, 3D visualizations.

## 4. Feature Prioritization (MoSCoW)

### Must Have (MVP - Phase 1)

- **Web Platform**: Next.js app with responsive design.
- **Auth System**: Guest mode + Account creation (save progress).
- **Localization**: Toggle between Vietnamese and English.
- **Module 1 (Basics)**: Visual Novel engine for storytelling + Basic drag-and-drop quizzes.
- **Gamification**: Basic XP system and Level unlocking.

### Should Have (v1.0 - Phase 2)

- **Simulation Engine**: Phaser integration for "Train your AI Pet".
- **Interactive Graphs**: Visualizing nodes and layers.
- **User Dashboard**: Progress stats and badge collection.

### Could Have (v2.0 - Phase 3)

- **Coding Sandbox**: In-browser code editor (Monaco) to write simple AI logic.
- **3D Visualizer**: Three.js integration for varying vector embeddings.
- **Leaderboards**: Global ranking for high scores.

### Won't Have (Initially)

- **Multiplayer**: Real-time competitive gaming.
- **Real Training**: Attempting to train actual heavy models in-browser (simulation only).
- **Mobile App**: Native iOS/Android app (Web only focused).

## 5. Technical Constraints

- **Browser Performance**: Visuals must be optimized for average laptops/tablets (using WebGL efficiently).
- **Storage**: Client-side state management for progress to minimize server costs initially.
- **Stack**: Next.js (React), TailwindCSS, local storage/lightweight DB (Supabase/SQLite).

## 6. Open Questions

- Specific art style direction (Pixel art vs. Vector distinct vs. Anime style)?
- Depth of content for the "Developer" track (Mock code vs Real Python execution)?
