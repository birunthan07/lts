// // models/bookingModel.js
// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   serviceType: { type: String, required: true },
//   date: { type: Date, required: true },
//   location: { type: String, required: true }, 
//   status: { type: String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending' },
//   paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);


const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic', required: true },
  serviceType: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
