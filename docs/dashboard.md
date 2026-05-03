# Dashboard

The Dashboard is the first page you see after logging in. It gives you a live overview of the entire server — resource utilization, module status, network throughput, and recent activity.

---

## System stat cards

Four stat cards run across the top of the page, each updated in real time via WebSocket every 2 seconds.

| Card | What it shows |
|---|---|
| **CPU** | Current load percentage, core count, and clock speed. An orange sparkline traces the last 20 readings. |
| **RAM** | Used memory out of total, with a percentage bar. A blue sparkline traces history. |
| **System disk** | Used/total space on the root (`/`) partition. |
| **Media disk** | Used/total space on the first disk whose mount point contains `media` or `webserver`. Falls back to "Not mounted" if no such disk is detected. |

Disk cards do not include sparklines because disk usage changes slowly and does not benefit from per-second sampling.

---

## Module cards

Below the stat cards, six module cards link to the main sections of the panel:

| Module | What it covers |
|---|---|
| **Docker** | Containers, images, and compose stacks. Shows a live count of running containers. |
| **Media server** | File browser for your media directories. |
| **Web server** | Traefik reverse proxy and TLS certificate overview. |
| **Database** | PostgreSQL, MySQL, and SQLite status. |
| **Storage** | MinIO S3-compatible object storage and bucket management. |
| **Network** | UFW firewall rules, open ports, and Tailscale VPN status. |

Click any card to navigate to that module.

---

## Network I/O

Directly below the module cards, a live network widget shows the current inbound (↓) and outbound (↑) throughput on the primary network interface. Values are expressed in human-readable units (KB/s, MB/s, etc.) and refresh every 2 seconds.

---

## Recent activity

The activity panel on the right side of the page shows the last 20 actions logged by the system — container lifecycle events, login attempts, settings changes, and other server-side actions. Each entry shows:

- A colored dot indicating the severity level (info, warning, error)
- A short description of the event
- A relative timestamp ("2 minutes ago")

Activity is stored in the local SQLite database and persists across restarts.
