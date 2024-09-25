


// const express = require('express');
// const { 
//     createBooking, 
//     updateBookingStatus, 
//     getUserBookings, 
//     getMechanicBookings, 
//     getBookingById, 
//     deleteBooking 
// } = require('../controllers/bookingController'); // Ensure correct import of functions
// const { requireAuth } = require('../middleware/authMiddleware');
// const { requireRole } = require('../middleware/roleMiddleware');
// const router = express.Router();


// console.log(createBooking); // Should not be undefined
// console.log(updateBookingStatus); 
// console.log(getUserBookings);
// console.log(getMechanicBookings);
// console.log(getBookingById);
// console.log(deleteBooking);


// // Normal User Routes
// router.post('/book', requireAuth, requireRole('user'), createBooking); // User creates a booking
// router.get('/my-bookings', requireAuth, requireRole('user'), getUserBookings); // Get all bookings for the logged-in user


// // Mechanic Routes
// router.put('/status/:bookingId', requireAuth, requireRole('mechanic'), updateBookingStatus); // Mechanic accepts/rejects a booking
// router.get('/mechanic-bookings', requireAuth, requireRole('mechanic'), getMechanicBookings); // Get all bookings for the logged-in mechanic

// // General Routes (both users and mechanics can access)
// router.get('/:bookingId', requireAuth, getBookingById); // Get booking details by ID
// router.delete('/:bookingId', requireAuth, deleteBooking); // Admin or user can delete a booking

// module.exports = router;

const express = require('express');
const {
    createBooking,
    updateBookingStatus,
    getUserBookings,
    getMechanicBookings,
    getBookingById,
    deleteBooking,
} = require('../controllers/bookingController');

const router = express.Router();

// Define your routes here
router.post('/book', createBooking); // Ensure createBooking is defined
router.put('/status/:bookingId', updateBookingStatus);
router.get('/my-bookings', getUserBookings);
router.get('/mechanic-bookings', getMechanicBookings);
router.get('/:bookingId', getBookingById);
router.delete('/:bookingId', deleteBooking);

module.exports = router;
