<p align="center">
  <img src="logo/serverkit-banner.svg" alt="ServerKit" width="800" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-f97316?style=flat-square" alt="version" />
  <img src="https://img.shields.io/badge/license-MIT-388bfd?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-56d364?style=flat-square&logo=node.js&logoColor=white" alt="node" />
  <img src="https://img.shields.io/badge/platform-Linux-8b949e?style=flat-square&logo=linux&logoColor=white" alt="platform" />
  <img src="https://img.shields.io/badge/Next.js-15-white?style=flat-square&logo=next.js&logoColor=black" alt="nextjs" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white" alt="docker" />
  <img src="https://img.shields.io/badge/Nginx-1.27-009639?style=flat-square&logo=nginx&logoColor=white" alt="nginx" />
</p>

<br />

A self-hosted Linux server management panel built for homelab and personal server environments. ServerKit consolidates everything you need into a single, browser-based interface — real-time resource monitoring, Docker container management, media file streaming, firewall control, S3 object storage, and a full browser terminal — all protected behind a secure, password-authenticated session.

---

## Features

- **Real-time system dashboard** — Live CPU, RAM, disk, CPU temperature, and GPU power draw pushed every 2 seconds via WebSocket, with sparkline history graphs
- **Thermal monitoring** — CPU package temperature (via Linux sysfs) and GPU temperature + power draw (via `lm-sensors`); color-coded green → amber → red as heat rises
- **Docker management** — Inspect, start, stop, restart, and remove containers; create new containers via a built-in modal with auto-pull; view live logs inline
- **Media file browser & player** — Browse host directories, play videos and audio, preview images, and download files — all in-browser; path traversal protected by an explicit root allowlist
- **Web server overview** — Status panel for Traefik-managed reverse proxy services and TLS certificates
- **Database panel** — Status and connection overview for PostgreSQL, MySQL, and Redis instances running as Docker containers
- **Object storage** — Full MinIO S3 bucket management: create buckets, delete buckets (with object drain), view object counts and sizes, and copy S3 credentials for external tools
- **Network monitor** — UFW firewall status, all listening TCP/UDP ports, and a live Tailscale peer map showing every connected device with hostname, IP, OS, and online status
- **Browser terminal** — Full PTY session streamed over WebSocket and rendered with xterm.js — no SSH client or key management needed
- **Settings panel** — Hostname, media roots, Docker socket path, password management, MinIO credentials, and live system information
- **Fully responsive** — Works on phones, tablets, iPads, and desktops from 360 px up; sidebar collapses to a slide-in drawer on small screens
- **Secure by default** — Login rate limiting (5 attempts / IP / 15 min), JWT `httpOnly` sessions, security headers (HSTS, X-Frame-Options, CSP directives), and zero open ports via Tailscale serve

---

## Requirements

| Requirement | Notes |
|---|---|
| **Docker** | Required — [install guide](https://docs.docker.com/engine/install/) |
| **Docker Compose** | v2 plugin (`docker compose`) — installed alongside Docker Engine |
| **Linux** | Ubuntu 22.04 LTS or later recommended |
| **Tailscale** | Optional — for zero-config remote access and the Tailscale peer map |
| **lm-sensors** | Optional — included in the Docker image; needed only for bare-metal installs |

---

## Installation

### Option 1 — Automated (recommended)

Clone the repo and run the installer. It checks prerequisites, prompts for a password, auto-generates a JWT secret, and starts the stack.

```bash
git clone https://github.com/Moniruzzaman-Shawon/ServerKit.git
cd ServerKit
bash install.sh
```

Open `http://localhost` and sign in with the password you chose.

---

### Option 2 — Manual (Docker Compose)

**1. Clone and configure**

```bash
git clone https://github.com/Moniruzzaman-Shawon/ServerKit.git
cd ServerKit
cp .env.example .env
```

**2. Edit `.env`**

Open `.env` in any editor and set the two required values:

```env
SK_PASSWORD=your-strong-password
JWT_SECRET=                        # generate with: openssl rand -hex 32
```

**3. Start the stack**

```bash
docker compose up -d
```

Open `http://localhost` (port 80) and sign in.

---

### Option 3 — Bare-metal / Development

```bash
git clone https://github.com/Moniruzzaman-Shawon/ServerKit.git
cd ServerKit
npm install
cp .env.example .env
# Edit .env — set SK_PASSWORD and JWT_SECRET
npm run dev        # dev mode with live reload
# or:
npm run build && npm start   # production mode
```

Open `http://localhost:3000` and sign in with your `SK_PASSWORD`.

---

### Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `SK_PASSWORD` | Yes | — | Login password |
| `JWT_SECRET` | Yes | — | HS256 signing secret (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_HOSTNAME` | No | `my-linux-server` | Display name shown in the UI |
| `PORT` | No | `3000` | Internal Node.js port |
| `MEDIA_ROOTS` | No | `/mnt/media,/mnt/webserver` | Comma-separated paths for the media browser |
| `DOCKER_SOCKET` | No | `/var/run/docker.sock` | Docker daemon socket path |
| `MINIO_ENDPOINT` | No | `http://minio:9000` | MinIO S3 endpoint |
| `MINIO_USER` | No | `minioadmin` | MinIO root username |
| `MINIO_PASS` | No | `minioadmin` | MinIO root password |
| `COOKIE_SECURE` | No | `false` | Set `true` only when serving over HTTPS |
| `DB_PATH` | No | `./data/serverkit.db` | SQLite database path |

---

### Cloud VM Notes

ServerKit works on any VPS (DigitalOcean, Hetzner, AWS EC2, etc.) with Docker installed. The only difference from bare-metal is that thermal/GPU sensors won't be available.

Remove the sysfs volume mounts from `docker-compose.yml` before starting:

```yaml
# Remove or comment out these lines:
# - /sys/class/thermal:/sys/class/thermal:ro
# - /sys/class/hwmon:/sys/class/hwmon:ro
# - /sys/devices:/sys/devices:ro
```

The temperature and GPU power cards will display "No sensor detected" — everything else works normally.

---

### Enabling HTTPS

To serve over HTTPS (required if `COOKIE_SECURE=true`), put Caddy or Nginx in front as a reverse proxy.

**Caddy example** (auto HTTPS with Let's Encrypt):

```
yourdomain.com {
    reverse_proxy localhost:80
}
```

Then set in `.env`:

```env
COOKIE_SECURE=true
```

And restart: `docker compose up -d`

---

## Usage

### Logging In

Navigate to `http://<your-server-ip>` and enter your `SK_PASSWORD`. Sessions last 7 days. The logo in the top-left of the sidebar returns you to the dashboard from any page.

---

### Dashboard

The dashboard gives you a live overview of your server at a glance:

- **Stat cards** (top row) — CPU load, RAM usage, disk usage, CPU temperature, GPU power draw — all updated every 2 seconds
- **Module cards** — quick links to each section of ServerKit
- **Network I/O** — live inbound/outbound throughput on the primary interface
- **Activity feed** — the last 30 events logged across all modules (container actions, setting changes, etc.)

---

### Docker

Manage all containers on your host:

| Action | How |
|---|---|
| View containers | Navigate to **Docker** — all containers listed with status, image, ports |
| Start / Stop / Restart | Click the action buttons in the container row |
| View logs | Click **Logs** on any container — shows the last 80 lines |
| Remove a container | Click **Remove** (stopped containers only) |
| Create a new container | Click **New Container** — enter image name, optional name/ports/env vars, click **Create** (image is auto-pulled if not present) |

---

### Media Browser

Browse and play files from the paths defined in `MEDIA_ROOTS`:

- Navigate directories with the breadcrumb path bar
- Click any **video or audio file** to open the in-browser player
- Click any **image** to open the preview modal
- Click **Download** on any file to save it locally
- Access is restricted to `MEDIA_ROOTS` — no path traversal outside those roots

To change the media roots at runtime, go to **Settings → General → Media Roots**.

---

### Terminal

A full shell session directly in your browser:

- Navigate to **Terminal** — a PTY session opens automatically
- Runs `bash` (or the default shell) as the container user
- The terminal resizes automatically with your browser window
- Close the tab or navigate away to end the session

---

### Storage (MinIO S3)

Manage S3-compatible object storage:

| Action | How |
|---|---|
| List buckets | Navigate to **Storage** |
| Create a bucket | Click **New Bucket** — name must be 3–63 lowercase alphanumeric characters or hyphens |
| Delete a bucket | Click **Delete** — all objects are drained first |
| Get S3 credentials | Shown on the Storage page — copy endpoint, access key, and secret key for use in external tools (e.g. `rclone`, `aws-cli`, Cyberduck) |

---

### Network

- **Firewall** — UFW status and all active rules
- **Open ports** — every listening TCP/UDP port on the host with process name
- **Tailscale peers** — all devices on your Tailscale network with hostname, IP addresses, OS, and online status (requires Tailscale installed on the host)

---

### Settings

| Tab | What you can change |
|---|---|
| **General** | Display hostname, media root paths, Docker socket path |
| **Security** | Change login password (requires current password, minimum 8 characters) |
| **Storage** | MinIO endpoint, access credentials |
| **About** | OS version, CPU model, Node.js version, ServerKit version |

---

## Maintenance

```bash
# Stop all services
docker compose down

# View live logs
docker compose logs -f serverkit

# Update to the latest version
git pull
docker compose up -d --build

# Back up settings and activity log
cp -r ./data ./data.bak
```

---

## System Architecture

```
Browser / Tailscale HTTPS
  │
  ▼
┌─────────────────────────────────────┐
│  Nginx 1.27 (port 80)               │
│  • Reverse proxy                    │
│  • WebSocket upgrade                │
│  • SSE / streaming buffering off    │
│  • 500 MB upload limit              │
└───────────────┬─────────────────────┘
                │  http://serverkit:3000
                ▼
┌──────────────────────────────────────────────────────┐
│  Node.js Custom Server  (server.js)                  │
│                                                      │
│  ┌─────────────────────┐   ┌──────────────────────┐  │
│  │  Next.js 15         │   │  Socket.io           │  │
│  │  App Router         │   │                      │  │
│  │                     │   │  /stats namespace    │──┼──► systeminformation
│  │  Middleware (JWT)   │   │  /terminal namespace │──┼──► node-pty (PTY)
│  │  API Routes         │   │                      │  │
│  └──────────┬──────────┘   └──────────────────────┘  │
│             │                                        │
│  ┌──────────▼─────────────────────────────────────┐  │
│  │  lib/                                          │  │
│  │  ├── auth.js     JWT signing & verification    │  │
│  │  ├── docker.js   Container lifecycle via API   │  │
│  │  ├── minio.js    MinIO S3 bucket management    │  │
│  │  ├── fs.js       Path-safe directory listing   │  │
│  │  ├── shell.js    Allowlisted shell commands    │  │
│  │  └── db.js       Settings & activity log       │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
          │                  │                │                │
          ▼                  ▼                ▼                ▼
    Docker daemon       Filesystem        SQLite           MinIO S3
    (docker.sock)       (MEDIA_ROOTS)     (settings)       (port 9000)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Runtime | Node.js 20 (Alpine) |
| Reverse proxy | Nginx 1.27 |
| Containerization | Docker Compose |
| Real-time transport | Socket.io |
| Browser terminal | node-pty · xterm.js |
| System telemetry | systeminformation · lm-sensors |
| Thermal / power | Linux sysfs · lm-sensors (`sensors -j`) |
| Docker API | dockerode |
| Object storage | MinIO JS SDK |
| Authentication | jose (JWT HS256) |
| Persistence | better-sqlite3 |
| Styling | Tailwind CSS |

---

## Documentation

| Guide | What it covers |
|---|---|
| [Installation](docs/installation.md) | Prerequisites, Docker Compose setup, bare-metal setup, environment variables, first login |
| [Remote Access](docs/remote-access.md) | HTTPS via Tailscale serve or Caddy, access from any device |
| [Dashboard](docs/dashboard.md) | Real-time stats, temperature, GPU power, module cards, network I/O, activity log |
| [Docker](docs/docker.md) | Container list, lifecycle actions, log viewer, creating new containers |
| [Media Server](docs/media-server.md) | File browser, video/audio player, image preview, download, path allowlist |
| [Web Server](docs/web-server.md) | Traefik reverse proxy, services overview |
| [Database](docs/database.md) | PostgreSQL, MySQL, and Redis status panels |
| [Storage](docs/storage.md) | MinIO S3 buckets — create, delete, object counts, S3 credentials |
| [Network](docs/network.md) | UFW firewall rules, listening ports, Tailscale peer map |
| [Terminal](docs/terminal.md) | Browser PTY session, keyboard shortcuts, resize behavior |
| [Settings](docs/settings.md) | General config, password management, storage credentials, system info |

---

## Author

**Moniruzzaman Shawon** — [m.zaman.djp@gmail.com](mailto:m.zaman.djp@gmail.com)

## License

MIT © 2026 Moniruzzaman Shawon — see [LICENSE](LICENSE) for details.
