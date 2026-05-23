#!/usr/bin/env bash
set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
info()    { echo -e "${CYAN}→${NC} $*"; }
success() { echo -e "${GREEN}✓${NC} $*"; }
warn()    { echo -e "${YELLOW}!${NC} $*"; }
die()     { echo -e "${RED}✗${NC} $*" >&2; exit 1; }

echo ""
echo -e "${CYAN}  ServerKit — installer${NC}"
echo "  https://github.com/Moniruzzaman-Shawon/ServerKit"
echo ""

# ── Prerequisites ────────────────────────────────────────────────────────────
command -v docker  >/dev/null 2>&1 || die "Docker is not installed. Install it from https://docs.docker.com/engine/install/"
docker compose version >/dev/null 2>&1 || die "Docker Compose v2 plugin not found. Run: sudo apt install docker-compose-plugin"
success "Docker $(docker --version | awk '{print $3}' | tr -d ',')"
success "Docker Compose $(docker compose version --short)"

# ── .env setup ───────────────────────────────────────────────────────────────
if [ ! -f .env ]; then
  cp .env.example .env
  info "Created .env from .env.example"
fi

# Password
current_pass=$(grep '^SK_PASSWORD=' .env | cut -d= -f2-)
if [ "$current_pass" = "serverkit123" ] || [ -z "$current_pass" ]; then
  echo ""
  echo -e "  Set a login password for ServerKit:"
  read -rsp "  Password: " SK_PASSWORD; echo ""
  [ ${#SK_PASSWORD} -lt 6 ] && die "Password must be at least 6 characters."
  sed -i "s|^SK_PASSWORD=.*|SK_PASSWORD=${SK_PASSWORD}|" .env
  success "Password set"
fi

# JWT secret — auto-generate if still default
current_secret=$(grep '^JWT_SECRET=' .env | cut -d= -f2-)
if [ "$current_secret" = "change-me-to-a-long-random-secret" ] || [ -z "$current_secret" ]; then
  JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || cat /dev/urandom | tr -dc 'a-f0-9' | head -c 64)
  sed -i "s|^JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET}|" .env
  success "JWT secret auto-generated"
fi

# ── Optional features ────────────────────────────────────────────────────────
echo ""
warn "Optional: Tailscale volume mounts in docker-compose.yml require Tailscale to be installed."
warn "Optional: Sysfs thermal mounts work only on bare-metal Linux (not cloud VMs)."
echo ""

# ── Build & start ─────────────────────────────────────────────────────────────
info "Building and starting ServerKit (this may take a few minutes on first run)…"
docker compose up -d --build

echo ""
success "ServerKit is running!"
echo ""
echo -e "  ${CYAN}→${NC} Open http://localhost  (or http://<your-server-ip>)"
echo -e "  ${CYAN}→${NC} Log in with the password you just set"
echo -e "  ${CYAN}→${NC} To stop:   docker compose down"
echo -e "  ${CYAN}→${NC} To update: git pull && docker compose up -d --build"
echo ""
