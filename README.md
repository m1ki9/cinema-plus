<h1 align="center">Cinema +</h1>
<p align="center">MongoDB, Expressjs, React/Redux, Nodejs</p>
<p align="center">
  <a href="https://hub.docker.com/r/m1ki9/cinema-backend"><img src="https://img.shields.io/badge/DockerHub-backend-blue?logo=docker" /></a>
  <a href="https://hub.docker.com/r/m1ki9/cinema-frontend"><img src="https://img.shields.io/badge/DockerHub-frontend-blue?logo=docker" /></a>
  <a href="https://github.com/m1ki9/cinema-plus/actions"><img src="https://img.shields.io/github/actions/workflow/status/m1ki9/cinema-plus/ci.yml?label=CI/CD&logo=github" /></a>
</p>

> Forked from [georgesimos/cinema-plus](https://github.com/georgesimos/cinema-plus) — dockerized, orchestrated with Docker Compose, with a CI/CD pipeline and Kubernetes manifests.

Cinema + is an online movie ticket booking system built with the MERN stack.

- Online Booking System
- Admin Dashboard
- Dark Theme UI

---

## Quick Start (Docker Compose)

```bash
# 1. Clone the repository
git clone https://github.com/m1ki9/cinema-plus.git
cd cinema-plus

# 2. Copy the env template
cp .env.example .env

# 3. Start all services
docker compose up -d

# 4. Open in browser
# http://localhost
```

### Demo Accounts

| Username | Password | Role |
|----------|----------|------|
| admin | admin | superadmin |
| user | user1234 | guest |
| user1 | user1234 | guest |
| user2 | user1234 | guest |

### Useful Commands

```bash
docker compose ps          # Service status
docker compose logs -f     # Live logs
docker compose down -v     # Stop and remove volumes
```

---

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   MongoDB   │
│  Nginx:80   │     │ Express:8080│     │    :27017   │
│  React SPA  │     │   REST API  │     │  StatefulSet│
└─────────────┘     └─────────────┘     └─────────────┘
```

| Service | Image | Port |
|---------|-------|------|
| MongoDB | mongo:6.0 | 27017 |
| Backend | cinema-backend (Node 18 Alpine) | 8080 |
| Frontend | cinema-frontend (Nginx 1.25 Alpine) | 80 |

---

## CI/CD Pipeline (GitHub Actions)

On every push to `master`:

1. **Build** — Docker images for backend and frontend
2. **Push** — Images to DockerHub tagged with `latest` and `sha-<commit>`
3. **CD** — Automatically update K8s manifests with the new image tag

```
Push code → GitHub Actions → DockerHub → K8s manifests update → ArgoCD deploy
```

- [CI/CD Workflow](.github/workflows/ci.yml)
- [Pipeline Runs](https://github.com/m1ki9/cinema-plus/actions)

---

## Kubernetes Deployment

```bash
# Create namespace and apply all manifests
kubectl apply -f k8s/

# Verify
kubectl get all -n cinema-app
```

### Manifests (`k8s/`)

| File | Resource |
|------|----------|
| `namespace.yml` | Namespace `cinema-app` |
| `backend-deployment.yml` | Deployment (2 replicas) + ConfigMap + Secret + PVC |
| `backend-service.yml` | ClusterIP Service :8080 |
| `frontend-deployment.yml` | Deployment (2 replicas) + ConfigMap |
| `frontend-service.yml` | ClusterIP Service :80 |
| `ingress.yml` | Nginx Ingress — routes API and frontend traffic |
| `mongodb-statefulset.yml` | StatefulSet + Headless Service + PVC + ConfigMap + Secret |

---

## ArgoCD (GitOps CD)

ArgoCD watches the `k8s/` folder and automatically deploys changes to the cluster.

```bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Register the application
kubectl apply -f argocd/application.yml

# Open dashboard
kubectl port-forward svc/argocd-server -n argocd 8888:443
# https://localhost:8888
```

---

## Project Structure

```
cinema-plus/
├── client/                     # React frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .dockerignore
├── server/                     # Express backend
│   ├── Dockerfile
│   └── .dockerignore
├── k8s/                        # Kubernetes manifests
├── argocd/                     # ArgoCD application
├── .github/workflows/ci.yml   # CI/CD pipeline
├── docker-compose.yml          # Docker Compose orchestration
├── mongo-init.sh               # Database seed script
└── .env.example                # Environment variable template
```

---

## Links

| Resource | Link |
|----------|------|
| DockerHub Backend | [m1ki9/cinema-backend](https://hub.docker.com/r/m1ki9/cinema-backend) |
| DockerHub Frontend | [m1ki9/cinema-frontend](https://hub.docker.com/r/m1ki9/cinema-frontend) |
| CI/CD Pipeline | [GitHub Actions](https://github.com/m1ki9/cinema-plus/actions) |
| Original Project | [georgesimos/cinema-plus](https://github.com/georgesimos/cinema-plus) |

---

## Screenshots

<details>
  <summary>Show screenshots</summary>
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/movie.png" />
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/booking.png" />
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/admin-dashboard.png" />
  <img src="https://github.com/georgesimos/readme-assets/blob/master/cinema-plus/admin-movies.png" />
</details>

---

License: MIT
