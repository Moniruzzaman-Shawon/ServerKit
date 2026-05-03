# Installation

## Prerequisites

| Requirement | Notes |
|---|---|
| **Node.js 18+** | Required. Node 20+ is recommended. |
| **npm 9+** | Included with Node.js |
| **Git** | For cloning the repository |
| **Docker** | Optional — required for the Docker, Web Server, and Database pages |
| **UFW** | Optional — required for the Firewall view in the Network page |
| **iproute2 (`ss`)** | Required for the open-ports view. Included in most Ubuntu/Debian installs. |

ServerKit is designed for Ubuntu 22.04 LTS and later. It will run on any Linux distribution that satisfies the Node.js requirement.

---

## 1. Clone the repository

```bash
git clone https://github.com/your-username/serverkit.git
cd serverkit
```

---

## 2. Install dependencies

```bash
npm install
```

> **Note for Ubuntu users:** If the install fails on `node-pty` with a Python or `gyp` error, ensure the system Python 3 is used:
> ```bash
> npm install --python=/usr/bin/python3
> ```

---

## 3. Configure the environment

Copy the example environment file and open it in your editor:

```bash
cp .env.example .env
nano .env
```

### Setting your password

Locate the `SK_PASSWORD` line and replace the default value with a strong password of your choice:

```env
SK_PASSWORD=your-strong-password-here
```

This is the only credential used to log into ServerKit. There are no user accounts — it is a single-administrator panel.

You can also change the password at any time from within the app at **Settings → Security** without restarting the server.

### Required variables

| Variable | Description |
|---|---|
| `SK_PASSWORD` | **Required.** The login password for the panel. |
| `JWT_SECRET` | **Required.** A long, random string used to sign session tokens. Generate one with `openssl rand -hex 32`. |

### Optional variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_HOSTNAME` | `my-linux-server` | Display name shown in the sidebar and login screen. |
| `PORT` | `3000` | HTTP port the server listens on. |
| `MEDIA_ROOTS` | `/mnt/media,/mnt/webserver` | Comma-separated list of absolute paths the Media browser is allowed to access. |
| `DOCKER_SOCKET` | `/var/run/docker.sock` | Path to the Docker Unix socket. |
| `MINIO_ENDPOINT` | `http://localhost:9000` | HTTP endpoint where MinIO is reachable. |
| `MINIO_USER` | `minioadmin` | MinIO access key (username). |
| `MINIO_PASS` | `minioadmin` | MinIO secret key (password). |

---

## 4. Start the server

### Development

```bash
npm run dev
```

The panel will be available at `http://localhost:3000`.

### Production

For a production deployment, build the Next.js application first and then start the server:

```bash
npm run build
npm start
```

To keep the process running after you close the terminal, use a process manager:

```bash
# Using PM2
npm install -g pm2
pm2 start server.js --name serverkit
pm2 save
pm2 startup
```

---

## 5. First login

Open `http://<your-server-ip>:3000` in your browser. Enter the password you set in `SK_PASSWORD` and click **Sign in**.

After logging in you will land on the Dashboard. If you want to change your password, go to **Settings → Security**.

---

## Docker deployment

A `docker-compose.yml` is provided for containerized deployment:

```bash
cp .env.example .env
# Edit .env as described above
docker compose up -d
```

The Docker socket is mounted read-write into the container so the Docker management page can function. Adjust the volume paths in `docker-compose.yml` to match your media and web server mount points.

---

## Updating

```bash
git pull
npm install
npm run build   # if running in production mode
pm2 restart serverkit   # or however you manage the process
```

---

## Running tests

```bash
npm test
```

All 83 unit tests should pass. Coverage report:

```bash
npm run test:coverage
```
