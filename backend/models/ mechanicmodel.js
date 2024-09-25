
// // const mongoose = require('mongoose');

// // const mechanicSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   phoneNumber: { type: String, required: true },
// //   address: { type: String, required: true },
// //   verificationCertificate: { type: String }, // or Buffer if storing file as binary
// //   role: { type: String, default: 'mechanic' },
// //   isVerified: { type: Boolean, default: false },
// //   location: {
// //     lat: { type: Number, required: true },
// //     lng: { type: Number, required: true },
// //   },

// // });

// // const Mechanic = mongoose.model('Mechanic', mechanicSchema);

// // module.exports = Mechanic;


// // models/mechanicModel.js

// const mongoose = require('mongoose');

// const mechanicSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   location: {
//     lat: { type: Number, required: true },
//     lng: { type: Number, required: true },
//   },
//   // other fields...
// });

// const Mechanic = mongoose.model('Mechanic', mechanicSchema);

// module.exports = Mechanic;


const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;