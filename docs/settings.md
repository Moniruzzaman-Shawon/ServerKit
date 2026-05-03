# Settings

The Settings page is divided into four tabs: **General**, **Security**, **Storage**, and **About**. Changes made here are persisted to the local SQLite database and survive server restarts.

---

## General

### Server identity

| Field | Description |
|---|---|
| **Hostname** | The display name shown in the sidebar header and login screen. Defaults to `my-linux-server`. Change this to match your server's actual hostname for easier identification. |
| **Port** | Read-only. The port ServerKit is listening on. Set via `PORT` in `.env` — a restart is required to change it. |

### Media browser roots

| Field | Description |
|---|---|
| **Allowed paths** | Comma-separated list of absolute directory paths the Media browser is permitted to access. Paths outside this list are blocked at the API level, even if the path is crafted to escape via `../` sequences. |

Example value: `/mnt/media,/mnt/webserver,/home/user/downloads`

After saving, the change takes effect immediately for new Media browser requests. A server restart is **not** required.

### Docker

| Field | Description |
|---|---|
| **Docker socket** | Read-only. The Unix socket path used to communicate with the Docker daemon. Set via `DOCKER_SOCKET` in `.env`. Requires a restart to change. |

Click **Save changes** to persist General and Media settings to the database.

---

## Security

### Changing your password

1. Enter your **current password**
2. Enter a **new password** (minimum 8 characters)
3. **Confirm** the new password
4. Click **Save changes**

If the change succeeds, you will be automatically signed out after 2 seconds and redirected to the login page. Sign in with your new password.

**Rules:**
- The new password must be at least 8 characters.
- The new and confirm fields must match.
- The current password must be correct.

The new password is stored in the SQLite database. Once set, it takes precedence over the `SK_PASSWORD` environment variable. This means you can deploy with a default password in `.env` and rotate it securely through the UI without editing environment files.

To reset to the `.env` password (for example, if you are locked out), clear the database password entry:

```bash
# From the server, using sqlite3
sqlite3 /path/to/serverkit.db "DELETE FROM settings WHERE key='password';"
```

Then restart ServerKit. It will fall back to `SK_PASSWORD` from `.env`.

### Session information

Sessions are JWT tokens (HS256 algorithm) stored in a `httpOnly` cookie named `sk_token`. They expire after **7 days**. Changing your password immediately invalidates all existing sessions — any other browser windows logged in will be redirected to the login page on their next request.

---

## Storage

Configures the MinIO S3 connection used by the [Storage page](storage.md).

| Field | Description |
|---|---|
| **Endpoint URL** | The HTTP(S) address where MinIO is reachable, e.g. `http://localhost:9000` |
| **Access key** | The MinIO access key (username), e.g. `minioadmin` |
| **Secret key** | Read-only in the UI. Set via `MINIO_PASS` in `.env`. |

Click **Save changes** to persist the endpoint and access key to the database. The secret key must be changed in `.env` and requires a server restart.

---

## About

The About tab displays live system information fetched from the host at page load:

| Field | Description |
|---|---|
| **ServerKit** | Application version |
| **Node.js** | Runtime version |
| **OS** | Linux distribution and release version |
| **Kernel** | Kernel version string |
| **Architecture** | CPU architecture (e.g., `x64`, `arm64`) |
| **CPU** | CPU brand name with physical core and thread counts |
| **Uptime** | Time since last reboot, formatted as days/hours/minutes |
| **Hostname** | The system hostname reported by the OS |

This information is read-only and sourced from `systeminformation` at the time the tab is opened. Reload the page to refresh it.
