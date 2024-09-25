// // controllers/userController.js
// const User = require('../models/userModel');

// exports.searchMechanics = async (req, res) => {
//   const { location } = req.query;

//   try {
//     const mechanics = await User.find({ role: 'mechanic', address: { $regex: location, $options: 'i' }, mechanicStatus: 'approved' });
//     res.status(200).json(mechanics);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const User = require('../models/userModel');

exports.searchMechanics = async (req, res) => {
  const { location } = req.query;

  try {
    const mechanics = await User.find({
      role: 'mechanic',
      address: { $regex: location, $options: 'i' },
      mechanicStatus: 'approved'
    });
    res.status(200).json(mechanics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
