import { NextResponse } from 'next/server'
import { readFileSync, readdirSync } from 'fs'
import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

// Read CPU package temp from Linux sysfs (no external commands needed)
function readCpuTempSysfs() {
  try {
    const zones = readdirSync('/sys/class/thermal').filter(d => d.startsWith('thermal_zone'))
    for (const zone of zones) {
      const type = readFileSync(`/sys/class/thermal/${zone}/type`, 'utf8').trim()
      if (type === 'x86_pkg_temp' || type === 'k10temp') {
        const raw = readFileSync(`/sys/class/thermal/${zone}/temp`, 'utf8').trim()
        return Math.round(parseInt(raw, 10) / 1000)
      }
    }
    // Fallback: use acpitz zone (less accurate but always present)
    const raw = readFileSync('/sys/class/thermal/thermal_zone0/temp', 'utf8').trim()
    const val = Math.round(parseInt(raw, 10) / 1000)
    return val > 0 ? val : null
  } catch {
    return null
  }
}

// Parse `sensors -j` for GPU temp and power draw
async function readSensors() {
  try {
    const { stdout } = await execFileAsync('sensors', ['-j'], { timeout: 3000 })
    const d = JSON.parse(stdout)
    let gpuTemp = null, gpuWatts = null, gpuWattsCap = null

    for (const [adapter, data] of Object.entries(d)) {
      if (typeof data !== 'object') continue
      const isGpu = adapter.includes('amdgpu') || adapter.includes('nvidia') || adapter.includes('nouveau')
      if (!isGpu) continue

      for (const [sensor, vals] of Object.entries(data)) {
        if (typeof vals !== 'object') continue
        for (const [k, v] of Object.entries(vals)) {
          if (typeof v !== 'number') continue
          if ((sensor === 'edge' || sensor === 'junction' || sensor === 'GPU') && k.endsWith('_input'))
            gpuTemp = Math.round(v)
          if ((sensor === 'PPT' || sensor.toLowerCase().includes('power')) && k.endsWith('_input'))
            gpuWatts = Math.round(v * 10) / 10
          if ((sensor === 'PPT' || sensor.toLowerCase().includes('power')) && k.endsWith('_cap'))
            gpuWattsCap = Math.round(v)
        }
      }
    }
    return { gpuTemp, gpuWatts, gpuWattsCap }
  } catch {
    return {}
  }
}

export async function GET() {
  const [cpuTemp, sensors] = await Promise.all([
    Promise.resolve(readCpuTempSysfs()),
    readSensors(),
  ])

  return NextResponse.json({
    cpu:         cpuTemp,
    gpu:         sensors.gpuTemp    ?? null,
    gpuWatts:    sensors.gpuWatts   ?? null,
    gpuWattsCap: sensors.gpuWattsCap ?? null,
  })
}
