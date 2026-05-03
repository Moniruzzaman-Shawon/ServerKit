import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

const ALLOWED = {
  df:         true,
  ss:         true,
  ufw:        true,
  systemctl:  true,
  uptime:     true,
  hostname:   true,
  cat:        true,
  lsblk:      true,
  tailscale:  true,
  sensors:    true,
}

export async function safeExec(command, args = []) {
  if (!Object.prototype.hasOwnProperty.call(ALLOWED, command)) {
    throw new Error(`Command not allowed: ${command}`)
  }
  const { stdout } = await execFileAsync(command, args, {
    timeout: 8000,
    maxBuffer: 1024 * 512,
  })
  return stdout.trim()
}
