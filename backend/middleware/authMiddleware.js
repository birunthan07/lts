const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to authenticate users
exports.userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Token missing' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.isBanned) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.adminAuth = async (req, res, next) => {
  await exports.userAuth(req, res, async () => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden: Admins only' });
    next();
  });
};

exports.mechanicAuth = async (req, res, next) => {
  await exports.userAuth(req, res, async () => {
    if (req.user.role !== 'mechanic' || req.user.mechanicStatus !== 'approved') {
      return res.status(403).json({ message: 'Forbidden: Approved mechanics only' });
    }
    next();
  });
};
