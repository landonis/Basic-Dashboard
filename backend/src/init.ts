import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export function initDatabase() {
    const dbPath = path.resolve(__dirname, '../../data/database.db');
    const dbExists = fs.existsSync(dbPath);
    const db = new Database(dbPath);

    if (!dbExists) {
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
