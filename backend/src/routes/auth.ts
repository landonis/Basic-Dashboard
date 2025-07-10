import { Router } from 'express';
import { authenticate } from '../services/userService';

const router = Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = authenticate(username, password);
    if (user) {
        req.session.user = { username };
        return res.sendStatus(200);
    }
    res.sendStatus(401);
});

router.get('/check', (req, res) => {
    if (req.session.user) {
        return res.json({ authenticated: true });
    }
    res.status(401).json({ authenticated: false });
});

export default router;
