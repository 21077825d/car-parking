import express from 'express';
import { readUsersFromFile, readBookingsFromFile } from '../utils/fileHelpers.js';

const router = express.Router();

router.get('/users', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }

  const users = readUsersFromFile();
  const adminUser = users.find((user) => user.id === req.session.userId && user.userId === 'admin');

  if (!adminUser) {
    return res.status(403).send('Forbidden');
  }

  const bookings = readBookingsFromFile();
  const usersWithBookings = users.map((user) => {
    const userBookings = bookings.find((booking) => booking.email === user.email);
    return {
      ...user,
      bookings: userBookings ? userBookings.bookings : [],
    };
  });

  res.json({ users: usersWithBookings });
});

export default router;
