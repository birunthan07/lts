const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // Serve uploaded files

// Define your routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
