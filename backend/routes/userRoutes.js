// // routes/userRoutes.js
// const express = require('express');
// const { searchMechanics } = require('../controllers/userController');
// const router = express.Router();

// router.get('/search-mechanics', searchMechanics);

// module.exports = router;


const express = require('express');
const { searchMechanics } = require('../controllers/userController');
const router = express.Router();

router.get('/search-mechanics', searchMechanics);

module.exports = router;
