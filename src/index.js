import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import login from './login.js'; // Adjusted path since index.js is in ./src
import MongoStore from 'connect-mongo'; // Import connect-mongo as MongoStore
import client from './dbclient.js'; // Import the MongoDB client

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;

// Apply express-session middleware to the whole application
app.use(
  session({
    secret: 'eie4432_project', // Update the session secret
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    store: MongoStore.create({
      // Use MongoDB as the session store
      client,
      dbName: 'lab5db',
      collectionName: 'session',
    }),
  })
);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

// Apply the login route module to the path “/auth” for all HTTP methods
app.use('/auth', login);

// Redirect root URL to /index.html
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Serve index.html directly
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

// Serve static files from the 'static' directory
app.use('/', express.static(path.join(__dirname, '../static'))); // Adjusted path for static files

app.use(express.json());

app.post('/payment', (req, res) => {
  const paymentData = req.body;
  console.log('Received payment data:', paymentData);

  // Process the payment data here
  // For example, save it to a database or send it to a payment gateway

  res.status(200).json({ message: 'Payment processed successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Start the server
app.listen(8080, () => {
  const currentDateTime = new Date().toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' });
  console.log(`Current date and time in HKT: ${currentDateTime}`);
  console.log('Server started at http://127.0.0.1:8080');
});
