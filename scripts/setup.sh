#!/bin/bash
set -e

echo "[INFO] Installing dependencies..."
sudo apt update
sudo apt install -y nodejs npm sqlite3 nginx

echo "[INFO] Setting up backend..."
cd $(dirname "$0")/../backend
npm install
npm run build
cd -
echo "[INFO] Setting up database..."
node dist/init.js

echo "[INFO] Configuring systemd..."
sudo cp ../scripts/minecraft-dashboard.service /etc/systemd/system/
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable minecraft-dashboard
sudo systemctl start minecraft-dashboard

echo "[INFO] Setting up Nginx..."
sudo cp ../scripts/minecraft-dashboard.nginx /etc/nginx/sites-available/minecraft-dashboard
sudo ln -sf /etc/nginx/sites-available/minecraft-dashboard /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

echo "[INFO] Setup complete."

echo "[INFO] Generating self-signed SSL certificate..."
bash ../scripts/gen-cert.sh

echo "[INFO] Enabling HTTPS with Nginx..."
sudo cp ../scripts/minecraft-dashboard-ssl.nginx /etc/nginx/sites-available/minecraft-dashboard
sudo ln -sf /etc/nginx/sites-available/minecraft-dashboard /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
