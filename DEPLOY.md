# Deploy rubik-solver

Follow the steps **in order**. Copy and paste each command exactly. Lines starting with `#` are notes, not commands.
If something fails, jump to **Troubleshooting** at the bottom.

## What you are deploying

| Part | This export |
|------|-------------|
| Website / app | React + Vite |
| Backend | none (frontend only) |
| Database | – |
| Realtime | no |
| Background jobs | no |

## Deploy without Docker (a plain Linux server)

> Want the easy way? Re-export with Docker: `node mizumi.js export rubik-solver react-vite --docker`. This section is for people who prefer to install everything by hand.

### Step 1 — Install on the server
- Node.js 22
- Caddy (free web server that handles HTTPS): see caddyserver.com/docs/install

### Step 2 — Copy the project to the server
```bash
rsync -av --exclude node_modules --exclude vendor --exclude .venv --exclude target ./ root@YOUR_SERVER_IP:/srv/rubik-solver/
```

### Step 3 — Database
No backend in this export, so no database.

### Step 4 — Build and start the website
```bash
cd frontend
npm ci
npm run build   # creates frontend/dist — plain static files
```
Serve the folder `frontend/dist` with Caddy (next step).
### Step 5 — Make it one public website (HTTPS)
Create `/etc/caddy/Caddyfile` and replace `yourdomain.com`:
```caddyfile
yourdomain.com {
  handle {
    root * /srv/rubik-solver/frontend/dist
    try_files {path} /index.html
    file_server
  }
}
```
Then: `sudo systemctl reload caddy`. Point your domain's **A record** to the server first.

### Step 6 — Keep it running after you close the terminal
Create one service file per process, for example `/etc/systemd/system/rubik-solver-backend.service`:
```ini
[Unit]
Description=rubik-solver backend
After=network.target

[Service]
WorkingDirectory=/srv/rubik-solver/backend
ExecStart=THE START COMMAND FROM THE BACKEND STEP
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```
Then: `sudo systemctl daemon-reload && sudo systemctl enable --now rubik-solver-backend`. Repeat for the website (change the name and the command).

## Troubleshooting

| Problem | What to do |
|---------|------------|
| Site shows 502 | The process behind Caddy is not running. `sudo systemctl status rubik-solver-backend` and `journalctl -u rubik-solver-backend -n 50` |
| HTTPS not working | A record must point to the server, ports 80 and 443 must be open |
| Command not found | A tool from Step 1 is missing or too old. Check versions |
