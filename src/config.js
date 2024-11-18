/* eslint-disable no-undef */
// src/config.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

if (!process.env.CONNECTION_STR) {
  console.error('CONNECTION_STR is not defined');
  process.exit(1); // Exit the process with error code 1
}

export default {
  CONNECTION_STR: process.env.CONNECTION_STR,
};
