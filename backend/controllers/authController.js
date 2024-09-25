

// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ensure this directory exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Route handler
// exports.register = [upload.single('verificationCertificate'), async (req, res) => {
//   const { name, email, password, address, phoneNumber, role } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     let newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       address,
//       phoneNumber,
//       role,
//     });

//     if (role === 'mechanic') {
//       newUser.verificationCertificate = req.file.path; // Save the file path
//     }

//     await newUser.save();
//     res.status(201).json({ message: 'Registration successful, pending approval for mechanics.' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }];

// // Login remains unchanged
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route handler
exports.register = async (req, res) => {
  const { name, email, password, address, phoneNumber, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    let newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      role,
    });

    if (role === 'mechanic') {
      if (req.file) {
        newUser.verificationCertificate = req.file.path; // Save the file path
      } else {
        return res.status(400).json({ message: 'Verification certificate is required for mechanics.' });
      }
    }

    await newUser.save();
    res.status(201).json({ message: 'Registration successful, pending approval for mechanics.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login remains unchanged
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
