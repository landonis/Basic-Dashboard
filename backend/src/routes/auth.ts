import { Router } from 'express';
import { authenticate } from '../services/userService';
import { db } from '../services/dbService'; // Required for change-password

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

// ✅ These were incorrectly nested
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
});

router.post('/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!req.session.user?.username) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const username = req.session.user.username;
  const user = authenticate(username, currentPassword);

  if (!user) {
    return res.status(401).json({ error: 'Invalid current password' });
  }

  const stmt = db.prepare('UPDATE users SET password = ? WHERE username = ?');
  stmt.run(newPassword, username);

  res.sendStatus(200);
});

export default router;
