#!/bin/bash
set -e

echo "[INFO] Installing dependencies..."
sudo apt update
sudo apt install -y nodejs npm sqlite3 nginx openssl

echo "[INFO] Ensuring backend dependencies and build..."
cd /opt/Basic-Dashboard/backend

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

echo "[INFO] Checking and initializing SQLite database..."

DB_DIR="/opt/Basic-Dashboard/data"
DB_FILE="$DB_DIR/database.db"

# Create data directory if it doesn't exist
if [ ! -d "$DB_DIR" ]; then
  echo "[INFO] Creating data directory..."
  sudo mkdir -p "$DB_DIR"
  sudo chown www-data:www-data "$DB_DIR"
  sudo chmod 770 "$DB_DIR"
fi

# Initialize the DB if it doesn't exist
if [ ! -f "$DB_FILE" ]; then
  echo "[INFO] Running database init script..."
  sudo -u www-data NODE_ENV=production node /opt/Basic-Dashboard/backe_
