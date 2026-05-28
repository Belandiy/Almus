# AI Career Strategist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a functional, interactive React SPA based on `design.html` with onboarding, career strategy, and swipeable job cards.

**Architecture:** React SPA with state-based navigation and Context API for global state. Framer Motion for high-fidelity animations.

**Tech Stack:** React (Vite), TypeScript, Tailwind CSS, Framer Motion, Lucide React, LocalStorage.

---

### Task 1: Project Initialization & Theme Setup

**Files:**
- Create: `vite.config.ts`, `tailwind.config.js`, `src/index.css`, `src/main.tsx`
- Modify: `package.json`

- [ ] **Step 1: Initialize Vite project with React and TypeScript**
- [ ] **Step 2: Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`**
- [ ] **Step 3: Configure `tailwind.config.js` with exact colors, fonts, and spacing from `design.html`**
- [ ] **Step 4: Setup global styles in `index.css` (Google Fonts, Tailwind directives, custom `btn-duo` classes)**
- [ ] **Step 5: Verify setup by running a "Hello World" screen**

### Task 2: State Management & Navigation Logic

**Files:**
- Create: `src/context/AppContext.tsx`, `src/hooks/useLocalStorage.ts`, `src/App.tsx`

- [ ] **Step 1: Implement `useLocalStorage` hook for state persistence**
- [ ] **Step 2: Create `AppContext` to manage `currentScreen`, `userProfile`, `onboardingProgress`, and `jobActions`**
- [ ] **Step 3: Implement basic router in `App.tsx` that switches components based on `state.currentScreen`**
- [ ] **Step 4: Commit state setup**

### Task 3: Onboarding Flow (Phase 1) - Welcome & Choice

**Files:**
- Create: `src/components/onboarding/WelcomeScreen.tsx`, `src/components/onboarding/ChoiceScreen.tsx`

- [ ] **Step 1: Implement `WelcomeScreen` with floating robot animation and "Start" button**
- [ ] **Step 2: Implement `ChoiceScreen` with "Upload Resume" and "Chat with AI" buttons**
- [ ] **Step 3: Add transitions between these two screens using `AnimatePresence`**
- [ ] **Step 4: Verify navigation from Welcome to Choice**

### Task 4: Onboarding Flow (Phase 2) - Chat Interface

**Files:**
- Create: `src/components/onboarding/ChatOnboarding.tsx`, `src/components/ui/MessageBubble.tsx`

- [ ] **Step 1: Implement interactive chat screen with AI message and quick replies**
- [ ] **Step 2: Add typing indicator animation as seen in design**
- [ ] **Step 3: Implement logic to update `userProfile` in context after "Continue" is clicked**
- [ ] **Step 4: Transition to main app layout after onboarding completion**

### Task 5: Main App Layout & Strategy Screen

**Files:**
- Create: `src/components/layout/TopAppBar.tsx`, `src/components/layout/BottomNavBar.tsx`, `src/screens/StrategyScreen.tsx`

- [ ] **Step 1: Create reusable `TopAppBar` and `BottomNavBar` with glassmorphism effects**
- [ ] **Step 2: Implement `StrategyScreen` with the "Career Readiness" animated ring (65%)**
- [ ] **Step 3: Implement "Skills Gap" and "Salary Projection" widgets**
- [ ] **Step 4: Implement "Plan of Development" vertical roadmap**

### Task 6: Swipeable Jobs Interface

**Files:**
- Create: `src/screens/JobsScreen.tsx`, `src/components/jobs/JobCard.tsx`

- [ ] **Step 1: Create mock data for jobs (at least 5 items)**
- [ ] **Step 2: Implement `JobCard` with company info, salary, and skill analysis**
- [ ] **Step 3: Use Framer Motion `drag` to implement Tinder-style swiping with rotation**
- [ ] **Step 4: Add "Like" and "Nope" overlays that appear during swipe**
- [ ] **Step 5: Connect swipe actions to `AppContext` (tracking likes/dislikes)**

### Task 7: Profile Screen & Persistence

**Files:**
- Create: `src/screens/ProfileScreen.tsx`

- [ ] **Step 1: Implement `ProfileScreen` with user info and iOS-style settings list**
- [ ] **Step 2: Add "Logout" functionality (clears LocalStorage and resets state)**
- [ ] **Step 3: Final audit of design fidelity (check typography, spacing, and animations across all screens)**
- [ ] **Step 4: Run final verification of the full user flow**
