import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(__dirname, '/opt/Basic-Dashboard/backend/src/data/database.db');
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
