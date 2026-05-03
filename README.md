<p align="center">
  <img src="logo/serverkit-banner.svg" alt="ServerKit" width="800" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-f97316?style=flat-square" alt="version" />
  <img src="https://img.shields.io/badge/license-MIT-388bfd?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-56d364?style=flat-square&logo=node.js&logoColor=white" alt="node" />
  <img src="https://img.shields.io/badge/platform-Linux-8b949e?style=flat-square&logo=linux&logoColor=white" alt="platform" />
  <img src="https://img.shields.io/badge/Next.js-15-white?style=flat-square&logo=next.js&logoColor=black" alt="nextjs" />
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

## System Architecture

```
Browser
  │
  ├── HTTP + WebSocket
  │
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
    (docker.sock)       (MEDIA_ROOTS)     (settings)       (object storage)
```

**Authentication** — A single administrator password is configured in `.env` and can be changed at runtime through the Settings panel. Every request is validated by Next.js middleware that checks a JWT stored in an `httpOnly` cookie. Sessions are signed with HS256 and expire after 7 days.

**Real-time layer** — Socket.io shares the same HTTP server as Next.js through a custom `server.js` entry point. Two namespaces handle all real-time traffic: `/stats` pushes system telemetry every 2 seconds, and `/terminal` carries bidirectional PTY I/O.

**Thermal layer** — CPU temperature is read directly from `/sys/class/thermal/` (no root required). GPU temperature and power draw are parsed from `sensors -j` (`lm-sensors` package). Both are polled every 3 seconds via a dedicated REST endpoint.

**Security model** — The file browser enforces a strict path allowlist (`MEDIA_ROOTS` environment variable). Shell commands run through a fixed allowlist in `lib/shell.js`; anything outside it is rejected. Docker API calls are scoped to the configured socket path. All routes except `/login` and `/api/auth/login` require a valid JWT.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Runtime | Node.js 18+ |
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

## Requirements

| Requirement | Notes |
|---|---|
| **Node.js 18+** | Node 20+ recommended |
| **Linux** | Ubuntu 22.04 LTS or later recommended |
| **Docker** | Optional — required for Docker, Web Server, and Database pages |
| **lm-sensors** | Optional — required for GPU temperature and power monitoring |
| **Tailscale** | Optional — required for the Tailscale peer map on the Network page |

Install `lm-sensors` if not already present:

```bash
sudo apt install lm-sensors -y
sudo sensors-detect --auto
```

---

## Quick Start

```bash
git clone https://github.com/Moniruzzaman-Shawon/ServerKit.git
cd ServerKit
npm install
cp .env.example .env
# Open .env and set SK_PASSWORD and JWT_SECRET before continuing
npm run dev
```

Open `http://localhost:3000` and sign in with your `SK_PASSWORD`.

For full prerequisites, environment variable reference, and production deployment instructions, see the **[Installation Guide](docs/installation.md)**.

---

## Documentation

| Guide | What it covers |
|---|---|
| [Installation](docs/installation.md) | Prerequisites, environment setup, password configuration, first login, production deployment |
| [Remote Access](docs/remote-access.md) | HTTPS via Caddy or Tailscale serve, domain setup, access from any device |
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
