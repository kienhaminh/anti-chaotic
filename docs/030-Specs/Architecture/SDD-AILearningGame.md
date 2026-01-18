# System Design Document (SDD): AI Learning Web Game

**Project**: AI Learning Web Game
**Version**: 0.1
**Status**: Draft
**Implements**: [[PRD-AILearningGame]]

---

## 1. System Overview

The AI Learning Web Game is a modular, multi-genre educational platform built as a modern web application. The architecture prioritizes:

- **Modularity**: Each game type (Visual Novel, Simulation, Coding) is a separate, lazy-loaded module.
- **Performance**: Optimized for average hardware; heavy engines (Phaser, Three.js) loaded on-demand.
- **Scalability**: Serverless backend for cost efficiency during initial launch.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                          │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                      Next.js App Shell                        │  │
│  │  ┌─────────────┬─────────────┬─────────────┬───────────────┐  │  │
│  │  │  Landing    │  Dashboard  │  Settings   │  Game Loader  │  │  │
│  │  └─────────────┴─────────────┴─────────────┴───────────────┘  │  │
│  │                              │                                 │  │
│  │          ┌───────────────────┼───────────────────┐             │  │
│  │          ▼                   ▼                   ▼             │  │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │  │
│  │  │ Visual Novel│     │  Simulation │     │ Code Editor │       │  │
│  │  │   Module    │     │   Module    │     │   Module    │       │  │
│  │  │  (React +   │     │  (Phaser +  │     │  (Monaco +  │       │  │
│  │  │   Framer)   │     │   React)    │     │  Three.js)  │       │  │
│  │  └─────────────┘     └─────────────┘     └─────────────┘       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                     State Management                          │  │
│  │         (Zustand / React Context + LocalStorage)              │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS / REST / tRPC
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKEND (Serverless)                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                     API Routes (Next.js)                      │  │
│  │  ┌──────────┬──────────┬──────────┬──────────┬─────────────┐  │  │
│  │  │   Auth   │ Progress │  Content │ Analytics│  Leaderboard│  │  │
│  │  └──────────┴──────────┴──────────┴──────────┴─────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                       Database Layer                          │  │
│  │                 (Supabase / PostgreSQL)                       │  │
│  │  ┌──────────┬──────────┬──────────┬──────────┐                │  │
│  │  │  Users   │ Progress │  Content │  Scores  │                │  │
│  │  └──────────┴──────────┴──────────┴──────────┘                │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

| Layer           | Technology                   | Rationale                               |
| --------------- | ---------------------------- | --------------------------------------- |
| **Framework**   | Next.js 16 (App Router)      | SSR/SSG, API routes, excellent DX       |
| **Language**    | TypeScript                   | Type safety, better IDE support         |
| **Styling**     | TailwindCSS                  | Rapid UI development, responsive design |
| **Animation**   | Framer Motion                | Declarative animations for Visual Novel |
| **2D Game**     | Phaser 3                     | Mature 2D game engine for simulations   |
| **3D Viz**      | Three.js / React Three Fiber | Vector embeddings visualization         |
| **Code Editor** | Monaco Editor                | VS Code's editor for in-browser coding  |
| **State**       | Zustand                      | Lightweight, no boilerplate             |
| **i18n**        | next-intl                    | Built for Next.js, supports VN/EN       |
| **Auth**        | Supabase Auth                | Easy setup, JWT, social logins          |
| **Database**    | Supabase (PostgreSQL)        | Open-source, real-time subscriptions    |
| **Hosting**     | Vercel                       | Native Next.js support, edge functions  |

---

## 4. Module Architecture

### 4.1 Visual Novel Module

```
src/modules/visual-novel/
├── components/
│   ├── DialogueBox.tsx       # Text display with typewriter effect
│   ├── CharacterSprite.tsx   # Character images with expressions
│   ├── ChoicePanel.tsx       # Player choices
│   └── BackgroundScene.tsx   # Scene backgrounds
├── engine/
│   ├── ScriptParser.ts       # Parse story scripts (YAML/JSON)
│   ├── StateManager.ts       # Track story progress, flags
│   └── TransitionManager.ts  # Scene transitions (fade, slide)
├── data/
│   └── stories/              # Story content files
└── index.tsx                 # Module entry point
```

### 4.2 Simulation Module (Phaser)

```
src/modules/simulation/
├── components/
│   ├── PhaserContainer.tsx   # React wrapper for Phaser canvas
│   └── UIOverlay.tsx         # React UI on top of game
├── scenes/
│   ├── BootScene.ts          # Asset loading
│   ├── TrainingScene.ts      # Main gameplay scene
│   └── ResultScene.ts        # Show training results
├── entities/
│   ├── AIPet.ts              # The trainable AI pet
│   └── DataPoint.ts          # Training data objects
└── index.tsx
```

### 4.3 Code Editor Module

```
src/modules/code-editor/
├── components/
│   ├── EditorPane.tsx        # Monaco editor wrapper
│   ├── OutputConsole.tsx     # Show execution results
│   └── ProblemDescription.tsx# Challenge instructions
├── sandbox/
│   ├── PythonRunner.ts       # Pyodide integration (WASM Python)
│   └── TestRunner.ts         # Run test cases
├── challenges/
│   └── *.json                # Challenge definitions
└── index.tsx
```

---

## 5. Data Model (Simplified)

```sql
-- Users table (managed by Supabase Auth)
-- profiles extends auth.users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'vi', -- 'vi' | 'en'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress tracking
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  module_id TEXT NOT NULL,           -- 'basics', 'neural-networks', 'llm'
  lesson_id TEXT NOT NULL,           -- 'intro-1', 'conv-net-2'
  status TEXT DEFAULT 'not_started', -- 'not_started' | 'in_progress' | 'completed'
  score INT,
  xp_earned INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id, lesson_id)
);

-- Gamification
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  achievement_key TEXT NOT NULL,     -- 'first_lesson', 'neural_master'
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_key)
);
```

---

## 6. API Endpoints (Draft)

| Endpoint                           | Method | Description                         |
| ---------------------------------- | ------ | ----------------------------------- |
| `/api/auth/[...supabase]`          | \*     | Supabase Auth handlers              |
| `/api/progress`                    | GET    | Get user's progress for all modules |
| `/api/progress`                    | POST   | Update lesson progress              |
| `/api/content/:moduleId`           | GET    | Get module content (lessons list)   |
| `/api/content/:moduleId/:lessonId` | GET    | Get specific lesson data            |
| `/api/achievements`                | GET    | Get user's achievements             |
| `/api/leaderboard`                 | GET    | Get top scores (Phase 3)            |

---

## 7. Key Design Decisions

### ADR-001: Module Lazy Loading

**Context**: Multiple heavy game engines (Phaser, Three.js) in one app.
**Decision**: Use `next/dynamic` with `{ ssr: false }` to lazy-load game modules only when needed.
**Consequence**: Faster initial page load; slight delay when entering a game module for the first time.

### ADR-002: Local-First Progress

**Context**: Minimize backend calls for cost and offline capability.
**Decision**: Store progress in `localStorage` first, sync to Supabase on key events (lesson complete, session end).
**Consequence**: Works offline; requires conflict resolution on sync.

### ADR-003: Supabase for MVP

**Context**: Need auth, database, and real-time with minimal setup.
**Decision**: Use Supabase's hosted service for MVP.
**Consequence**: Fast development; vendor lock-in risk (mitigated by open-source nature).

---

## 8. Security Considerations

- **Authentication**: Supabase Auth with RLS (Row Level Security) on all tables.
- **Code Execution**: Python code runs in Pyodide (browser WASM sandbox), not on server. No network access from sandbox.
- **Content Validation**: All user-generated content (e.g., code inputs) sanitized before display.

---

## 9. Performance Targets

| Metric                 | Target            |
| ---------------------- | ----------------- |
| Lighthouse Performance | > 85              |
| Time to Interactive    | < 3s (main shell) |
| First Contentful Paint | < 1.5s            |
| Game Module Load       | < 5s (on 3G)      |

---

## 10. Open Technical Questions

1.  **Pyodide Size**: ~15MB download. Acceptable for "Developer" track? Consider pre-caching.
2.  **Phaser + React Integration**: Use `phaser-react-ui` or custom implementation?
3.  **Content Format**: JSON, YAML, or MDX for story scripts?

---

## Next Steps

- [ ] Review and Approve SDD.
- [ ] Create Epics based on modules.
