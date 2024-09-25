import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MechanicDashboard.css';

const MechanicDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState({});

  const toggleAvailability = (day) => {
    // Functionality to update availability
  };

  return (
    <div className="mechanic-dashboard">
      <nav className="navbar">
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h1>Appointments</h1>
        <div className="appointments">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index} className="appointment-card">
                <h3>{appointment.userName}</h3>
                <p>Date: {appointment.date}</p>
                <button>Accept</button>
                <button>Decline</button>
              </div>
            ))
          ) : (
            <p>No appointments available.</p>
          )}
        </div>

        <h2>Manage Availability</h2>
        <div className="availability">
          {/* Manage availability with a simple on/off toggle */}
          {Object.keys(availability).map((day) => (
            <div key={day} className="availability-day">
              <span>{day}</span>
              <button onClick={() => toggleAvailability(day)}>
                {availability[day] ? 'Available' : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
