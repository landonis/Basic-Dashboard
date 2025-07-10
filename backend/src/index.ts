import express from 'express';
import session from 'express-session';


import path from 'path';
import { initDatabase } from './services/dbService';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

initDatabase();

app.set('trust proxy', 1); // important if you're using HTTPS or Nginx

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // ✅ must be true when using HTTPS
    sameSite: 'lax',     // helps cookies stick
  }
}));

app.use(express.json());

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

app.use('/api', authRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
