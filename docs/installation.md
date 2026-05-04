# Installation

## Recommended: Docker Compose

The easiest and most reliable way to run ServerKit. Three isolated containers (Nginx, ServerKit, MinIO) start automatically on every boot — no process manager needed.

### Prerequisites

| Requirement | Notes |
|---|---|
| **Docker Engine** | Ubuntu: `sudo apt install docker.io` |
| **Docker Compose v2** | `docker compose version` — if missing, see [Install Compose](#install-docker-compose-v2) |
| **Linux** | Ubuntu 22.04 LTS or later recommended |

### 1. Clone the repository

```bash
git clone https://github.com/Moniruzzaman-Shawon/ServerKit.git
cd ServerKit
```

### 2. Configure the environment

```bash
cp .env.example .env
nano .env
```

Set at minimum:

```env
SK_PASSWORD=your-strong-password-here
JWT_SECRET=paste-openssl-output-here    # openssl rand -hex 32
NEXT_PUBLIC_HOSTNAME=my-linux-server    # display name shown in the UI
```

Full variable reference:

| Variable | Default | Description |
|---|---|---|
| `SK_PASSWORD` | — | **Required.** Login password for the panel. |
| `JWT_SECRET` | — | **Required.** Long random string for signing session tokens. |
| `NEXT_PUBLIC_HOSTNAME` | `my-linux-server` | Display name shown in the sidebar and login screen. |
| `MEDIA_ROOTS` | `/mnt/media,/mnt/webserver` | Comma-separated list of host paths the Media browser can access. |
| `DOCKER_SOCKET` | `/var/run/docker.sock` | Path to the Docker Unix socket. |
| `MINIO_ENDPOINT` | `http://minio:9000` | MinIO endpoint — keep as `http://minio:9000` when using Docker Compose. |
| `MINIO_USER` | `minioadmin` | MinIO access key. |
| `MINIO_PASS` | `minioadmin` | MinIO secret key. |

> **Note:** When running via Docker Compose, `MINIO_ENDPOINT` must be `http://minio:9000` (service name), not `localhost`.

### 3. Adjust media volume paths (optional)

Open `docker-compose.yml` and update the media volume mounts to match your setup:

```yaml
volumes:
  - /mnt/media:/mnt/media:ro
  - /mnt/webserver:/mnt/webserver:ro
```

Change the left-hand paths to wherever your media lives on the host.

### 4. Start the stack

```bash
docker compose up -d
```

Docker builds the ServerKit image and pulls Nginx and MinIO on the first run. This takes 2–3 minutes. Subsequent starts are instant.

### 5. First login

Open `http://<your-server-ip>` (port 80) in your browser. Sign in with your `SK_PASSWORD`.

The stack starts automatically on every reboot — no manual action needed. To stop it manually:

```bash
docker compose down
```

---

## Auto-start on boot

The Docker daemon is enabled on boot by default on Ubuntu. All three containers have `restart: unless-stopped`, so they come back up automatically whenever the machine restarts.

To verify:

```bash
systemctl is-enabled docker   # should print: enabled
docker compose ps              # all three containers should be Up
```

---

## Install Docker Compose v2

If `docker compose version` returns an error:

```bash
# Option A — install the official plugin package (recommended)
sudo apt install docker-compose-plugin

# Option B — install the binary for the current user only
mkdir -p ~/.docker/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.35.1/docker-compose-linux-x86_64 \
  -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
docker compose version
```

---

## Updating

```bash
git pull
docker compose up -d --build
```

Docker rebuilds the ServerKit image with the latest code and restarts only the containers that changed.

---

## Bare-metal / development install

Use this if you want to run without Docker or work on the codebase.

### Additional prerequisites

| Requirement | Notes |
|---|---|
| **Node.js 18+** | Node 20+ recommended |
| **npm 9+** | Included with Node.js |
| **iproute2 (`ss`)** | For the open-ports view — included in most Ubuntu installs |
| **lm-sensors** | For GPU temperature and power monitoring |

```bash
sudo apt install lm-sensors -y
sudo sensors-detect --auto
```

### Steps

```bash
git clone https://github.com/Moniruzzaman-Shawon/ServerKit.git
cd ServerKit
npm install
cp .env.example .env
nano .env   # set SK_PASSWORD, JWT_SECRET, and MINIO_ENDPOINT=http://localhost:9000
```

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm start
```

To keep the process alive across reboots, use PM2:

```bash
npm install -g pm2
pm2 start server.js --name serverkit
pm2 save
pm2 startup
```

The panel will be available at `http://localhost:3000`.

---

## Troubleshooting

**Port 80 already in use** — Another service (Apache, Caddy, etc.) is using port 80. Either stop it or change the Nginx port in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

Then access the app at `http://localhost:8080`.

**Container exits immediately** — Check logs:

```bash
docker compose logs serverkit
```

Common causes: missing `SK_PASSWORD` or `JWT_SECRET` in `.env`, or a bad volume path.

**Media page shows no files** — Confirm the volume paths in `docker-compose.yml` match `MEDIA_ROOTS` in `.env`, and that the host paths exist.

**node-pty build fails (bare-metal)** — Ensure build tools are present:

```bash
sudo apt install python3 make g++ linux-headers-$(uname -r)
npm install
```
