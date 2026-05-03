const pty = require('node-pty')
const os = require('os')

function setupPty(io) {
  const ns = io.of('/terminal')

  ns.on('connection', (socket) => {
    const shell = os.platform() === 'win32' ? 'powershell.exe' : (process.env.SHELL || 'bash')

    let term
    try {
      term = pty.spawn(shell, [], {
        name: 'xterm-256color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME || os.homedir(),
        env: { ...process.env, TERM: 'xterm-256color' },
      })
    } catch (err) {
      socket.emit('data', `\r\n\x1b[31mFailed to start shell: ${err.message}\x1b[0m\r\n`)
      return
    }

    term.onData(data => socket.emit('data', data))

    term.onExit(({ exitCode }) => {
      socket.emit('data', `\r\n\x1b[90mProcess exited with code ${exitCode}\x1b[0m\r\n`)
      socket.disconnect()
    })

    socket.on('input', data => {
      try { term.write(data) } catch {}
    })

    socket.on('resize', ({ cols, rows }) => {
      try { term.resize(Math.max(1, cols), Math.max(1, rows)) } catch {}
    })

    socket.on('disconnect', () => {
      try { term.kill() } catch {}
    })
  })
}

module.exports = { setupPty }
