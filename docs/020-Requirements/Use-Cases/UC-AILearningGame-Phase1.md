# Use Cases: AI Learning Web Game (Phase 1 - MVP)

**Project**: AI Learning Web Game
**Status**: Draft
**Related**: [[Epics-AILearningGame]], [[PRD-AILearningGame]]

---

## Use Case Summary

| UC ID | Name                    | Epic | Actor      |
| ----- | ----------------------- | ---- | ---------- |
| UC-01 | View Landing Page       | E-01 | Visitor    |
| UC-02 | Register Account        | E-02 | Visitor    |
| UC-03 | Login to Account        | E-02 | User       |
| UC-04 | Play as Guest           | E-02 | Guest      |
| UC-05 | View Profile & Progress | E-02 | User       |
| UC-06 | Browse Learning Modules | E-03 | User/Guest |
| UC-07 | Start a Lesson          | E-03 | User/Guest |
| UC-08 | Play Visual Novel Story | E-04 | User/Guest |
| UC-09 | Make Story Choices      | E-04 | User/Guest |
| UC-10 | Complete Quiz           | E-05 | User/Guest |
| UC-11 | Solve Drag-Drop Puzzle  | E-05 | User/Guest |
| UC-12 | Earn XP & Level Up      | E-02 | User       |
| UC-13 | Unlock Achievement      | E-02 | User       |
| UC-14 | Switch Language         | E-01 | User/Guest |

---

## UC-01: View Landing Page

**Actor**: Visitor (unauthenticated)
**Epic**: E-01 Platform Foundation

### Description

A visitor arrives at the website and sees an engaging landing page that explains the product and encourages them to start learning.

### Preconditions

- None (public page)

### Main Flow (Happy Path)

1. Visitor navigates to the website URL.
2. System displays landing page with:
   - Hero section with tagline and CTA button
   - Feature highlights (3-4 cards)
   - Sample lesson preview
   - Testimonials (if any)
   - Footer with links
3. Visitor can click "Start Learning" CTA.
4. System redirects to module selection or signup prompt.

### Alternative Flows

- **A1**: Visitor scrolls to explore features before clicking CTA.
- **A2**: Visitor clicks "Login" in header → redirected to login page.

### Postconditions

- Visitor has overview of the platform.

---

## UC-02: Register Account

**Actor**: Visitor
**Epic**: E-02 User System & Gamification

### Description

A visitor creates a new account to save progress and unlock full features.

### Preconditions

- Visitor is not logged in.

### Main Flow (Happy Path)

1. Visitor clicks "Sign Up" button.
2. System displays registration form (Email, Password, Username).
3. Visitor fills in details and submits.
4. System validates input:
   - Email format valid
   - Password meets requirements (8+ chars)
   - Username unique
5. System creates account in Supabase.
6. System sends verification email.
7. System redirects to "Check your email" page.
8. Visitor clicks verification link in email.
9. System activates account and redirects to Dashboard.

### Alternative Flows

- **A1**: Social login (Google/GitHub)
  1. Visitor clicks "Continue with Google".
  2. System redirects to OAuth provider.
  3. User authorizes.
  4. System creates/links account, redirects to Dashboard.
- **A2**: Email already exists → show error "Email đã được sử dụng".
- **A3**: Username taken → show error and suggest alternatives.

### Error Handling

- Invalid email format → inline error message.
- Weak password → show requirements.
- Network error → retry prompt.

### Postconditions

- New user account created.
- User logged in and on Dashboard.

---

## UC-03: Login to Account

**Actor**: User (registered)
**Epic**: E-02 User System & Gamification

### Description

A registered user logs in to access their saved progress.

### Preconditions

- User has an existing account.

### Main Flow (Happy Path)

1. User clicks "Login" button.
2. System displays login form (Email, Password).
3. User enters credentials and submits.
4. System validates credentials with Supabase.
5. System creates session and redirects to Dashboard.

### Alternative Flows

- **A1**: Forgot password
  1. User clicks "Forgot password".
  2. System shows email input form.
  3. User enters email, submits.
  4. System sends reset link.
  5. User clicks link, enters new password.
  6. System updates password, redirects to login.
- **A2**: Wrong password → show error "Sai mật khẩu".
- **A3**: Account not found → show error "Tài khoản không tồn tại".

### Postconditions

- User logged in with active session.

---

## UC-04: Play as Guest

**Actor**: Guest
**Epic**: E-02 User System & Gamification

### Description

A visitor plays the game without creating an account. Progress is saved locally.

### Preconditions

- Visitor has not logged in.

### Main Flow (Happy Path)

1. Visitor clicks "Play as Guest" button.
2. System creates a local guest session.
3. System stores progress in localStorage.
4. Guest can access first module content.
5. After completing a lesson, system prompts:
   - "Create account to save progress permanently?"

### Limitations

- Progress only saved in current browser.
- Cannot access achievements/leaderboards.
- Limited to Phase 1 content (AI Basics only).

### Postconditions

- Guest can play with local progress tracking.

---

## UC-05: View Profile & Progress

**Actor**: User
**Epic**: E-02 User System & Gamification

### Description

A logged-in user views their profile, stats, and learning progress.

### Preconditions

- User is logged in.

### Main Flow (Happy Path)

1. User navigates to Profile page (via header menu or dashboard).
2. System displays:
   - Avatar and display name
   - Total XP and current level
   - Progress bar to next level
   - Module completion stats (X/Y lessons)
   - Achievement badges (unlocked/locked)
3. User can click on a module to see detailed lesson progress.

### Alternative Flows

- **A1**: User edits profile
  1. User clicks "Edit Profile".
  2. System shows form (display name, avatar upload).
  3. User updates and saves.
  4. System updates database, shows success toast.

### Postconditions

- User sees their current standing.

---

## UC-06: Browse Learning Modules

**Actor**: User/Guest
**Epic**: E-03 Content Module: AI Basics

### Description

User browses available learning modules and sees their progress.

### Preconditions

- User/Guest on the platform.

### Main Flow (Happy Path)

1. User navigates to "Modules" or "Learn" page.
2. System displays module cards:
   - Module 1: AI Basics (Available)
   - Module 2: Neural Networks (Locked - Phase 2)
   - Module 3: LLMs (Locked - Phase 3)
3. Each card shows:
   - Title, description, thumbnail
   - Progress (X/Y lessons completed)
   - Lock status
4. User clicks on an available module.
5. System shows module detail page with lesson list.

### Postconditions

- User can see all modules and their status.

---

## UC-07: Start a Lesson

**Actor**: User/Guest
**Epic**: E-03 Content Module: AI Basics

### Description

User starts a specific lesson within a module.

### Preconditions

- Module is unlocked.
- Previous lessons completed (if sequential).

### Main Flow (Happy Path)

1. User is on module detail page.
2. User clicks on a lesson (e.g., "What is AI?").
3. System loads lesson content.
4. System displays lesson intro screen with:
   - Lesson title
   - Estimated time
   - "Start" button
5. User clicks "Start".
6. System shows first content segment (Visual Novel or Quiz).

### Alternative Flows

- **A1**: Lesson locked → show lock icon and "Complete previous lesson first".
- **A2**: Resume lesson → if user left mid-lesson, offer "Continue where you left off?".

### Postconditions

- User is in active lesson.

---

## UC-08: Play Visual Novel Story

**Actor**: User/Guest
**Epic**: E-04 Visual Novel Engine

### Description

User experiences a story-driven lesson through the Visual Novel engine.

### Preconditions

- Lesson is loaded.
- Lesson type is Visual Novel.

### Main Flow (Happy Path)

1. System displays scene with:
   - Background image
   - Character sprite (if any)
   - Dialogue box with text
2. User clicks to advance dialogue.
3. System shows next line with typewriter effect.
4. [Repeat until choice or end of segment]
5. If segment ends:
   - If quiz follows → transition to quiz
   - If story continues → load next scene

### Alternative Flows

- **A1**: Skip button → instantly show full text.
- **A2**: Auto mode → advance automatically after X seconds.
- **A3**: Log button → show dialogue history.

### Postconditions

- User has consumed story content.

---

## UC-09: Make Story Choices

**Actor**: User/Guest
**Epic**: E-04 Visual Novel Engine

### Description

During a Visual Novel, user makes choices that affect the story path.

### Preconditions

- Story has reached a decision point.

### Main Flow (Happy Path)

1. System pauses dialogue.
2. System displays 2-4 choice buttons.
3. User clicks a choice.
4. System stores choice in state.
5. System loads corresponding branch content.
6. Story continues based on choice.

### Alternative Flows

- **A1**: Timed choice → countdown timer, default choice if no input.

### Postconditions

- Story branched based on user decision.
- Choice saved for progress tracking.

---

## UC-10: Complete Quiz

**Actor**: User/Guest
**Epic**: E-05 Quiz & Puzzle System

### Description

User answers quiz questions at the end of a lesson or module.

### Preconditions

- User has completed lesson content.

### Main Flow (Happy Path)

1. System displays quiz intro (X questions, topic).
2. User clicks "Start Quiz".
3. For each question:
   1. System shows question and options.
   2. User selects an answer.
   3. User clicks "Submit".
   4. System shows feedback (correct/incorrect + explanation).
   5. User clicks "Next".
4. After last question:
   1. System calculates score.
   2. System displays results (X/Y correct, XP earned).
   3. If score >= 70%, mark lesson complete.
   4. User clicks "Continue" to return to module.

### Alternative Flows

- **A1**: Score < 70% → offer "Retry Quiz".
- **A2**: User exits mid-quiz → save progress, allow resume.

### Postconditions

- Quiz score recorded.
- XP awarded if passed.

---

## UC-11: Solve Drag-Drop Puzzle

**Actor**: User/Guest
**Epic**: E-05 Quiz & Puzzle System

### Description

User solves an interactive drag-and-drop puzzle to categorize items.

### Preconditions

- Puzzle loaded as part of lesson.

### Main Flow (Happy Path)

1. System displays:
   - Draggable items (e.g., "Siri", "Calculator", "Self-driving car")
   - Target zones (e.g., "AI", "Not AI")
2. User drags an item to a zone.
3. System provides visual feedback (snap to zone).
4. User places all items.
5. User clicks "Check".
6. System validates and shows:
   - Correct placements (green)
   - Incorrect placements (red, correct answer shown)
7. System awards partial XP based on accuracy.

### Alternative Flows

- **A1**: User clicks "Hint" → one item auto-placed correctly.
- **A2**: All incorrect → show "Try again" with items reset.

### Postconditions

- Puzzle completed.
- Progress recorded.

---

## UC-12: Earn XP & Level Up

**Actor**: User
**Epic**: E-02 User System & Gamification

### Description

User earns XP from activities and levels up when threshold reached.

### Preconditions

- User is logged in.
- User completes an XP-awarding activity.

### Main Flow (Happy Path)

1. User completes a lesson/quiz.
2. System calculates XP:
   - Lesson complete: +50 XP
   - Quiz passed: +30 XP
   - Perfect quiz: +20 bonus XP
3. System adds XP to user's total.
4. System checks if total >= next level threshold.
5. If level up:
   1. System shows level-up animation.
   2. System unlocks new content (if any).
   3. System shows toast "Lên cấp! Level X".
6. System updates database.

### Postconditions

- User's XP and level updated.

---

## UC-13: Unlock Achievement

**Actor**: User
**Epic**: E-02 User System & Gamification

### Description

User unlocks an achievement badge based on accomplishments.

### Preconditions

- User is logged in.
- Achievement condition met.

### Achievement Examples

| Key                  | Name             | Condition                      |
| -------------------- | ---------------- | ------------------------------ |
| first_lesson         | Người Khởi Đầu   | Complete first lesson          |
| module_master_basics | AI Cơ Bản Master | Complete all AI Basics lessons |
| perfect_quiz         | Hoàn Hảo         | Score 100% on any quiz         |
| streak_3             | Cần Cù           | Learn 3 days in a row          |

### Main Flow (Happy Path)

1. System detects achievement condition met (e.g., first lesson done).
2. System inserts achievement record in database.
3. System shows achievement popup/toast with:
   - Badge icon
   - Achievement name
   - Bonus XP awarded
4. User can click to view all achievements.

### Postconditions

- Achievement recorded.
- Badge visible on profile.

---

## UC-14: Switch Language

**Actor**: User/Guest
**Epic**: E-01 Platform Foundation

### Description

User switches the interface language between Vietnamese and English.

### Preconditions

- User is on any page.

### Main Flow (Happy Path)

1. User clicks language toggle in header (VN/EN).
2. System updates locale.
3. System re-renders page in new language.
4. If logged in, system saves preference to profile.

### Postconditions

- All UI text and content displayed in selected language.

---

## Next Steps

- [ ] Review and Approve Use Cases
- [ ] Create User Stories for each Use Case
