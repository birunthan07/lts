
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Middleware to authenticate any user
exports.userAuth = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token missing' });

    // Remove 'Bearer ' from token
    const tokenWithoutBearer = token.replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    // Find the user based on the token payload (ID)
    const user = await User.findById(decoded.id);

    // Check if user exists or if the user is banned
    if (!user || user.isBanned) return res.status(401).json({ message: 'Unauthorized' });

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to authenticate admin users
exports.adminAuth = async (req, res, next) => {
  await exports.userAuth(req, res, async () => {
    // Check if the authenticated user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    // Proceed to the next middleware
    next();
  });
};

// Middleware to authenticate mechanic users
exports.mechanicAuth = async (req, res, next) => {
  await exports.userAuth(req, res, async () => {
    // Check if the authenticated user is a mechanic and has an approved status
    if (req.user.role !== 'mechanic' || req.user.mechanicStatus !== 'approved') {
      return res.status(403).json({ message: 'Forbidden: Approved mechanics only' });
    }
    // Proceed to the next middleware
    next();
  });
};

exports.getAppointments = async (req, res) => {
  try {
    // Assuming mechanicAuth middleware adds mechanic's info to req.mechanic
    const mechanicId = req.mechanic._id;

    // Fetch all appointments for this mechanic
    const appointments = await Appointment.find({ mechanicId })
      .populate('userId', 'name email') // Populate user details if needed
      .exec();

    if (!appointments.length) {
      return res.status(404).json({ message: 'No appointments found for this mechanic' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments', details: error.message });
  }
};


exports.getMechanics = async (req, res) => {
  try {
    // Fetch all mechanics
    const mechanics = await Mechanic.find({})
      .populate('serviceId', 'name description') // Populate service details if needed
      .exec();

    if (!mechanics.length) {
      return res.status(404).json({ message: 'No mechanics found' });
    }

    res.status(200).json(mechanics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mechanics', details: error.message });
  }
};
