import express from 'express';
import { readUsersFromFile, readBookingsFromFile, writeBookingsToFile } from '../utils/fileHelpers.js';

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
  const userBookings = bookings.filter((booking) => booking.email === user.email);

  if (!userBookings.length) {
    return res.status(404).send('Bookings not found');
  }

  res.json({ bookings: userBookings });
});

router.post('/', (req, res) => {
  const newBooking = req.body;
  const bookings = readBookingsFromFile();
  let userBooking = bookings.find((booking) => booking.email === newBooking.email);

  if (userBooking) {
    userBooking.bookings.push(...newBooking.bookings);
  } else {
    userBooking = {
      email: newBooking.email,
      bookings: newBooking.bookings,
    };
    bookings.push(userBooking);
  }

  writeBookingsToFile(bookings);
  res.status(201).json({ message: 'Booking saved' });
});

export default router;
