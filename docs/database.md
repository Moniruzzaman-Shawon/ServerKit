# Database

The Database page provides a status overview of database engines running on your server. ServerKit supports **PostgreSQL**, **MySQL**, and **SQLite** — the three most common databases found in homelab and self-hosted setups.

---

## Supported databases

### PostgreSQL

PostgreSQL is a powerful open-source relational database commonly used as the backend for self-hosted applications such as Gitea, Nextcloud, Authentik, and Immich.

**Starting PostgreSQL with Docker:**

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_USER=admin \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:16
```

**Default port:** `5432`

---

### MySQL / MariaDB

MySQL (and its drop-in replacement MariaDB) is commonly used by WordPress, phpMyAdmin, and many other applications.

**Starting MariaDB with Docker:**

```bash
docker run -d \
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  -e MYSQL_DATABASE=mydb \
  -p 3306:3306 \
  -v mariadb_data:/var/lib/mysql \
  mariadb:11
```

**Default port:** `3306`

---

### SQLite

SQLite stores the entire database in a single file on disk. It is used by many lightweight applications and is also what ServerKit uses internally for its own settings and activity log.

SQLite databases require no network port — they are accessed directly by the application that owns the file.

---

## Database management tools

For a full-featured database GUI, consider running one of these as a Docker container alongside your databases:

| Tool | Supports | URL |
|---|---|---|
| **pgAdmin** | PostgreSQL | `http://localhost:5050` (default) |
| **phpMyAdmin** | MySQL / MariaDB | `http://localhost:8080` (default) |
| **Adminer** | All of the above | Lightweight, single-container option |

Example Adminer setup:

```bash
docker run -d \
  --name adminer \
  -p 8080:8080 \
  adminer
```

Navigate to `http://your-server:8080` to connect to any local database.
