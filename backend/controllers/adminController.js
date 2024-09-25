// controllers/adminController.js
const User = require('../models/userModel');

exports.approveMechanic = async (req, res) => {
  const { mechanicId } = req.params;

  try {
    const mechanic = await User.findById(mechanicId);
    if (!mechanic || mechanic.role !== 'mechanic') return res.status(404).json({ message: 'Mechanic not found.' });

    mechanic.mechanicStatus = 'approved';
    await mechanic.save();
    res.status(200).json({ message: 'Mechanic approved.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
