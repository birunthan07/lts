
const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/register', upload.single('verificationCertificate'), authController.register);

module.exports = router;

