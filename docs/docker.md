# Docker

The Docker page connects to the Docker daemon via the configured socket (`DOCKER_SOCKET` in `.env`, defaulting to `/var/run/docker.sock`) and gives you a real-time view of all containers on the host.

---

## Requirements

- Docker must be installed and running on the host.
- The user running ServerKit (or the Docker container it runs in) must have read/write access to the Docker socket.

To grant socket access without running as root:

```bash
sudo usermod -aG docker $USER
# Log out and back in for the change to take effect
```

---

## Creating a new container

Click the **New container** button (top-right of the summary row) to open the creation modal.

### Fields

| Field | Required | Description |
|---|---|---|
| **Image** | Yes | Docker image name and optional tag, e.g. `nginx:latest`, `postgres:16`, `redis`. |
| **Container name** | No | A custom name for the container. If left blank, Docker assigns a random name. |
| **Restart policy** | — | Controls how Docker restarts the container. Defaults to `unless-stopped` (recommended for services). |
| **Port mappings** | No | One or more `host port → container port` pairs. Click **Add port** to add a row. |
| **Environment variables** | No | `KEY=value` pairs injected into the container. Click **Add variable** to add a row. |
| **Volume mounts** | No | `host path : container path` pairs. Click **Add volume** to add a row. |

### Auto-pull

If the specified image is not present on the host, ServerKit automatically pulls it from Docker Hub before starting the container. The button label changes to indicate this is happening. No manual `docker pull` is required.

### After creation

The container list refreshes automatically once the container is running. You can then use the inline action buttons to stop, restart, view logs, or remove it.

---

## Summary counters

Three counters at the top of the page show at a glance:

| Counter | Description |
|---|---|
| **Running** | Containers currently in the `running` state |
| **Stopped** | Containers that are `exited` or otherwise not running |
| **Total** | All containers known to Docker, regardless of state |

The list refreshes automatically every 5 seconds.

---

## Container table

The table lists all containers. Each row shows:

| Column | Description |
|---|---|
| **Container** | Container name and shortened container ID |
| **Image** | The Docker image the container was created from |
| **Status** | Color-coded badge (green = running, amber = paused, red = stopped) plus Docker's status string (e.g., "Up 3 hours") |
| **Ports** | Exposed port mappings in `host:container` format |
| **Actions** | Context-sensitive action buttons (see below) |

### Filtering

Use the **All / Running / Exited** tabs above the table to filter the list by state.

---

## Container actions

Actions available depend on the container's current state:

| Action | Available when | Description |
|---|---|---|
| **Start** | Stopped | Starts the container |
| **Stop** | Running | Sends SIGTERM, then SIGKILL after a timeout |
| **Restart** | Running | Stops and immediately starts the container |
| **Logs** | Any | Expands an inline log viewer showing the last ~100 lines of stdout/stderr |
| **Remove** | Any | Removes the container. The container must be stopped first, or Docker will force-remove it. |

Buttons are disabled with a loading spinner while an action is in progress to prevent double-clicks.

---

## Inline log viewer

Clicking **Logs** on any container expands a log panel directly below that row. Logs are fetched once on open. The panel shows up to 100 lines in a scrollable monospace view. Click **Logs** again to collapse it.

---

## Troubleshooting

**"Loading containers…" persists** — ServerKit cannot reach the Docker socket. Check that Docker is running (`systemctl status docker`) and that the socket path in `.env` is correct.

**Actions return an error** — The Docker daemon may have rejected the request. Check the Docker daemon logs with `journalctl -u docker`.
