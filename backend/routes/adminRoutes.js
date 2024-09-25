// // routes/adminRoutes.js
// const express = require('express');
// const { approveMechanic, getAllUsers } = require('../controllers/adminController');
// const { adminAuth } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.put('/approve-mechanic/:mechanicId', adminAuth, approveMechanic);
// router.get('/users', adminAuth, getAllUsers);

// module.exports = router;


const express = require('express');
const { approveMechanic, getAllUsers } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/approve-mechanic/:mechanicId', adminAuth, approveMechanic);
router.get('/users', adminAuth, getAllUsers);

module.exports = router;
