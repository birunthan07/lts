// models/paymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
