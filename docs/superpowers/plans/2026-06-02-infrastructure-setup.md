# Hybrid AI Platform: Phase 1 (Infrastructure) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Containerize the existing project using Docker Compose and set up PostgreSQL and Redis.

**Architecture:** A multi-container setup where the Frontend, Backend, PostgreSQL, and Redis run in isolation but communicate via a Docker network.

**Tech Stack:** Docker, Docker Compose, PostgreSQL 16, Redis 7, FastAPI, Vite.

---

### Task 1: Project Root Preparation

**Files:**
- Create: `.dockerignore`
- Modify: `.gitignore`

- [ ] **Step 1: Create .dockerignore**
Exclude node_modules, python venvs, and models from the build context.

```ignore
node_modules
.git
backend/venv
backend/__pycache__
backend/models/*.gguf
dist
.superpowers
```

- [ ] **Step 2: Update .gitignore**
Ensure Docker-related local data is ignored.

```ignore
# Docker data
.docker-data/
```

- [ ] **Step 3: Commit**

```bash
git add .dockerignore .gitignore
git commit -m "infra: add docker ignore and update gitignore"
```

---

### Task 2: Backend Containerization

**Files:**
- Create: `backend/Dockerfile`
- Modify: `backend/requirements.txt`

- [ ] **Step 1: Add new dependencies to requirements.txt**
Add `psycopg2-binary` for Postgres and `redis` for future queue work.

```text
fastapi
uvicorn
pydantic
llama-cpp-python
psycopg2-binary
redis
```

- [ ] **Step 2: Create backend/Dockerfile**
Use a Python base image. Note: We use a lightweight version but ensure build tools are available for llama-cpp if needed.

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- [ ] **Step 3: Commit**

```bash
git add backend/Dockerfile backend/requirements.txt
git commit -m "infra: add backend Dockerfile"
```

---

### Task 3: Frontend Containerization

**Files:**
- Create: `Dockerfile` (in root)
- Create: `nginx.conf`

- [ ] **Step 1: Create root Dockerfile for Frontend**
Use a multi-stage build: build with Node, serve with Nginx.

```dockerfile
# Build stage
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- [ ] **Step 2: Create nginx.conf**
Basic SPA config for Nginx.

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://backend:8000/;
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add Dockerfile nginx.conf
git commit -m "infra: add frontend Dockerfile and nginx config"
```

---

### Task 4: Docker Compose Orchestration

**Files:**
- Create: `docker-compose.yml`

- [ ] **Step 1: Create docker-compose.yml**
Define services: db, redis, backend, frontend.

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: minor_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build:
      context: ./backend
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/minor_db
      REDIS_URL: redis://redis:6379/0
    volumes:
      - ./backend:/app
      - ./backend/models:/app/models
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis

  frontend:
    build:
      context: .
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

- [ ] **Step 2: Verify configuration**
Run `docker-compose config` to check for syntax errors.

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml
git commit -m "infra: add docker-compose orchestration"
```

---

### Task 5: Database Schema Initialization

**Files:**
- Create: `backend/init_db.py`

- [ ] **Step 1: Create init_db.py**
A script to create initial tables (vacancies, users).

```python
import psycopg2
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/minor_db")

def init():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Create tables
    cur.execute("""
        CREATE TABLE IF NOT EXISTS vacancies (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            company TEXT,
            skills TEXT[],
            description TEXT
        );
    """)
    
    conn.commit()
    cur.close()
    conn.close()
    print("Database initialized!")

if __name__ == "__main__":
    init()
```

- [ ] **Step 2: Commit**

```bash
git add backend/init_db.py
git commit -m "db: add database initialization script"
```
