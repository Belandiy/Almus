# Spec: AI Career Strategist React SPA

**Goal:** Create a functional, interactive React SPA based on the provided `design.html`, featuring onboarding, skill analysis, a job swiping interface, and a career roadmap.

**Tech Stack:**
- React (Vite)
- TypeScript
- Tailwind CSS (for styling)
- Framer Motion (for high-quality animations/swipes)
- Lucide React (for icons, mapping to Material Symbols)
- LocalStorage (for state persistence)

## 1. Architecture & Components

### State Management (Context API)
- `AppContext`: Stores user profile, onboarding progress, liked/rejected jobs, and current screen.
- `persistence`: Syncs `AppContext` with `LocalStorage`.

### Navigation
- Simple state-based router (`currentStep`) for onboarding.
- Bottom navigation for the main application screens (Strategy, Jobs, Profile).

### Key Components
1. **Onboarding Flow:**
   - `WelcomeScreen`: The initial "Start" screen with floating robot.
   - `ChoiceScreen`: Selection between "Upload Resume" and "Chat with AI".
   - `ChatOnboarding`: Interactive chat for profile setup.
2. **Main App:**
   - `Layout`: Wrapper with TopAppBar and BottomNavBar.
   - `StrategyScreen`: Career readiness ring, skills gaps, and roadmap.
   - `JobsScreen`: Tinder-style swipeable job cards with skill analysis.
   - `ProfileScreen`: User settings and info.

## 2. Interactive Features
- **Swipes:** `JobsScreen` will use Framer Motion for physical card interactions (drag, rotate, opacity overlays for "Like"/"Nope").
- **Animations:** 
  - Floating animations for the AI robot.
  - Progress ring animation in `StrategyScreen`.
  - Staggered entry animations for list items and cards.
- **Transitions:** Smooth fade/slide transitions between application screens.

## 3. Data Mocking
- **Jobs:** A static set of job objects with `company`, `role`, `salary`, `matchPercentage`, `matchedSkills`, and `missingSkills`.
- **Roadmap:** Milestones based on the design's "Plan of Development".

## 4. Design Fidelity
- **Typography:** Manrope for headlines, Inter for body (via Google Fonts).
- **Colors:** Strict adherence to the Tailwind palette defined in `design.html`.
- **UI Details:** "Duolingo-style" buttons, glassmorphism cards, iOS-style settings lists.

## 5. Implementation Phases
- **Phase 1:** Setup project, theme, and basic routing.
- **Phase 2:** Implement full Onboarding flow with state persistence.
- **Phase 3:** Build Strategy and Profile screens.
- **Phase 4:** Implement the Swipeable Jobs interface with Framer Motion.
- **Phase 5:** Final polish, animations, and testing.
