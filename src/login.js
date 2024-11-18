import express from 'express';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validate_user, update_user, fetch_user, username_exist } from './userdb.js'; // Importing functions

// Create an Express router object
const router = express.Router();
const form = multer();

// Login route
router.post('/login', form.none(), async (req, res) => {
  const { username, password } = req.body;
  const user = await fetch_user(username); // Use fetch_user

  if (user && user.password === password) {
    if (!user.enabled) {
      return res.status(401).json({ status: 'failed', message: `User ${username} is currently disabled` });
    }
    req.session.logged = true;
    req.session.username = user.username;
    req.session.role = user.role;
    return res.json({ status: 'success', user: { username: user.username, role: user.role } });
  } else {
    return res.status(401).json({ status: 'failed', message: 'Incorrect username and password' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ status: 'failed', message: 'Error logging out' });
      }
      res.end();
    });
  } else {
    res.status(401).json({ status: 'failed', message: 'Unauthorized' });
  }
});

// User info route
router.get('/me', async (req, res) => {
  if (req.session.logged) {
    const user = await fetch_user(req.session.username); // Use fetch_user
    res.json({ status: 'success', user: { username: user.username } });
  } else {
    res.status(401).json({ status: 'failed', message: 'Unauthorized' });
  }
});

// Registration route
router.post('/register', form.none(), async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 'failed', message: 'Missing fields' });
  }

  if (username.length < 3) {
    return res.status(400).json({ status: 'failed', message: 'Username must be at least 3 characters' });
  }

  if (await username_exist(username)) {
    // Use username_exist
    return res.status(400).json({ status: 'failed', message: `Username ${username} already exists` });
  }

  if (password.length < 8) {
    return res.status(400).json({ status: 'failed', message: 'Password must be at least 8 characters' });
  }

  const updateSuccess = await update_user(username, password); // This remains the same

  if (updateSuccess) {
    return res.json({ status: 'success', user: { username } });
  } else {
    return res.status(500).json({ status: 'failed', message: 'Account created but unable to save into the database' });
  }
});

// Export the router object
export default router;
