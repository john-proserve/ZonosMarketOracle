// Require external modules
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./src/routes/dataRoutes');

// Load environment variables from .env file
require('dotenv').config();

// Define constants
const PORT = process.env.PORT || 3000;

// Create an instance of an Express application
const app = express();

// Enable parsing of JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the dataRoutes at /api/data
app.use('/api/data', dataRoutes);

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
