# UI/UX Design Document: AI Learning Web Game (Orbit)

**Version**: 1.0
**Date**: 2026-01-18
**Based on**: `PRD-AILearningGame.md`

---

## 1. Design Overview

The **AI Learning Web Game** (codenamed "Orbit") functions as a bridge between complex AI concepts and accessible, gamified learning. The design language must balance "Educational Trustworthiness" with "Futuristic Playfulness".

### Core Design Drivers

- **Democratization**: Accessible to kids and non-tech users, yet credible enough for developers.
- **Immersion**: Use of Visual Novel elements requires a cinematic approach to UI.
- **Clarity**: Abstract concepts (Neural Networks) must be visualized simply.

---

## 2. Design System: "Soft Cyberpunk"

We move away from the "Dark Mode Terminal" cliché to a brighter, friendlier, yet tech-forward aesthetic.

### 2.1 Color Palette

A clean, high-contrast palette with vibrant accents to denote "AI Magic".

**Primary (Action & key AI elements)**

- `Primary-500`: `#6366F1` (Indigo - Logic/Code)
- `Primary-400`: `#818CF8` (Soft Indigo)

**Secondary (Growth & Success)**

- `Success-500`: `#10B981` (Emerald - Correct answers, progress)
- `Accent-500`: `#F472B6` (Pink - Narrative/Story elements)

**Neutral (Backgrounds & Surfaces)**

- `Surface-900`: `#0F172A` (Slate - Depth background)
- `Surface-800`: `#1E293B` (Slate - Card background)
- `Light-Surface`: `#F8FAFC` (Slate - Light mode background)
- `Text-Main`: `#F1F5F9` (Dark mode text) / `#0F172A` (Light mode text)

### 2.2 Typography

Distinct pairing to separate "Story" from "System".

- **Headings**: `Outfit` (Google Fonts). Geometric, tech-friendly, modern.
  - Weights: SemiBold (600), Bold (700)
- **Body / Narrative**: `Inter` (Google Fonts). Highly legible, neutral.
  - Weights: Regular (400), Medium (500)
- **Code / Technical**: `JetBrains Mono` or `Fira Code`.

### 2.3 Effects & Texture

- **Glassmorphism 2.0**: Used for overlay panels (Inventory, Dialogue Box).
  - `backdrop-filter: blur(12px)`
  - `background: rgba(255, 255, 255, 0.05)`
- **Subtle Glows**: Interactive elements have a faint `box-shadow` glow on hover, not permanent neon.
- **Bento Grids**: Dashboards and Module selection use strict, asymmetric grids for a structured feel.

---

## 3. User Flows

### 3.1 The "Explorer " Journey (New User)

1.  **Landing Page**:
    - _Hero_: Large, animated illustration of the AI Mascot.
    - _Action_: "Start Your Journey" (Guest Play).
2.  **Onboarding**:
    - Simple modal: "Select Language" (VN/EN).
    - Quick intro dialogue (Visual Novel style) introducing the player as a "Data Cadet".
3.  **Module Selection**:
    - Dashboard view (Bento Grid).
    - Only "Module 1" is unlocked.
4.  **Gameplay (Lesson)**:
    - Split screen: Narrative (Left/Top) vs Interactive (Right/Bottom).
    - User drags "Neurons" to "Layers".
5.  **Victory**:
    - "Level Up" Overlay.
    - Call to Action: "Create Account to Save Progress".

---

## 4. Visual Components

### 4.1 Buttons

- **Primary**: Gradient background (Indigo to Purple). Pill-shaped `border-radius: 9999px`.
- **Secondary**: Transparent with border. `border: 1px solid rgba(255,255,255,0.2)`.

### 4.2 Cards (Bento Style)

- **Container**: `bg-slate-800` (Dark mode). `rounded-2xl`.
- **Hover**: Subtle `scale-105` and border lighten.
- **Content**: Icon top-left, Title bottom-left, Progress bar bottom.

### 4.3 Dialogue Box (Visual Novel)

- Position: Bottom fixed.
- Style: Glassmorphism panel.
- Elements:
  - Character Name Tag (Floating top-left of box).
  - Typewriter effect text.
  - "Next" indicator (Bouncing triangle).

### 4.4 Inputs

- **Text Field**: Minimalist, bottom-border or soft filled background.
- **Sliders**: Custom styled track, colorful thumb.

---

## 5. Page Layouts (Wireframes)

### 5.1 Landing Page

- **Nav**: Logo (Left), Language Toggle (Right), Login (Right).
- **Hero**: Center aligned. "Demystifying AI, One Story at a Time."
- **Features**: 3-Column Grid. "Story Mode", "Hands-on Labs", "Bilingual".

### 5.2 Dashboard (The Core)

- **Header**: User Profile (Avatar + XP Bar/Level).
- **Main Area**: Bento Grid of Modules.
  - Large Tile: "Current Active Module" (Resume).
  - Medium Tiles: Unlocked Modules.
  - Small Tiles: Achievements/Badges.
- **Footer**: Gamification stats (Streak, Total XP).

### 5.3 Lesson Interface

- **Layout**: Two-Pane (Desktop) / Vertical Stack (Mobile).
- **Pane A (Narrative)**: Character sprite, background art, dialogue box.
- **Pane B (Interaction)**: Canvas for Drag-and-Drop puzzles, Code editor, or Graph visualization.
- **Overlay**: Settings, Mute, Exit.

---

## 6. Verification Checklist

- [ ] **Accessibility**: Colors check out on Contrast Checker? (Aim for AA).
- [ ] **Responsiveness**: Does the Visual Novel view work on vertical mobile screens? (Dialogue moves to bottom, sprite scales down).
- [ ] **Performance**: Minimal use of heavy textures; rely on CSS gradients/blur.

## 7. Artifacts

- **Interactive Prototype**: [design-prototype.html](../../artifacts/design-prototype.html) - A standalone HTML file demonstrating the "Soft Cyberpunk" aesthetic, typography, and component styling. Open this file in your browser to view the design concept.
