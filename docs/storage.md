# Storage

The Storage page manages **MinIO**, an S3-compatible object storage server. MinIO lets you store and retrieve files using the same API as Amazon S3, making it compatible with any tool or application that speaks S3.

---

## What is MinIO?

MinIO is a high-performance, self-hosted object storage server. Unlike a file system browser (see [Media Server](media-server.md)), object storage organizes data into **buckets** and **objects** rather than directories and files. It is well-suited for:

- Application backups and database dumps
- Static assets for web applications
- Media uploads from apps that support S3
- Rclone or Restic backup targets

---

## Requirements

MinIO must be running and accessible at the endpoint configured in `.env`:

```env
MINIO_ENDPOINT=http://localhost:9000
MINIO_USER=minioadmin
MINIO_PASS=minioadmin
```

---

## Starting MinIO

The simplest way to run MinIO is via Docker:

```bash
docker run -d \
  --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=yourpassword \
  -v minio_data:/data \
  minio/minio server /data --console-address ":9001"
```

- **Port 9000** — S3 API endpoint (used by ServerKit and any S3-compatible client)
- **Port 9001** — MinIO web console (for direct bucket management)

Update `.env` with your credentials and endpoint, then restart ServerKit.

---

## Offline warning

If MinIO is unreachable (not running, wrong endpoint, or network issue), the page shows an amber warning banner with the configured endpoint address. Bucket operations are disabled until the connection is restored. Check that MinIO is running and the `MINIO_ENDPOINT` value in `.env` is correct.

---

## Summary counters

At the top of the Storage page, four counters provide a quick overview:

| Counter | Description |
|---|---|
| **Buckets** | Total number of buckets in the MinIO instance |
| **Objects** | Total count of objects across all buckets |
| **Total size** | Combined size of all objects, in human-readable units |
| **Status** | `Online` (green) or `Offline` (red) — whether MinIO is currently reachable |

---

## Bucket list

The bucket table lists every bucket with:

| Column | Description |
|---|---|
| **Name** | Bucket name |
| **Objects** | Number of objects stored in the bucket |
| **Size** | Total size of all objects in the bucket |
| **Created** | Date the bucket was created |
| **Actions** | Browse contents or delete the bucket |

---

## Creating a bucket

Click **Create bucket** in the bucket list header. Enter a name that follows S3 naming rules:

- 3–63 characters
- Lowercase letters, numbers, and hyphens only
- Must start and end with a letter or number

Click **Create bucket** to confirm. The bucket appears in the list immediately.

---

## Deleting a bucket

Click **Delete** on any bucket row. A confirmation dialog warns that the deletion is permanent and cannot be undone. ServerKit drains all objects inside the bucket before removing it — you do not need to empty it manually first.

> **Warning:** All objects stored in the bucket are permanently deleted. There is no recycle bin or undo.

---

## S3 credentials

The bottom panel displays the S3 connection details needed to configure external tools (Rclone, Restic, boto3, AWS CLI, etc.):

| Field | Description |
|---|---|
| **Endpoint** | The MinIO API URL — use this in place of `https://s3.amazonaws.com` |
| **Access key** | Your `MINIO_USER` value |
| **Secret key** | Masked — set via `MINIO_PASS` in `.env` |
| **Region** | `us-east-1` — MinIO accepts any region string; this is the conventional default |

### Example: configure Rclone to use MinIO

```ini
[minio]
type = s3
provider = Minio
access_key_id = minioadmin
secret_access_key = yourpassword
endpoint = http://your-server:9000
```

### Example: configure AWS CLI to use MinIO

```bash
aws --endpoint-url http://your-server:9000 s3 ls
```

---

## Updating credentials

To change the MinIO endpoint, access key, or other settings:

1. Go to **Settings → Storage**
2. Update the **Endpoint URL** or **Access key** fields
3. Click **Save changes**

The secret key (`MINIO_PASS`) must be changed directly in `.env` and requires a server restart.
