import { db } from './dbService';

export function authenticate(username: string, password: string) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    return stmt.get(username, password);
}
