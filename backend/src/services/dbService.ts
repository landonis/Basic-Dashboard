import Database from 'better-sqlite3';


const dbPath = path.resolve(__dirname, '/opt/Basic-Dashboard/backend/src/data/database.db');

const fs = require('fs');
const path = require('path');

// Ensure parent directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export const db = new Database(dbPath);


export const db = new Database(dbPath);

export function initDatabase() {
    if (!fs.existsSync(dbPath)) {
        db.exec(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
            INSERT INTO users (username, password) VALUES ('admin', 'password');
        `);
        console.log("Database created and initialized.");
    } else {
        console.log("Database already exists.");
    }
}
