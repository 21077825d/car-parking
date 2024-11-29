import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, '../user.json');
const bookingsFilePath = path.join(__dirname, '../bookings.json');
const eventsFilePath = path.join(__dirname, '../events.json');

export const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

export const readBookingsFromFile = () => {
  if (!fs.existsSync(bookingsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(bookingsFilePath);
  return JSON.parse(data);
};

export const readEventsFromFile = () => {
  if (!fs.existsSync(eventsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(eventsFilePath);
  return JSON.parse(data);
};

export const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const writeBookingsToFile = (bookings) => {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
};

export const writeEventsToFile = (events) => {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
};

export const initializeUsers = () => {
  const users = readUsersFromFile();
  const adminUser = users.find((user) => user.userId === 'admin');
  if (!adminUser) {
    const newAdminUser = {
      account: 'admin',
      id: uuidv4(),
      userId: 'admin',
      nickname: 'Administrator',
      password: bcrypt.hashSync('adminpass', 10),
      email: 'admin@example.com',
      gender: 'other',
      birthdate: '2000-01-01',
      profilePic: '/assets/profile/default-profile.png',
    };
    users.push(newAdminUser);
    writeUsersToFile(users);
  }
};
