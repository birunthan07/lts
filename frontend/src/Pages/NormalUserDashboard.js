import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NormalUserDashboard.css';

const NormalUserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleSearch = () => {
    // Functionality for searching mechanics by location
  };

  return (
    <div className="normal-user-dashboard">
      <nav className="navbar">
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/bookings">Manage Bookings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h1>Search for Mechanics</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Enter your location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Mechanics search results */}
        <div className="mechanic-results">
          {/* Map through mechanic search results and display as cards */}
        </div>

        <h2>Upcoming Bookings</h2>
        <div className="bookings">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index} className="booking-card">
                <h3>{booking.mechanicName}</h3>
                <p>Date: {booking.date}</p>
                <p>Status: {booking.status}</p>
                <button>Cancel</button>
                <button>Reschedule</button>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NormalUserDashboard;
