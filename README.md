# DevOps Mini Project — End-to-End Pipeline

> IT Business School — Module: Pratique DevOps, Chaînes d'outils et Automatisation — 2026

---

## Project Overview

A simple but fully industrialized web application demonstrating a complete DevOps pipeline from code to production.

- **Frontend**: React (landing page served via Nginx)
- **Backend**: Node.js / Express (REST API + Prometheus metrics)
- **Pipeline**: GitHub Actions CI/CD → DockerHub → Kubernetes (Minikube) → ArgoCD
- **Security**: Trivy, npm audit, GitHub Secrets
- **Monitoring**: Prometheus + Grafana

---

## Architecture

```
Developer
   │
   ├── git push
   │
GitHub Actions CI
   ├── Lint + Test
   ├── SonarCloud analysis
   ├── Trivy security scan
   └── Docker build + push → DockerHub
                                │
                           ArgoCD (GitOps)
                                │
                        Kubernetes (Minikube)
                         ├── frontend pod(s)
                         └── backend pod(s)
                                │
                           Prometheus ← /metrics
                                │
                            Grafana dashboard
```

---

## Repository Structure

```
devops-project/
├── frontend/           # React app
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── nginx.conf
├── backend/            # Express API
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── .eslintrc.json
├── k8s/                # Kubernetes manifests
│   ├── namespace.yaml
│   ├── backend.yaml
│   ├── frontend.yaml
│   └── argocd-app.yaml
├── docker/             # Docker Compose + Prometheus config
│   ├── docker-compose.yml
│   └── prometheus.yml
├── .github/
│   └── workflows/
│       └── ci.yml      # Full CI/CD pipeline
└── sonar-project.properties
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/api/health` | Health check (status + uptime) |
| GET | `/api/info` | Project info + stack |
| GET | `/metrics` | Prometheus metrics |

---

## Running Locally

### With Docker Compose

```bash
cd docker
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Without Docker

```bash
# Backend
cd backend && npm install && npm start

# Frontend (separate terminal)
cd frontend && npm install && npm start
```

---

## CI/CD Pipeline

The pipeline runs on every push to `main` or `dev`:

1. **Lint** — ESLint on backend and frontend
2. **Test** — Jest unit tests with coverage
3. **SonarCloud** — Code quality analysis
4. **Security** — npm audit + Trivy image scan (fails on CRITICAL)
5. **Docker** — Build and push images to DockerHub
6. **Deploy** — ArgoCD auto-syncs from k8s/ folder

---

## Kubernetes Deployment

```bash
# Start Minikube
minikube start --memory=2200mb --cpus=2

# Apply manifests
kubectl apply -f k8s/

# Check pods
kubectl get pods -n devops-project
```

---

## Monitoring

Prometheus scrapes `/metrics` from the backend every 15 seconds.
Grafana dashboard shows:
- HTTP request rate
- Response times
- Pod uptime

---

## GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | DockerHub username |
| `DOCKER_PASSWORD` | DockerHub password |
| `SONAR_TOKEN` | SonarCloud project token |

---

## DevOps Pipeline Phases

| Phase | Tool |
|-------|------|
| Plan | GitHub Projects |
| Code | Git + GitHub |
| Build | npm, Docker |
| Test | Jest, ESLint |
| Release | DockerHub |
| Deploy | Kubernetes + ArgoCD |
| Operate | Kubernetes |
| Monitor | Prometheus + Grafana |
| Improve | SonarCloud reports |
