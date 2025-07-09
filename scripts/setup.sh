#!/bin/bash
set -e


echo "[INFO] Installing dependencies..."
sudo apt update
sudo apt install -y nodejs npm sqlite3 nginx openssl

echo "[INFO] Ensuring backend dependencies and build..."
cd $(dirname "$0")/../backend

# Install Node dependencies if package-lock.json doesn't exist or node_modules is missing
if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
  echo "[INFO] Installing backend dependencies..."
  npm install
else
  echo "[INFO] Backend dependencies already installed."
fi

# Compile TypeScript if dist/init.js doesn't exist
if [ ! -f "dist/init.js" ]; then
  echo "[INFO] Compiling TypeScript backend..."
  npm run build
else
  echo "[INFO] Backend already compiled."
fi

# Run database initializer if database doesn't exist
DB_PATH="../../data/database.db"
if [ ! -f "$DB_PATH" ]; then
  echo "[INFO] Initializing SQLite database..."
  node dist/init.js
else
  echo "[INFO] Database already exists."
fi

cd -

# Create SSL cert if not already present
SSL_CERT="/etc/ssl/minecraft-dashboard/selfsigned.crt"
SSL_KEY="/etc/ssl/minecraft-dashboard/selfsigned.key"
if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
  echo "[INFO] Generating self-signed SSL certificate..."
  bash scripts/gen-cert.sh
else
  echo "[INFO] SSL certificate already exists."
fi

# Set up systemd service if not already enabled
SERVICE_FILE="/etc/systemd/system/minecraft-dashboard.service"
if [ ! -f "$SERVICE_FILE" ]; then
  echo "[INFO] Configuring systemd service..."
  sudo cp scripts/minecraft-dashboard.service "$SERVICE_FILE"
  sudo systemctl daemon-reexec
  sudo systemctl daemon-reload
  sudo systemctl enable minecraft-dashboard
fi

echo "[INFO] Restarting dashboard service..."
sudo systemctl restart minecraft-dashboard

# Set up Nginx config if not already linked
NGINX_CONF="/etc/nginx/sites-available/minecraft-dashboard"
if [ ! -f "$NGINX_CONF" ]; then
  echo "[INFO] Configuring Nginx..."
  sudo cp scripts/minecraft-dashboard-ssl.nginx "$NGINX_CONF"
  sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/minecraft-dashboard
  sudo nginx
