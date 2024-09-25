

const express = require('express');
const { getMechanics, getAppointments } = require('../controllers/mechanicController');
const { mechanicAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/appointments', mechanicAuth, getAppointments);
router.get('/', getMechanics);

module.exports = router;