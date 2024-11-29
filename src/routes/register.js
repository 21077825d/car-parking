import express from 'express';
import { readUsersFromFile, writeUsersToFile } from '../utils/fileHelpers.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, nickname, password, repeatPassword, email, gender, birthdate } = req.body;

  if (password !== repeatPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const users = readUsersFromFile();
  const existingUser = users.find((user) => user.userId === userId);
  if (existingUser) {
    return res.status(400).send('User ID already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    account: 'user',
    id: uuidv4(),
    userId,
    nickname,
    password: hashedPassword,
    email,
    gender,
    birthdate,
    profilePic: '/assets/profile/default-profile.png',
  };
  users.push(newUser);
  writeUsersToFile(users);

  res.redirect('/success-register.html');
});

export default router;
