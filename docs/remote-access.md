# Remote Access

This guide covers two ways to access ServerKit securely from any device — phone, tablet, laptop, or another PC — from anywhere in the world.

| Method | Requires | Best for |
|---|---|---|
| **Option A — Caddy + domain** | Public IP, domain name, ports 80/443 open | Production, sharing with others |
| **Option B — Tailscale serve** | Tailscale installed on server and client | Personal / homelab, no domain needed |

---

## Option B — Tailscale serve (easiest, no domain required)

If you have Tailscale installed on both your server and your devices, this is the simplest path. You get automatic HTTPS with a valid TLS certificate and zero open firewall ports.

### 1. Install Tailscale on the server

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

### 2. Enable MagicDNS and HTTPS certificates

In the [Tailscale admin console](https://login.tailscale.com/admin/dns):
- Turn on **MagicDNS**
- Turn on **HTTPS Certificates**

### 3. Start ServerKit

```bash
docker compose up -d
```

### 4. Expose via Tailscale serve

```bash
tailscale serve --bg http://localhost:80
```

Tailscale provisions a TLS certificate automatically. Your panel is now reachable at:

```
https://<your-machine-name>.<tailnet-name>.ts.net
```

### 5. Install Tailscale on your devices

- **iOS / iPadOS** — [Tailscale on the App Store](https://apps.apple.com/app/tailscale/id1470499037)
- **Android** — Tailscale on Google Play
- **macOS / Windows / Linux** — tailscale.com/download

Connect each device to your Tailscale account and the ServerKit URL works immediately — no port forwarding, no VPN config files, no certificates to manage.

---

## Option A — Caddy + public domain

### What you need

- A Linux server with a **public IP address**
- A **domain name** with an A record pointing to that IP
- Ports **80** and **443** open in your firewall (UFW)
- Caddy installed on the server

Caddy handles HTTPS and TLS certificate renewal automatically.

---

### Step 1 — Point your domain to the server

In your DNS provider's dashboard, create an A record:

```
Type:  A
Name:  serverkit          (gives you serverkit.yourdomain.com)
Value: YOUR_SERVER_IP
TTL:   300
```

Wait a few minutes for DNS to propagate. Verify it resolves:

```bash
ping serverkit.yourdomain.com
```

---

### Step 2 — Open firewall ports

```bash
sudo ufw allow 80/tcp    # HTTP (Caddy uses this for ACME challenge)
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 3000       # Block direct access to the app port
sudo ufw reload
```

> Port 3000 must be blocked from the outside. All traffic should go through Caddy on 443.

---

### Step 3 — Install Caddy

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

---

### Step 4 — Configure Caddy

Copy the included `Caddyfile` to the system location and edit your domain:

```bash
sudo cp Caddyfile /etc/caddy/Caddyfile
sudo nano /etc/caddy/Caddyfile
```

Change `serverkit.yourdomain.com` to your actual domain, then reload:

```bash
sudo systemctl reload caddy
```

Caddy will automatically obtain a TLS certificate from Let's Encrypt within seconds.

---

### Step 5 — Start ServerKit

### With Docker (recommended)

```bash
cp .env.example .env
nano .env   # Set SK_PASSWORD and JWT_SECRET
docker compose up -d
```

Then point Caddy to port 80 (Nginx):

```
serverkit.yourdomain.com {
    reverse_proxy localhost:80
}
```

### Without Docker

```bash
npm run build
npm start
```

Use PM2 to keep it running:

```bash
npm install -g pm2
pm2 start server.js --name serverkit
pm2 save && pm2 startup
```

---

### Step 6 — Access from any device

Open your browser on **any device, anywhere**:

```
https://serverkit.yourdomain.com
```

Sign in with your `SK_PASSWORD`. The session lasts 7 days — you stay logged in on each device until you sign out or the token expires.

**Supported on:**
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome) — the UI is fully usable on phone
- Tablet browsers
- Any device with a modern browser — no app to install

---

### Security in production

The following are enforced automatically once the app is running behind Caddy:

| Protection | How |
|---|---|
| **HTTPS / TLS** | Caddy with automatic Let's Encrypt certificate |
| **HSTS** | `Strict-Transport-Security` header — browsers never fall back to HTTP |
| **Login rate limiting** | 5 failed attempts per IP locks out for 15 minutes |
| **Session security** | JWT in `httpOnly` cookie — inaccessible to JavaScript |
| **Clickjacking protection** | `X-Frame-Options: SAMEORIGIN` header |
| **MIME sniffing** | `X-Content-Type-Options: nosniff` header |
| **Port isolation** | Port 3000 blocked by UFW — only Caddy can reach the app |

### Use a strong password and JWT secret

Before going live, generate a proper JWT secret:

```bash
openssl rand -hex 32
```

And set a strong password (20+ characters, mixed case, symbols) in `.env`:

```env
SK_PASSWORD=your-very-strong-password-here
JWT_SECRET=paste-the-openssl-output-here
```

---

### Updating your domain

If you change your domain later:

1. Edit `/etc/caddy/Caddyfile` with the new domain
2. Run `sudo systemctl reload caddy`
3. Update `NEXT_PUBLIC_HOSTNAME` in `.env` to match the new display name
4. Restart ServerKit

---

---

## Troubleshooting

**Certificate not issued** — Make sure port 80 is open in UFW and the DNS A record has propagated. Run `sudo journalctl -u caddy -f` to watch Caddy's logs.

**502 Bad Gateway** — ServerKit is not running. Check `pm2 status serverkit` or `docker compose ps`.

**Can't reach the server at all** — Confirm the public IP is correct and port 443 is open. Some VPS providers have a separate firewall panel (Security Groups, etc.) independent of UFW.

**Login blocked (rate limited)** — After 5 wrong attempts the IP is locked for 15 minutes. Wait it out or restart ServerKit to reset (in-memory limiter clears on restart).
