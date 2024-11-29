import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { readEventsFromFile, writeEventsToFile } from '../utils/fileHelpers.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../assets/events'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  const events = readEventsFromFile();
  res.json({ events });
});

router.post('/create', upload.single('coverImage'), (req, res) => {
  const { title, startDate, endDate, venue, description, discount } = req.body;
  const events = readEventsFromFile();
  const newEvent = {
    id: Date.now().toString(),
    title,
    startDate,
    endDate,
    venue,
    description,
    discount,
    coverImage: `/assets/events/${req.file.filename}`,
  };
  events.push(newEvent);
  writeEventsToFile(events);
  res.json({ message: 'Event created successfully' });
});

router.put('/edit/:id', upload.single('coverImage'), (req, res) => {
  const { id } = req.params;
  const { title, date, time, venue, description } = req.body;
  const events = readEventsFromFile();
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const updatedEvent = {
    ...events[eventIndex],
    title,
    date,
    time,
    venue,
    description,
    coverImage: req.file ? `/assets/events/${req.file.filename}` : events[eventIndex].coverImage,
  };

  events[eventIndex] = updatedEvent;
  writeEventsToFile(events);
  res.json({ message: 'Event updated successfully' });
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const events = readEventsFromFile();
  const updatedEvents = events.filter((event) => event.id !== id);

  if (events.length === updatedEvents.length) {
    return res.status(404).json({ message: 'Event not found' });
  }

  writeEventsToFile(updatedEvents);
  res.json({ message: 'Event deleted successfully' });
});

export default router;
