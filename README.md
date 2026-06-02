# Almus

**Almus** — интеллектуальный карьерный ассистент для студентов и выпускников на базе ИИ. Система помогает анализировать навыки, строить дорожные карты обучения и находить идеальные вакансии.

---

## 🚀 Быстрый старт

### Требования
*   Node.js (v18+)
*   Python (3.10+)
*   NPM / PNPM

### Установка

1.  Клонируйте репозиторий.
2.  **Скачайте модель ИИ:**
    *   Скачайте файл `Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf`.
    *   Рекомендуемый источник: [Hugging Face (Bartowski)](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf) или любой другой GGUF-репозиторий Llama 3.1 8B Instruct.
    *   Создайте папку `backend/models/` и поместите файл модели туда.
3.  Установите зависимости фронтенда:
    ```bash
    npm install
    ```
4.  Установите зависимости бэкенда:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

### Запуск

*   **Фронтенд:** `npm run dev`
*   **Бэкенд:** `cd backend && python main.py`

---

## 📁 Структура проекта

*   `src/` — Фронтенд на React + TypeScript.
*   `backend/` — Бэкенд на Python (FastAPI).
*   `docs/` — Документация проекта.
    *   `docs/specs/CORE_SPEC.md` — **Основная спецификация продукта**.
    *   `docs/superpowers/` — Планы и спецификации фич от ИИ-ассистента.

---

## 🛠 Технологический стек

*   **Frontend:** React, Vite, Tailwind CSS, TypeScript.
*   **Backend:** FastAPI (Python).
*   **AI:** OpenAI API / Claude / Llama.

---

## 📖 Документация

Вся детальная информация о бизнес-логике, архитектуре и планах развития находится в папке `docs/`.
Главный документ: [CORE_SPEC.md](./docs/specs/CORE_SPEC.md).
