/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-sqlite3', 'dockerode', 'node-pty', 'systeminformation'],
}

export default nextConfig
