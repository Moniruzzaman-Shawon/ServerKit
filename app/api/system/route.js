import { NextResponse } from 'next/server'
import si from 'systeminformation'

export async function GET() {
  try {
    const [os, cpu, time] = await Promise.all([
      si.osInfo(),
      si.cpu(),
      si.time(),
    ])
    return NextResponse.json({
      os: {
        distro:   os.distro,
        release:  os.release,
        kernel:   os.kernel,
        arch:     os.arch,
        hostname: os.hostname,
      },
      cpu: {
        brand:         cpu.brand,
        cores:         cpu.cores,
        physicalCores: cpu.physicalCores,
        speed:         cpu.speed,
      },
      uptime: time.uptime,
      node:   process.version,
      sk:     '1.0.0',
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
