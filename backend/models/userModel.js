// // models/userModel.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'mechanic', 'admin'], default: 'user' },
//   address: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   mechanicStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // For mechanics
//   verificationCertificate: { type: String }, // For mechanics
//   isBanned: { type: Boolean, default: false },
// }, { timestamps: true });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'mechanic', 'admin'], default: 'user' },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  mechanicStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  verificationCertificate: { type: String },
  isBanned: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);