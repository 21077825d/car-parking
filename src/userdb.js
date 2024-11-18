// src/userdb.js
import fs from 'fs/promises';
import client from './dbclient.js';

// Initialize the database and populate it from users.json if empty
async function init_db() {
  try {
    const users = client.db('lab5db').collection('users'); // Reference to users collection

    // Check if the users collection is empty
    const count = await users.countDocuments();
    if (count === 0) {
      const data = await fs.readFile('./users.json', 'utf-8'); // Read users.json
      const userArray = JSON.parse(data); // Parse JSON data
      const result = await users.insertMany(userArray); // Insert users into the collection
      console.log(`Added ${result.insertedCount} users`); // Log the number of users added
    }
  } catch (err) {
    console.error('Unable to initialize the database!');
  }
}

async function update_user(username, password, email, phoneNumber, enabled) {
  const usersCollection = client.db('lab5db').collection('users'); // Reference to users collection

  try {
    // Update or insert user in the database
    const result = await usersCollection.updateOne(
      { username }, // Query criterion
      { $set: { password, email, phonenumber: phoneNumber, enabled } }, // Update operation
      { upsert: true } // Options for upsert
    );

    if (result.upsertedCount > 0) {
      console.log('Added 1 user'); // New record inserted
    } else {
      console.log('Updated 1 user'); // Existing record updated
    }

    // Fetch all users from the database
    const allUsers = await usersCollection.find().toArray();

    // Write the updated user list to users.json
    await fs.writeFile('users.json', JSON.stringify(allUsers, null, 2));
    return true; // Return true if successful
  } catch (err) {
    console.error('Unable to update the database or write to users.json:', err); // Log error message
    return false; // Return false if unsuccessful
  }
}

// Validate user function
async function validate_user(username, password) {
  if (!username || !password) {
    return false; // Return false if either username or password is empty
  }

  const users = client.db('lab5db').collection('users'); // Reference to users collection

  try {
    // Retrieve the user object matching the username and password
    const user = await users.findOne({ username, password });
    if (user) {
      return {
        username: user.username,
        role: user.role,
        enabled: user.enabled,
      }; // Return user information if found
    } else {
      return false; // Return false if username does not exist or password mismatches
    }
  } catch (err) {
    console.error('Unable to fetch from database!'); // Log error message
    return false; // Return false on error
  }
}

async function fetch_user(username) {
  const users = client.db('lab5db').collection('users'); // Reference to users collection

  try {
    // Retrieve the user profile by username
    const user = await users.findOne({ username });
    return user; // Return the user object retrieved
  } catch (err) {
    console.error('Unable to fetch from database!'); // Log error message
    return null; // Return null on error
  }
}
async function username_exist(username) {
  try {
    const user = await fetch_user(username); // Use fetch_user to get the user
    return user !== null; // Return true if user exists, otherwise false
  } catch (err) {
    console.error('Unable to fetch from database!'); // Log error message
    return false; // Return false on error
  }
}
// Run the initialization when this file is loaded
init_db().catch(console.dir);

// Example usage of update_user for testing

export { validate_user, update_user, fetch_user, username_exist }; // Export the functions
