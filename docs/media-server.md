# Media Server

The Media Server page is a path-safe file browser for your media storage. It lets you navigate directories, inspect file sizes and modification dates, and see what is stored on your drives — all without an SSH connection.

---

## Configuration

The browser only exposes directories you explicitly allow. This is controlled by the `MEDIA_ROOTS` environment variable in `.env`:

```env
MEDIA_ROOTS=/mnt/media,/mnt/webserver
```

- Values are comma-separated absolute paths.
- Any attempt to navigate outside these roots is rejected by the server with a `403` error, even if the path is crafted to escape via `../` sequences.
- You can also update this value at runtime via **Settings → General → Allowed paths** (requires a server restart to take effect).

If `MEDIA_ROOTS` is not set, the browser defaults to `/mnt/media,/mnt/webserver`.

---

## Navigation

### Root selector

If you have more than one root configured, tabs appear in the top-right corner of the page — one per root directory. Click a tab to switch to that root. The active root is highlighted in orange.

### Breadcrumb trail

As you navigate deeper, a breadcrumb trail builds up at the top-left of the page, showing each directory segment as a clickable link. Click any segment to jump back to that level. Click the `/` at the start to return to the root.

### Entering directories

Click on any row with a folder icon to navigate into it. Files cannot be opened or downloaded through the browser at this time — the browser is read-only for content access.

---

## File list

Each entry in the file list shows:

| Column | Description |
|---|---|
| **Icon** | Color-coded by type: folder (amber), video (orange), audio (green), image (purple), other (grey) |
| **Name** | File or directory name |
| **Size** | File size in human-readable units. Directories show a dash. |
| **Modified** | Last modification date |

Entries are sorted with directories first, then files alphabetically.

---

## Supported file types (icon colors)

| Extension | Icon |
|---|---|
| `.mkv`, `.mp4`, `.avi`, `.mov`, `.wmv` | Orange film icon |
| `.mp3`, `.flac`, `.aac`, `.wav`, `.ogg` | Green music icon |
| `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` | Purple image icon |
| Directories | Amber folder icon |
| Everything else | Grey file icon |

---

## Upload and new folder

The **Upload** and **New folder** buttons are present in the UI and are planned for a future release. They do not currently perform any action.
