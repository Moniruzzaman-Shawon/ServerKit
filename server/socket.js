const si = require('systeminformation')

function setupStats(io) {
  const ns = io.of('/stats')

  ns.on('connection', (socket) => {
    let interval

    async function push() {
      try {
        const [load, mem, disks, net, cpu] = await Promise.all([
          si.currentLoad(),
          si.mem(),
          si.fsSize(),
          si.networkStats(),
          si.cpu(),
        ])

        socket.emit('stats', {
          cpu: {
            load: Math.round(load.currentLoad),
            cores: cpu.physicalCores || load.cpus?.length || 1,
            speed: cpu.speed,
            brand: cpu.brand,
          },
          ram: {
            used: mem.used,
            total: mem.total,
            pct: Math.round((mem.used / mem.total) * 100),
          },
          disks: disks.map(d => ({
            fs: d.fs,
            mount: d.mount,
            type: d.type,
            used: d.used,
            size: d.size,
            pct: Math.round(d.use || 0),
          })),
          net: {
            rx: net[0]?.rx_sec || 0,
            tx: net[0]?.tx_sec || 0,
            iface: net[0]?.iface || 'eth0',
          },
        })
      } catch (err) {
        // systeminformation can fail on restricted envs — silently skip
      }
    }

    push()
    interval = setInterval(push, 2000)

    socket.on('disconnect', () => clearInterval(interval))
  })
}

module.exports = { setupStats }
