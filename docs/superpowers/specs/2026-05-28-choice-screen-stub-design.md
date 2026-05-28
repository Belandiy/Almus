# Design Spec: Choice Screen "Upload Resume" Stub

## Overview
Implement a placeholder (stub) for the "Upload Resume" feature on the onboarding choice screen. Since the feature is not yet available, clicking the button should trigger a modal notification instead of navigating further.

## User Flow
1. User reaches the `ChoiceScreen`.
2. User clicks on "Загрузить резюме".
3. A modal appears with the text "Данный функционал пока не доступен".
4. User clicks "Понятно" to close the modal and return to the choice screen.
5. User clicks "Пообщаться с ИИ" to proceed to the chat onboarding.

## Components

### ChoiceScreen (`src/components/onboarding/ChoiceScreen.tsx`)
- **State**: `showStubModal` (boolean).
- **UI Changes**:
    - Update "Upload Resume" button `onClick` to set `showStubModal` to `true`.
    - Add an `AnimatePresence` block for the modal overlay.
    - **Modal Overlay**:
        - `fixed inset-0 z-[100]`
        - `bg-black/40 backdrop-blur-sm`
        - Centered card: `bg-surface rounded-3xl p-xl max-w-[320px] text-center shadow-2xl`
        - Icon: `info` (Material Symbols)
        - Title: "Функционал в разработке"
        - Message: "Загрузка резюме будет доступна в ближайшее время. Пока вы можете пообщаться с нашим ИИ-ассистентом."
        - Button: "Понятно" (primary style)

## Technical Details
- Use `framer-motion` for the modal entrance/exit animations.
- Use existing project styles (Tailwind + Material Design 3 tokens if applicable).

## Success Criteria
- Clicking "Загрузить резюме" shows the modal.
- Modal can be closed.
- Clicking "Пообщаться с ИИ" still goes to the chat screen.
- Layout remains responsive and consistent with the app's aesthetic.
