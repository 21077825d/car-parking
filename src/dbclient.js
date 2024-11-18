// src/dbclient.js
import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config.js';

const connect_uri = config.CONNECTION_STR;
const client = new MongoClient(connect_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect(); // Establish the connection
    await client.db('lab5db').command({ ping: 1 }); // Test the connection
    console.log('Successfully connected to the database!');
  } catch (err) {
    console.error('Unable to establish connection to the database!');
    process.exit(1); // Exit the process with error code 1
  }
}

connect().catch(console.dir);

export default client;
