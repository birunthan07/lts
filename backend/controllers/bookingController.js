
const Booking = require('../models/bookingModel');
const Mechanic = require('../models/ mechanicmodel');
const User = require('../models/userModel');

// Create a new booking (Normal User books a Mechanic)
exports.createBooking = async (req, res) => {
  try {
    const { mechanicId, serviceType, appointmentDate, appointmentTime, location } = req.body;

    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    const booking = new Booking({
      userId: req.user.id,
      mechanicId,
      serviceType,
      appointmentDate,
      appointmentTime,
      location,
      status: 'pending',
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Mechanic accepts or rejects a booking
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.mechanicId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};

// Get all bookings for the logged-in user (Normal User)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('mechanicId', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
  }
};

// Get all bookings for the logged-in mechanic
exports.getMechanicBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ mechanicId: req.user.id }).populate('userId', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mechanic bookings', error: error.message });
  }
};

// Get booking details by ID
exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate('userId', 'name email')
      .populate('mechanicId', 'name email');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking details', error: error.message });
  }
};

// Delete a booking by ID (Admin or user can delete)
exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the user is the one who created the booking or an admin
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this booking' });
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};


