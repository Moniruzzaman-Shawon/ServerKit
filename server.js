const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')
const { setupStats } = require('./server/socket')
const { setupPty } = require('./server/pty')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  })

  setupStats(io)
  setupPty(io)

  const port = parseInt(process.env.PORT || '3000', 10)
  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`\x1b[32m✓\x1b[0m ServerKit ready on \x1b[36mhttp://localhost:${port}\x1b[0m`)
  })
})
