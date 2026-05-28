# Choice Screen "Upload Resume" Stub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a placeholder modal for the "Upload Resume" feature on the Choice Screen to inform users it's not yet available.

**Architecture:** Use React state to manage modal visibility and Framer Motion for animations. The modal will be a centered card with a backdrop blur.

**Tech Stack:** React, Framer Motion, Tailwind CSS, Material Symbols.

---

### Task 1: Modify ChoiceScreen to include the stub modal

**Files:**
- Modify: `src/components/onboarding/ChoiceScreen.tsx`

- [ ] **Step 1: Update imports to include AnimatePresence and useState**

```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
```

- [ ] **Step 2: Initialize showStubModal state**

Inside `ChoiceScreen` component:
```tsx
const [showStubModal, setShowStubModal] = useState(false);
```

- [ ] **Step 3: Update "Upload Resume" button action**

Find the button for "Загрузить резюме" and change `onClick`:
```tsx
          {/* Option 1: Upload Resume */}
          <button
            onClick={() => setShowStubModal(true)}
            aria-label="Загрузить резюме для анализа ИИ"
            // ... rest of props
```

- [ ] **Step 4: Add the Modal Overlay component**

Add the `AnimatePresence` block at the end of the `motion.div` in `ChoiceScreen.tsx`:

```tsx
      {/* ... main content ... */}
      
      <AnimatePresence>
        {showStubModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-md bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-container rounded-[32px] p-xl max-w-[340px] w-full text-center shadow-2xl flex flex-col items-center gap-md border border-surface-variant/30"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl">info</span>
              </div>
              <div className="space-y-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Функционал в разработке</h3>
                <p className="font-body-md text-body-md text-on-surface-variant px-2">
                  Загрузка резюме будет доступна в ближайшее время. Пока вы можете пообщаться с нашим ИИ-ассистентом.
                </p>
              </div>
              <button
                onClick={() => setShowStubModal(false)}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-label-lg hover:bg-primary/90 transition-all active:scale-95 mt-2"
              >
                Понятно
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
```

- [ ] **Step 5: Verify the changes**

1. Click on "Загрузить резюме" -> Modal appears.
2. Click "Понятно" -> Modal disappears.
3. Click "Пообщаться с ИИ" -> Navigation to chat works.

- [ ] **Step 6: Commit**

```bash
git add src/components/onboarding/ChoiceScreen.tsx
git commit -m "feat: add stub modal for upload resume feature"
```
