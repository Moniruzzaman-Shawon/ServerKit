# Web Server

The Web Server page provides an overview of the reverse proxy layer running on your server. It is designed around **Traefik**, a widely used edge router for homelab and self-hosted environments, but the status view will surface any services running behind the configured Docker network.

---

## What is a reverse proxy?

A reverse proxy sits in front of your applications and routes incoming HTTP/HTTPS requests to the correct backend service based on the hostname or path. This allows you to:

- Run multiple web applications on a single server, each on its own domain or subdomain
- Terminate TLS (HTTPS) in one place rather than configuring certificates for every service
- Apply middleware such as rate limiting, authentication, or redirect rules globally

Traefik integrates with Docker directly — when you start a Docker container with the right labels, Traefik automatically picks it up and begins routing to it.

---

## Traefik setup (quick reference)

If Traefik is not yet running on your server, a minimal starting point using Docker Compose:

```yaml
# docker-compose.yml
services:
  traefik:
    image: traefik:v3
    command:
      - --api.dashboard=true
      - --providers.docker=true
      - --providers.docker.exposedByDefault=false
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.tlschallenge=true
      - --certificatesresolvers.letsencrypt.acme.email=you@example.com
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
```

Then add labels to any service you want to expose:

```yaml
  myapp:
    image: myapp:latest
    labels:
      - traefik.enable=true
      - traefik.http.routers.myapp.rule=Host(`myapp.example.com`)
      - traefik.http.routers.myapp.entrypoints=websecure
      - traefik.http.routers.myapp.tls.certresolver=letsencrypt
```

---

## Traefik dashboard

Traefik provides its own built-in web dashboard accessible at port `8080` by default (if `--api.insecure=true` is set) or via a secured router. The ServerKit Web Server page links out to the Traefik dashboard for detailed routing and middleware information.

---

## Relationship with Docker page

Containers running as Traefik backends will also appear on the **Docker** page. Use the Docker page to manage container lifecycle (start, stop, restart), and use the Web Server page for a routing and TLS-focused view.
