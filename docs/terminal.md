# Terminal

The Terminal page provides a full PTY (pseudo-terminal) session running `bash` on the host server, streamed directly to your browser over WebSocket. It behaves identically to an SSH terminal — you can run any command, use interactive programs like `htop` or `vim`, and resize the window freely.

---

## How it works

When you open the Terminal page, ServerKit:

1. Spawns a new `bash` process on the server using **node-pty**
2. Opens a WebSocket connection from the browser to the `/terminal` Socket.io namespace
3. Streams all terminal input and output bidirectionally between the browser and the PTY
4. Renders the output using **xterm.js**, a full VT100/VT220 compatible terminal emulator

The session runs as the same user that started the ServerKit process.

---

## Terminal features

| Feature | Details |
|---|---|
| **Full PTY** | ANSI colors, cursor movement, and interactive programs all work |
| **Resize** | The terminal automatically adjusts when you resize the browser window |
| **Clickable URLs** | URLs in output are clickable via the web-links addon |
| **Scrollback** | xterm.js maintains a scrollback buffer for reviewing previous output |

---

## Keyboard shortcuts

Standard terminal shortcuts work as expected in the browser:

| Shortcut | Action |
|---|---|
| `Ctrl+C` | Interrupt (SIGINT) the current process |
| `Ctrl+D` | End of input / exit shell |
| `Ctrl+L` | Clear the screen |
| `Ctrl+A` / `Ctrl+E` | Move cursor to start / end of line |
| `Ctrl+R` | Reverse history search |
| `Tab` | Autocomplete |
| `↑` / `↓` | Browse command history |

> **Note:** Some browser shortcuts (`Ctrl+W`, `Ctrl+T`, `Ctrl+N`) will be intercepted by the browser rather than the terminal. Use the ServerKit terminal for server commands and your OS's native SSH client if you need those shortcuts frequently.

---

## Session lifecycle

- Each time you navigate to the Terminal page, a new `bash` session is started.
- When you navigate away or close the tab, the PTY session is killed and the `bash` process exits.
- There is currently one terminal session per page load. If you need multiple sessions, open the Terminal page in multiple browser tabs.

---

## Security considerations

The terminal runs as the user that started ServerKit. If ServerKit is started as `root` (not recommended), the terminal will have root access. It is strongly recommended to run ServerKit as a non-root user with only the permissions it needs:

- Docker group membership for Docker management
- Read access to `/proc` and relevant mount points for system stats
- `sudo` rights limited to specific commands if elevated operations are needed

Always protect your ServerKit installation behind a strong password and, ideally, a private network or VPN (see [Network — Tailscale](network.md)).

---

## Common use cases

```bash
# Check disk usage
df -h

# View running processes
htop

# Tail application logs
journalctl -u myservice -f

# Manage Docker from the terminal
docker ps
docker logs mycontainer

# Check UFW status
sudo ufw status verbose

# Edit configuration files
nano /etc/myapp/config.yaml
```
