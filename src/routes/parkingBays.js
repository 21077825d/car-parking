import express from 'express';
import { readParkingBaysFromFile, writeParkingBaysToFile } from '../utils/fileHelpers.js';

const router = express.Router();

// Get all parking bays
router.get('/', (req, res) => {
  const parkingBays = readParkingBaysFromFile();
  res.json(parkingBays);
});

// Add new parking bays
router.post('/', (req, res) => {
  const newBays = req.body;
  const parkingBays = readParkingBaysFromFile();

  newBays.forEach((bay) => {
    parkingBays.push(bay);
  });

  writeParkingBaysToFile(parkingBays);
  res.status(201).json({ message: 'Parking bays added' });
});

export default router;
