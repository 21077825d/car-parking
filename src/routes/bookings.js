import express from 'express';
import { readUsersFromFile, readBookingsFromFile } from '../utils/fileHelpers.js';

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

  const bookings = readBookingsFromFile();
  const userBookings = bookings.find((booking) => booking.email === user.email);

  if (!userBookings) {
    return res.status(404).send('Bookings not found');
  }

  res.json({ bookings: userBookings.bookings });
});

export default router;
