# Design Spec: Hybrid AI Platform Architecture

**Date:** 2026-06-02
**Status:** Approved
**Topic:** Transition from Monolith to Hybrid Microservices (FastAPI + Redis + Workers)

## 1. Problem Statement
The current monolithic structure (single FastAPI backend + React frontend) has several limitations for future scaling:
- **Resource Bottlenecks:** AI generation (Llama) is heavy and blocks the main API process.
- **Complexity:** Adding a "Projects Platform" and "Telegram Admin" into a single codebase will lead to "spaghetti code."
- **Scalability:** We need to be able to run the AI model on separate hardware (GPU) while keeping the API and TG Bot on a lightweight server.

## 2. Proposed Architecture (Option C: Hybrid Workers)
We will use a **Hybrid Async Architecture** orchestrated via **Docker Compose**.

### 2.1 Core Components
1. **Main API (FastAPI):**
   - Handles REST requests from the Frontend.
   - Manages business logic for Users, Projects, and Companies.
   - Interacts with PostgreSQL.
   - Enqueues AI tasks to Redis.
2. **AI Worker:**
   - Isolated service containing `llama.cpp` and the model.
   - Listens to the Redis queue for new tasks.
   - Writes results back to the DB or a response queue.
3. **TG Admin Bot:**
   - Telegram interface for Businesses and Admins.
   - Allows managing projects and monitoring system status.
4. **Redis:**
   - Message broker for inter-service communication.
5. **PostgreSQL:**
   - Primary persistent storage for structured data.

## 3. Data Flow
1. **User Request:** Frontend sends a message to `/chat`.
2. **Enqueuing:** Main API validates the request and puts a task into the Redis queue.
3. **Processing:** AI Worker picks up the task, performs inference, and saves the result to the database.
4. **Retrieval:** Frontend either polls the API or receives a WebSocket update with the AI response.

## 4. Implementation Phases

### Phase 1: Infrastructure & Containerization
- Create `docker-compose.yml`.
- Set up PostgreSQL and Redis containers.
- Containerize current Backend and Frontend.
- Migrate `vacancies.json` data to PostgreSQL.

### Phase 2: AI Decoupling
- Create `worker.py` (AI Worker).
- Implement task queue logic using `Celery` or `RQ` (Redis Queue).
- Update Main API to send tasks instead of direct model calls.

### Phase 3: New Modules
- Build the "Projects Platform" backend logic.
- Develop the "TG Admin Bot" as a separate service.
- Implement company registration and project posting workflows.

## 5. Success Criteria
- The Main API remains responsive even during heavy AI generation.
- The AI Worker can be deployed on a different machine without breaking the API.
- Modular code structure allowing independent development of the TG Bot and Projects platform.
