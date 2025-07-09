import express from 'express';
import session from 'express-session';
import path from 'path';
import { initDatabase } from './init';

const app = express();
const PORT = process.env.PORT || 3000;

initDatabase();

app.use(express.json());
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // dummy auth for now
    if (username === 'admin' && password === 'password') {
        req.session.user = { username };
        return res.sendStatus(200);
    }
    res.sendStatus(401);
});

app.get('/api/check', (req, res) => {
    if (req.session.user) return res.json({ authenticated: true });
    res.status(401).json({ authenticated: false });
});

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
