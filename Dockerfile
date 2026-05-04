# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# node-pty requires native compilation
RUN apk add --no-cache python3 make g++ linux-headers

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Strip dev dependencies for production image
RUN npm prune --omit=dev

# ── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:20-alpine

# Runtime tools:
#   iproute2  → ss (listening ports)
#   lm-sensors → sensors -j (GPU temperature + power draw)
#   bash      → node-pty default shell
RUN apk add --no-cache iproute2 lm-sensors bash

WORKDIR /app

# Compiled Next.js output
COPY --from=builder /app/.next          ./.next
# Production node_modules (includes native bindings compiled for Alpine)
COPY --from=builder /app/node_modules   ./node_modules
# Entry point + socket server
COPY --from=builder /app/server.js      ./server.js
COPY --from=builder /app/server         ./server
# Shared lib (referenced by socket.js + API routes at runtime)
COPY --from=builder /app/lib            ./lib
# Static assets
COPY --from=builder /app/public         ./public
# Metadata
COPY --from=builder /app/package.json   ./package.json

# Persistent data directory (SQLite DB + activity log)
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "server.js"]
