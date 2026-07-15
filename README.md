# 🚀 AI Task Platform

An asynchronous task processing platform built using **React, Node.js, Express, MongoDB, Redis, BullMQ, Python Workers, Docker, and Kubernetes**.

Users can create text-processing tasks which are processed asynchronously by a worker service while monitoring their progress in real time.

---

## ✨ Features

- 🔐 JWT Authentication
- 📝 Create Text Processing Tasks
- ⚡ Asynchronous Processing using BullMQ
- 🧠 Python Worker
- 📊 Task Dashboard
- 📜 Task Logs
- 🐳 Dockerized Services
- ☸ Kubernetes Deployment
- 🔄 Redis Queue
- 💾 MongoDB Atlas Database

---

## 🏗 Architecture

```text
                React Frontend
                      │
                      ▼
             Express Backend API
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
     MongoDB Atlas           BullMQ Queue
                                   │
                                   ▼
                                Redis
                                   │
                                   ▼
                           Python Worker
                                   │
                                   ▼
                           Update MongoDB
```

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- TailwindCSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- JWT
- BullMQ

### Database

- MongoDB Atlas

### Queue

- Redis
- BullMQ

### Worker

- Python

### DevOps

- Docker
- Docker Compose
- Kubernetes

---

## 📂 Folder Structure

```text
ai-task-platform
│
├── backend
├── frontend
├── worker
├── k8s
├── docker-compose.yml
└── README.md
```

---

## 🐳 Docker

```bash
docker compose up --build
```

---

## ☸ Kubernetes

Apply all manifests

```bash
kubectl apply -f k8s/
```

Check Pods

```bash
kubectl get pods -n ai-task-platform
```

---

## 📡 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```
POST /api/tasks
GET /api/tasks
GET /api/tasks/:id
```

---

## 🔄 Task Flow

1. User creates a task.
2. Backend stores task in MongoDB.
3. BullMQ pushes job to Redis.
4. Python Worker consumes the job.
5. Worker processes the task.
6. MongoDB is updated with the result.
7. Frontend displays updated status.

---

## 🚀 Future Improvements

- Email Notifications
- Retry Failed Jobs
- Priority Queues
- Multiple Worker Replicas
- WebSockets for Live Updates
- Monitoring with Prometheus & Grafana

---

## 👩‍💻 Author

**Tanvi Lekshmi**

B.Tech Computer Science Engineering

Bennett University
