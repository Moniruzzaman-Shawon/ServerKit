# Network

The Network page gives you a real-time view of your server's network security posture — the UFW firewall state and rules, every port currently accepting connections, and the Tailscale VPN status.

---

## UFW Firewall

**UFW** (Uncomplicated Firewall) is the standard firewall management tool on Ubuntu. ServerKit reads UFW status and rules directly from the system.

### Status card

Shows whether UFW is active or inactive. The default policy shown is **deny incoming, allow outgoing**, which is the recommended baseline for a server.

### Rules table

When UFW is active, the rules table lists every configured rule:

| Column | Description |
|---|---|
| **To** | The destination port or service being controlled |
| **Action** | `ALLOW` (green) or `DENY` (red) |
| **From** | The source address or `Anywhere` |

### Managing UFW from the terminal

ServerKit displays firewall rules but does not modify them through the UI. Use the [Terminal](terminal.md) or SSH to make changes:

```bash
# Enable UFW with safe defaults
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (do this before enabling UFW or you will lock yourself out)
sudo ufw allow ssh

# Allow specific ports
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3000/tcp  # ServerKit

# Enable UFW
sudo ufw enable

# Check status
sudo ufw status verbose
```

---

## Open ports

The listening ports table shows every TCP and UDP port currently accepting connections on the host, sourced from `ss` (iproute2). This includes services running in Docker containers if they have host port bindings.

| Column | Description |
|---|---|
| **Port** | The port number (highlighted in orange) |
| **Proto** | `tcp` or `udp` |
| **Address** | The address the socket is bound to (`0.0.0.0` = all interfaces, `127.0.0.1` = localhost only) |
| **Process** | The process name owning the socket |

Use this table to audit what is reachable from the network. Ports bound to `127.0.0.1` are not accessible from outside the server.

---

## Tailscale

Tailscale creates a private, encrypted WireGuard mesh network between your devices — useful for accessing ServerKit and other services without exposing them to the public internet.

The Tailscale card shows the current connection status. If Tailscale is not installed, it shows "Unknown."

### Installing Tailscale

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Once connected, your server gets a private `100.x.x.x` IP address reachable only from your other Tailscale devices.

You can then bind ServerKit to a specific interface or access it at `http://100.x.x.x:3000` without opening any public firewall ports.

---

## Recommended port checklist

After setting up ServerKit and your server services, verify the following in the Open ports table:

| Port | Expected |
|---|---|
| `22` | SSH — if not using Tailscale, restrict to known IPs in UFW |
| `80` / `443` | HTTP/HTTPS — open if running a public web server |
| `3000` | ServerKit — consider restricting to trusted IPs or Tailscale only |
| `9000` / `9001` | MinIO — keep localhost-only unless intentionally public |
| `5432` / `3306` | Databases — should always be bound to `127.0.0.1` |
