'use client'
import { useState } from 'react'

const GUIDES = [
  {
    id: 'deploy',
    title: 'Deploy a web app',
    desc: 'Host a Node.js, Python, or PHP application using Docker and Traefik.',
    steps: [
      {
        n: 1, label: 'Create a Compose file',
        desc: 'In /opt/stacks/, create a folder for your app.',
        code: `mkdir -p /opt/stacks/myapp && cd /opt/stacks/myapp
cat > docker-compose.yml << 'EOF'
services:
  app:
    image: node:20-alpine
    working_dir: /app
    volumes: [./src:/app]
    command: node server.js
    labels:
      - traefik.enable=true
      - traefik.http.routers.myapp.rule=Host(\`app.yourdomain.com\`)
      - traefik.http.routers.myapp.tls.certresolver=letsencrypt
    networks: [web-net]
networks:
  web-net:
    external: true
EOF`,
      },
      { n: 2, label: 'Start the app', desc: 'Run compose and verify the container starts.', code: 'docker compose up -d\ndocker compose logs -f' },
      { n: 3, label: 'Open in browser', desc: 'Your app is now live at https://app.yourdomain.com with a free TLS cert.' },
    ],
  },
  {
    id: 'domain',
    title: 'Set up a domain + TLS',
    desc: "Point a domain to your server and get a Let's Encrypt certificate automatically.",
    steps: [
      { n: 1, label: 'Point DNS to your server', desc: 'In your domain registrar, add an A record:', code: 'A  @  your-server-ip\nA  *  your-server-ip  (wildcard for subdomains)' },
      { n: 2, label: 'Verify Traefik is running', desc: 'Traefik automatically issues certs on first request.', code: 'docker ps | grep traefik\n# Should show: traefik   Up X hours' },
      { n: 3, label: 'Add a route label to your service', desc: 'Add these labels to any container to expose it:', code: `labels:\n  - traefik.enable=true\n  - traefik.http.routers.myapp.rule=Host(\`app.yourdomain.com\`)\n  - traefik.http.routers.myapp.tls.certresolver=letsencrypt` },
    ],
  },
  {
    id: 'backup',
    title: 'Backup your database',
    desc: 'Dump PostgreSQL to a file or MinIO. Run manually or on a schedule.',
    steps: [
      { n: 1, label: 'One-time manual backup', desc: 'Dump and gzip:', code: "docker exec postgres pg_dump -U postgres mydb | gzip > ~/backup-$(date +%Y%m%d).sql.gz" },
      { n: 2, label: 'Automated daily backup', desc: 'Add a cron job:', code: "# crontab -e\n0 3 * * * docker exec postgres pg_dump -U postgres mydb | gzip > /mnt/media/backups/db-$(date +\\%Y\\%m\\%d).sql.gz" },
      { n: 3, label: 'Restore from backup', desc: '', code: "gunzip -c backup.sql.gz | docker exec -i postgres psql -U postgres mydb" },
    ],
  },
  {
    id: 'samba',
    title: 'Configure Samba shares',
    desc: 'Share folders so Windows, macOS, and Linux can access your media.',
    steps: [
      { n: 1, label: 'Install Samba', desc: '', code: 'sudo apt install samba -y' },
      { n: 2, label: 'Add a share', desc: 'Edit /etc/samba/smb.conf:', code: "[Media]\n   path = /mnt/media\n   browseable = yes\n   read only = no\n   guest ok = no\n   valid users = youruser" },
      { n: 3, label: 'Set password and restart', desc: '', code: 'sudo smbpasswd -a youruser\nsudo systemctl restart smbd' },
    ],
  },
  {
    id: 'minio',
    title: 'Use MinIO as S3 storage',
    desc: "Use MinIO's S3-compatible API from any language or SDK.",
    steps: [
      { n: 1, label: 'Get credentials', desc: 'Find them in Storage → S3 credentials in ServerKit.', code: 'Endpoint:   http://your-server:9000\nAccess key: (from .env MINIO_USER)\nSecret key: (from .env MINIO_PASS)' },
      { n: 2, label: 'Use from Python', desc: '', code: "import boto3\ns3 = boto3.client('s3',\n    endpoint_url='http://your-server:9000',\n    aws_access_key_id='minioadmin',\n    aws_secret_access_key='yourpassword')\ns3.upload_file('file.jpg', 'my-bucket', 'file.jpg')" },
      { n: 3, label: 'Use from Node.js', desc: '', code: "import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'\nconst s3 = new S3Client({\n  endpoint: 'http://your-server:9000',\n  credentials: { accessKeyId: 'minioadmin', secretAccessKey: 'yourpassword' }\n})" },
    ],
  },
]

export default function GuidesPage() {
  const [active, setActive] = useState('deploy')
  const guide = GUIDES.find(g => g.id === active)

  return (
    <div className="p-5 animate-fadein">
      <div className="grid gap-5" style={{ gridTemplateColumns: '200px 1fr' }}>

        {/* Nav */}
        <div>
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">Guides</div>
          <div className="flex flex-col gap-0.5">
            {GUIDES.map(g => (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                className={`text-left px-3 py-2 rounded-md text-[13px] border-l-2 transition-all cursor-pointer
                            ${active === g.id
                              ? 'bg-sk-orange/8 text-sk-orange border-sk-orange'
                              : 'text-sk-muted border-transparent hover:bg-sk-el hover:text-sk-text'}`}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {guide && (
          <div>
            <h1 className="text-[18px] font-semibold tracking-tight text-sk-text mb-2">{guide.title}</h1>
            <p className="text-[13px] text-sk-muted leading-relaxed mb-4">{guide.desc}</p>
            <div className="h-px bg-sk-subtle mb-5" />

            <div className="space-y-5">
              {guide.steps.map(step => (
                <div key={step.n} className="flex gap-3">
                  <div className="w-[22px] h-[22px] rounded-full bg-sk-orange/15 text-sk-orange
                                  text-[11px] font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step.n}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-sk-text mb-1">{step.label}</div>
                    {step.desc && <p className="text-[13px] text-sk-muted mb-2 leading-relaxed">{step.desc}</p>}
                    {step.code && (
                      <pre className="bg-sk-el border border-sk-border rounded-md px-3.5 py-3
                                      font-mono text-[12px] text-sk-text overflow-x-auto leading-relaxed
                                      whitespace-pre">
                        {step.code}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
