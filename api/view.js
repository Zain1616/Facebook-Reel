// api/view.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/view', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data.txt');

  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }

  const content = fs.readFileSync(filePath, 'utf-8').trim();
  if (!content) return res.json([]);

  const entries = content
    .split('\n')
    .map(line => {
      const match = line.match(/Phone: (.*), Password: (.*)/);
      if (match) {
        return { phone: match[1], password: match[2] };
      }
      return null;
    })
    .filter(entry => entry !== null);

  res.json(entries);
});

module.exports = router;
