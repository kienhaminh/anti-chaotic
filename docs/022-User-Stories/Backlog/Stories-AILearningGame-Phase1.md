# User Stories: AI Learning Web Game (Phase 1 - MVP)

**Project**: AI Learning Web Game
**Status**: Draft
**Related**: [[UC-AILearningGame-Phase1]], [[Epics-AILearningGame]]

---

## Story Format

```
As a [role],
I want [action],
So that [value].
```

**Complexity**: S (Small: 1-2 days), M (Medium: 3-5 days), L (Large: 1-2 weeks)

---

## Epic E-01: Platform Foundation

### Story-001: Initialize Next.js 16 Project

**Complexity**: S

**As a** developer,
**I want** a Next.js 16 project with TypeScript configured,
**So that** I can start building the application.

**Acceptance Criteria**:

- [ ] Next.js 16 with App Router
- [ ] TypeScript strict mode enabled
- [ ] ESLint + Prettier configured
- [ ] Folder structure matches SDD
- [ ] `npm run dev` works without errors

---

### Story-002: Configure TailwindCSS Design System

**Complexity**: S

**As a** developer,
**I want** TailwindCSS configured with custom design tokens,
**So that** I have a consistent design system.

**Acceptance Criteria**:

- [ ] TailwindCSS v4 installed
- [ ] Custom color palette defined
- [ ] Typography scale defined
- [ ] Spacing scale defined
- [ ] Dark mode variant configured

---

### Story-003: Create Layout Components

**Complexity**: M

**As a** user,
**I want** a consistent header and footer across all pages,
**So that** I can navigate the site easily.

**Acceptance Criteria**:

- [ ] Header component with logo, nav links, auth buttons
- [ ] Footer component with links and copyright
- [ ] Responsive design (mobile hamburger menu)
- [ ] Language toggle in header
- [ ] Dark/light mode toggle

---

### Story-004: Build Landing Page

**Complexity**: M

**As a** visitor,
**I want** an engaging landing page,
**So that** I understand the product and want to try it.

**Acceptance Criteria**:

- [ ] Hero section with headline, subheadline, CTA button
- [ ] Feature cards section (3-4 features)
- [ ] Preview/demo section
- [ ] Social proof section (placeholder)
- [ ] Responsive on mobile and desktop
- [ ] Animations on scroll

---

### Story-005: Setup Vercel Deployment

**Complexity**: S

**As a** developer,
**I want** automatic deployments to Vercel,
**So that** I can share progress with stakeholders.

**Acceptance Criteria**:

- [ ] GitHub repo connected to Vercel
- [ ] Preview deployments on PR
- [ ] Production deployment on main branch
- [ ] Environment variables configured

---

### Story-006: Implement i18n Support

**Complexity**: M

**As a** user,
**I want** to switch between Vietnamese and English,
**So that** I can use the app in my preferred language.

**Acceptance Criteria**:

- [ ] next-intl configured
- [ ] Language files for VN and EN
- [ ] Language toggle component
- [ ] URL-based locale routing (/vi, /en)
- [ ] All static text translated

---

## Epic E-02: User System & Gamification

### Story-007: Integrate Supabase Auth

**Complexity**: M

**As a** user,
**I want** to create an account and log in,
**So that** my progress is saved.

**Acceptance Criteria**:

- [ ] Supabase project created
- [ ] Auth UI components (login, register forms)
- [ ] Email/password authentication
- [ ] Session management with cookies
- [ ] Protected routes for authenticated users

---

### Story-008: Add Social Login (Google/GitHub)

**Complexity**: S

**As a** user,
**I want** to sign in with Google or GitHub,
**So that** I don't need to create a new password.

**Acceptance Criteria**:

- [ ] Google OAuth configured
- [ ] GitHub OAuth configured
- [ ] Social buttons on login/register pages
- [ ] Account linking for existing email

---

### Story-009: Implement Guest Mode

**Complexity**: M

**As a** visitor,
**I want** to play without creating an account,
**So that** I can try the game first.

**Acceptance Criteria**:

- [ ] "Play as Guest" button on landing/login
- [ ] LocalStorage progress tracking for guests
- [ ] Prompt to sign up after lesson completion
- [ ] Guest limitations documented in UI

---

### Story-010: Create User Profile Page

**Complexity**: M

**As a** user,
**I want** to view my profile and stats,
**So that** I can track my learning progress.

**Acceptance Criteria**:

- [ ] Profile page at /profile
- [ ] Display name, avatar
- [ ] XP and level display
- [ ] Progress bar to next level
- [ ] Module completion stats
- [ ] Edit profile form

---

### Story-011: Implement XP System

**Complexity**: M

**As a** user,
**I want** to earn XP for completing lessons,
**So that** I feel rewarded for learning.

**Acceptance Criteria**:

- [ ] XP calculation logic
- [ ] XP awarded on lesson/quiz completion
- [ ] XP animation when earned
- [ ] XP stored in database

---

### Story-012: Implement Level System

**Complexity**: S

**As a** user,
**I want** to level up when I earn enough XP,
**So that** I can see my overall progress.

**Acceptance Criteria**:

- [ ] Level thresholds defined (Level 1: 0 XP, Level 2: 100 XP, etc.)
- [ ] Level up detection
- [ ] Level up animation/modal
- [ ] Level displayed on profile

---

### Story-013: Create Achievement System

**Complexity**: M

**As a** user,
**I want** to earn achievement badges,
**So that** I have goals to work towards.

**Acceptance Criteria**:

- [ ] Achievement definitions (first_lesson, module_master, etc.)
- [ ] Achievement unlock detection
- [ ] Achievement popup notification
- [ ] Achievements displayed on profile
- [ ] Locked vs unlocked states

---

### Story-014: Implement Progress Sync

**Complexity**: M

**As a** user,
**I want** my progress synced across devices,
**So that** I can continue learning anywhere.

**Acceptance Criteria**:

- [ ] Local progress stored in localStorage
- [ ] Sync to Supabase on key events
- [ ] Conflict resolution (server wins)
- [ ] Offline indicator

---

## Epic E-03: Content Module - AI Basics

### Story-015: Create Module Data Structure

**Complexity**: S

**As a** developer,
**I want** a clear data structure for modules and lessons,
**So that** content is easy to manage.

**Acceptance Criteria**:

- [ ] Module schema defined (id, title, description, lessons[])
- [ ] Lesson schema defined (id, title, type, content, xp)
- [ ] Sample data for AI Basics module
- [ ] Content loading utilities

---

### Story-016: Build Module Listing Page

**Complexity**: M

**As a** user,
**I want** to see all available modules,
**So that** I can choose what to learn.

**Acceptance Criteria**:

- [ ] /modules page
- [ ] Module cards with thumbnail, title, progress
- [ ] Locked state for future modules
- [ ] Click to navigate to module detail

---

### Story-017: Build Module Detail Page

**Complexity**: M

**As a** user,
**I want** to see all lessons in a module,
**So that** I can start learning.

**Acceptance Criteria**:

- [ ] /modules/[moduleId] page
- [ ] Module header (title, description, progress)
- [ ] Lesson list with status (not started, in progress, completed)
- [ ] Click lesson to start

---

### Story-018: Write AI Basics Content (VN)

**Complexity**: L

**As a** user,
**I want** educational content about AI basics in Vietnamese,
**So that** I can learn in my native language.

**Acceptance Criteria**:

- [ ] Lesson 1: AI là gì? (script + visuals)
- [ ] Lesson 2: Lịch sử AI
- [ ] Lesson 3: AI vs Trí tuệ con người
- [ ] Lesson 4: Các loại AI
- [ ] Lesson 5: Ví dụ AI thực tế
- [ ] All content reviewed for accuracy

---

### Story-019: Translate AI Basics Content (EN)

**Complexity**: M

**As a** user,
**I want** AI Basics content in English,
**So that** I can learn in English.

**Acceptance Criteria**:

- [ ] All 5 lessons translated to English
- [ ] Translation reviewed for quality
- [ ] Content accessible via i18n

---

## Epic E-04: Visual Novel Engine

### Story-020: Create Dialogue Box Component

**Complexity**: M

**As a** user,
**I want** to see dialogue with a typewriter effect,
**So that** the story feels immersive.

**Acceptance Criteria**:

- [ ] DialogueBox component
- [ ] Typewriter text animation
- [ ] Speaker name display
- [ ] Click to complete text instantly
- [ ] Click to advance to next line

---

### Story-021: Create Character Sprite System

**Complexity**: M

**As a** user,
**I want** to see characters with expressions,
**So that** the story feels alive.

**Acceptance Criteria**:

- [ ] CharacterSprite component
- [ ] Multiple expression support (happy, sad, thinking)
- [ ] Smooth transitions between expressions
- [ ] Position support (left, center, right)

---

### Story-022: Create Background Scene System

**Complexity**: S

**As a** user,
**I want** beautiful scene backgrounds,
**So that** I'm immersed in the story.

**Acceptance Criteria**:

- [ ] BackgroundScene component
- [ ] Transition effects (fade, slide)
- [ ] Support for different scene types

---

### Story-023: Implement Script Parser

**Complexity**: M

**As a** developer,
**I want** a script parser for story content,
**So that** writers can create content in JSON/YAML.

**Acceptance Criteria**:

- [ ] Script format defined (scenes, dialogue, choices)
- [ ] Parser utility function
- [ ] Validation for script format
- [ ] Sample script created

---

### Story-024: Implement Choice/Branching System

**Complexity**: M

**As a** user,
**I want** to make choices that affect the story,
**So that** I feel engaged.

**Acceptance Criteria**:

- [ ] ChoicePanel component
- [ ] 2-4 choice buttons
- [ ] Choice stored in state
- [ ] Branch loading based on choice

---

### Story-025: Implement Save/Load State

**Complexity**: M

**As a** user,
**I want** my story progress saved,
**So that** I can continue later.

**Acceptance Criteria**:

- [ ] Save state to localStorage
- [ ] Resume from saved point
- [ ] "Continue" button on lesson start
- [ ] Reset option

---

## Epic E-05: Quiz & Puzzle System

### Story-026: Create Multiple Choice Component

**Complexity**: M

**As a** user,
**I want** to answer multiple choice questions,
**So that** I can test my knowledge.

**Acceptance Criteria**:

- [ ] MultipleChoice component
- [ ] Question and 4 options display
- [ ] Selection highlighting
- [ ] Submit button
- [ ] Correct/incorrect feedback
- [ ] Explanation display

---

### Story-027: Create Drag-Drop Puzzle Component

**Complexity**: L

**As a** user,
**I want** to drag items into categories,
**So that** I can learn by doing.

**Acceptance Criteria**:

- [ ] DragDropPuzzle component
- [ ] Draggable items
- [ ] Drop zones
- [ ] Visual feedback on drop
- [ ] Check answer button
- [ ] Success/failure states

---

### Story-028: Create Fill-in-the-Blank Component

**Complexity**: S

**As a** user,
**I want** to fill in missing words,
**So that** I can reinforce vocabulary.

**Acceptance Criteria**:

- [ ] FillBlank component
- [ ] Text with blank slots
- [ ] Text input for blanks
- [ ] Validation on submit

---

### Story-029: Create Quiz Container

**Complexity**: M

**As a** user,
**I want** a quiz experience with multiple questions,
**So that** I can complete a full assessment.

**Acceptance Criteria**:

- [ ] QuizContainer component
- [ ] Question navigation (1/5, 2/5, etc.)
- [ ] Progress indicator
- [ ] Score calculation at end
- [ ] Results screen with XP earned

---

### Story-030: Add Quiz Feedback Animations

**Complexity**: S

**As a** user,
**I want** visual feedback when I answer,
**So that** I know immediately if I'm right or wrong.

**Acceptance Criteria**:

- [ ] Correct answer animation (green, confetti)
- [ ] Incorrect answer animation (red, shake)
- [ ] Sound effects (optional)

---

## Summary

| Epic              | Stories | Total Complexity  |
| ----------------- | ------- | ----------------- |
| E-01 Platform     | 6       | 2S + 4M           |
| E-02 User System  | 8       | 3S + 5M           |
| E-03 AI Basics    | 5       | 1S + 3M + 1L      |
| E-04 Visual Novel | 6       | 1S + 5M           |
| E-05 Quiz/Puzzle  | 5       | 2S + 2M + 1L      |
| **Total**         | **30**  | **9S + 19M + 2L** |

---

## Next Steps

- [ ] Review and Approve User Stories
- [ ] Prioritize stories for Sprint 1
- [ ] Check if ADRs are needed for any technical decisions
