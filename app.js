// Import required modules
const express = require('express');
const pgp = require('pg-promise')();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL database connection
const connectionString = 'postgres://eawrfnmy_dev:Ron271894!@cloveroo.com/var/run/postgresql/eawrfnmy_dev_cloveroo';
//const connectionString = 'postgres://postgres:Ron271894@localhost:5432/postgres';
const db = pgp(connectionString);

// Middleware for parsing JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the User Schema and Model
const TableName = new pgp.helpers.TableName('users');

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Insert user into the database
    const insertUserQuery = pgp.helpers.insert(
      { username, password },
      null,
      TableName // Use TableName here
    );
    await db.none(insertUserQuery);

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});