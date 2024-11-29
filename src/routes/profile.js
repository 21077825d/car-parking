import express from 'express';
import { readUsersFromFile } from '../utils/fileHelpers.js';

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }

  const users = readUsersFromFile();
  const user = users.find((user) => user.id === req.session.userId);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
});

export default router;
