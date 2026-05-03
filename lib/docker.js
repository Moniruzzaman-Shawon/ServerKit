import Dockerode from 'dockerode'

const docker = new Dockerode({
  socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock',
})

export async function listContainers() {
  const list = await docker.listContainers({ all: true })
  return list.map(c => ({
    id: c.Id.slice(0, 12),
    fullId: c.Id,
    name: (c.Names[0] || '/unnamed').replace('/', ''),
    image: c.Image,
    status: c.State,
    statusText: c.Status,
    ports: c.Ports
      .filter(p => p.PublicPort)
      .map(p => `${p.PublicPort}→${p.PrivatePort}`)
      .join(', '),
    created: c.Created,
  }))
}

export async function containerAction(id, action) {
  const c = docker.getContainer(id)
  switch (action) {
    case 'start':   return c.start()
    case 'stop':    return c.stop()
    case 'restart': return c.restart()
    case 'remove':  return c.remove({ force: true })
    default: throw new Error(`Unknown action: ${action}`)
  }
}

export async function getContainerLogs(id, tail = 80) {
  const c = docker.getContainer(id)
  const buf = await c.logs({ stdout: true, stderr: true, tail, timestamps: true })
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf)
  const lines = []
  let offset = 0
  while (offset + 8 <= b.length) {
    const size = b.readUInt32BE(offset + 4)
    if (size === 0) { offset += 8; continue }
    lines.push(b.slice(offset + 8, offset + 8 + size).toString('utf8'))
    offset += 8 + size
  }
  return lines.join('')
}

export async function getDockerSummary() {
  const [running, all, images] = await Promise.all([
    docker.listContainers(),
    docker.listContainers({ all: true }),
    docker.listImages(),
  ])
  return { running: running.length, total: all.length, images: images.length }
}

export async function pullImage(image) {
  return new Promise((resolve, reject) => {
    docker.pull(image, (err, stream) => {
      if (err) return reject(err)
      docker.modem.followProgress(stream, (err2) => {
        if (err2) reject(err2)
        else resolve()
      })
    })
  })
}

export async function createContainer({ image, name, ports, env, volumes, restart }) {
  const ExposedPorts = {}
  const PortBindings = {}

  for (const p of (ports || []).filter(p => p.host && p.container)) {
    const key = `${p.container}/tcp`
    ExposedPorts[key] = {}
    PortBindings[key] = [{ HostPort: String(p.host) }]
  }

  const Binds = (volumes || [])
    .filter(v => v.host && v.container)
    .map(v => `${v.host}:${v.container}`)

  const Env = (env || [])
    .filter(e => e.key)
    .map(e => e.value ? `${e.key}=${e.value}` : e.key)

  const container = await docker.createContainer({
    Image: image,
    ...(name ? { name } : {}),
    Env,
    ExposedPorts,
    HostConfig: {
      PortBindings,
      Binds,
      RestartPolicy: { Name: restart || 'unless-stopped' },
    },
  })

  await container.start()
  return { id: container.id.slice(0, 12) }
}

export { docker }
