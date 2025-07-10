#!/bin/bash
set -e

echo "[INFO] Installing dependencies..."
sudo apt update
sudo apt install -y nodejs npm sqlite3 nginx openssl

echo "[INFO] Ensuring www-data user and directory access..."

# Ensure www-data exists
if ! id "www-data" &>/dev/null; then
  echo "[INFO] Creating www-data user..."
  sudo useradd -r -s /usr/sbin/nologin www-data
else
  echo "[INFO] www-data user already exists."
fi

# Set safe traversal permissions
sudo chmod o+rx /opt
sudo chmod o+rx /opt/Basic-Dashboard
sudo chmod o+rx /opt/Basic-Dashboard/backend

# Ensure data directory is writeable
sudo mkdir -p /opt/Basic-Dashboard/data
sudo chown -R www-data:www-data /opt/Basic-Dashboard/data
sudo chmod -R 770 /opt/Basic-Dashboard/data

# ===========================
# BACKEND SETUP
# ===========================
echo "[INFO] Ensuring backend dependencies and build..."
cd /opt/Basic-Dashboard/backend

if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
  echo "[INFO] Installing backend dependencies..."
  npm install
else
  echo "[INFO] Backend dependencies already installed."
fi

npm run build

if [ ! -f "dist/index.js" ]; then
  echo "[ERROR] Backend build failed — dist/index.js not found"
  exit 1
fi

echo "[INFO] Checking and initializing SQLite database..."
DB_FILE="/opt/Basic-Dashboard/data/database.db"
if [ ! -f "$DB_FILE" ]; then
  echo "[INFO] Running database init script..."
  sudo -u www-data NODE_ENV=production node dist/init.js
else
  echo "[INFO] Database already exists at $DB_FILE"
fi

cd -

# ===========================
# FRONTEND SETUP
# ===========================
echo "[INFO] Building frontend..."
cd /opt/Basic-Dashboard/frontend

if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
  echo "[INFO] Installing frontend dependencies..."
  npm install
else
  echo "[INFO] Frontend dependencies already installed."
fi

npm run build

if [ ! -f "dist/index.html" ]; then
  echo "[ERROR] Frontend build failed — dist/index.html missing"
  exit 1
fi

cd -

# ===========================
# SSL CERTIFICATE
# ===========================
SSL_CERT="/etc/ssl/minecraft-dashboard/selfsigned.crt"
SSL_KEY="/etc/ssl/minecraft-dashboard/selfsigned.key"
if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
  echo "[INFO] Generating self-signed SSL certificate..."
  bash /opt/Basic-Dashboard/scripts/gen-cert.sh
else
  echo "[INFO] SSL certificate already exists."
fi

# ===========================
# SYSTEMD SERVICE
# ===========================
SERVICE_FILE="/etc/systemd/system/minecraft-dashboard.service"
if [ ! -f "$SERVICE_FILE" ]; then
  echo "[INFO] Configuring systemd service..."
  sudo cp /opt/Basic-Dashboard/scripts/minecraft-dashboard.service "$SERVICE_FILE"
  sudo systemctl daemon-reexec
  sudo systemctl daemon-reload
  sudo systemctl enable minecraft-dashboard
fi

echo "[INFO] Restarting dashboard service..."
sudo systemctl restart minecraft-dashboard

# ===========================
# NGINX SETUP
# ===========================
NGINX_CONF="/etc/nginx/sites-available/minecraft-dashboard"
if [ ! -f "$NGINX_CONF" ]; then
  echo "[INFO] Configuring Nginx..."
  sudo cp /opt/Basic-Dashboard/scripts/minecraft-dashboard-ssl.nginx "$NGINX_CONF"
  sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/minecraft-dashboard
  sudo nginx -t && sudo systemctl reload nginx
else
  echo "[INFO] Nginx config already present."
fi

echo "[✅] Setup complete. Visit https://<your-server-ip>/ to access the dashboard."
