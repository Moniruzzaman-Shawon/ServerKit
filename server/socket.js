const si = require('systeminformation')
const { execFile } = require('child_process')

// Parse `sensors -j` output into { cpuTemp, gpuTemp, gpuWatts, gpuWattsCap }
function parseSensors(raw) {
  try {
    const d = JSON.parse(raw)
    let cpuTemp = null, gpuTemp = null, gpuWatts = null, gpuWattsCap = null

    for (const [adapter, data] of Object.entries(d)) {
      if (typeof data !== 'object') continue
      for (const [sensor, vals] of Object.entries(data)) {
        if (typeof vals !== 'object') continue
        for (const [k, v] of Object.entries(vals)) {
          if (typeof v !== 'number') continue
          // CPU package temperature (coretemp / k10temp)
          if ((adapter.includes('coretemp') || adapter.includes('k10temp')) &&
              sensor.toLowerCase().includes('package') && k.endsWith('_input')) {
            cpuTemp = Math.round(v)
          }
          // GPU edge / junction temperature
          if ((adapter.includes('amdgpu') || adapter.includes('nvidia') || adapter.includes('nouveau')) &&
              (sensor === 'edge' || sensor === 'junction' || sensor === 'GPU') && k.endsWith('_input')) {
            gpuTemp = Math.round(v)
          }
          // GPU power draw (AMD PPT, NVIDIA power1)
          if ((adapter.includes('amdgpu') || adapter.includes('nvidia')) &&
              (sensor === 'PPT' || sensor.toLowerCase().includes('power')) && k.endsWith('_input')) {
            gpuWatts = Math.round(v * 10) / 10
          }
          if ((adapter.includes('amdgpu') || adapter.includes('nvidia')) &&
              (sensor === 'PPT' || sensor.toLowerCase().includes('power')) && k.endsWith('_cap')) {
            gpuWattsCap = Math.round(v)
          }
        }
      }
    }
    return { cpuTemp, gpuTemp, gpuWatts, gpuWattsCap }
  } catch {
    return {}
  }
}

function getSensors() {
  return new Promise(resolve => {
    execFile('sensors', ['-j'], { timeout: 3000 }, (err, stdout) => {
      if (err || !stdout) return resolve({})
      resolve(parseSensors(stdout))
    })
  })
}

function setupStats(io) {
  const ns = io.of('/stats')

  ns.on('connection', (socket) => {
    let interval

    async function push() {
      try {
        const [load, mem, disks, net, cpu, siTemp, sensors] = await Promise.all([
          si.currentLoad(),
          si.mem(),
          si.fsSize(),
          si.networkStats(),
          si.cpu(),
          si.cpuTemperature(),
          getSensors(),
        ])

        // Best available CPU temp: systeminformation > sensors fallback
        const cpuTemp = siTemp.main || sensors.cpuTemp || null

        socket.emit('stats', {
          cpu: {
            load:  Math.round(load.currentLoad),
            cores: cpu.physicalCores || load.cpus?.length || 1,
            speed: cpu.speed,
            brand: cpu.brand,
          },
          ram: {
            used:  mem.used,
            total: mem.total,
            pct:   Math.round((mem.used / mem.total) * 100),
          },
          disks: disks.map(d => ({
            fs:    d.fs,
            mount: d.mount,
            type:  d.type,
            used:  d.used,
            size:  d.size,
            pct:   Math.round(d.use || 0),
          })),
          net: {
            rx:    net[0]?.rx_sec || 0,
            tx:    net[0]?.tx_sec || 0,
            iface: net[0]?.iface || 'eth0',
          },
          temp: {
            cpu:    cpuTemp,
            gpu:    sensors.gpuTemp ?? null,
          },
          power: {
            gpuWatts:    sensors.gpuWatts    ?? null,
            gpuWattsCap: sensors.gpuWattsCap ?? null,
          },
        })
      } catch {
        // systeminformation can fail on restricted envs — silently skip
      }
    }

    push()
    interval = setInterval(push, 2000)

    socket.on('disconnect', () => clearInterval(interval))
  })
}

module.exports = { setupStats }
