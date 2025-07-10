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

    router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
});

router.post('/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = authenticate(req.session.user?.username, currentPassword);
  if (!user) {
    return res.status(401).json({ error: 'Invalid current password' });
  }
  const stmt = db.prepare('UPDATE users SET password = ? WHERE username = ?');
  stmt.run(newPassword, req.session.user.username);
  res.sendStatus(200);
});


export default router;
