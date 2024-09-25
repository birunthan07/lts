import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [mechanics, setMechanics] = useState([]);
  const [users, setUsers] = useState([]);

  const approveMechanic = (mechanicId) => {
    // Functionality to approve a mechanic
  };

  const banUser = (userId) => {
    // Functionality to ban/unban a user
  };

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <ul>
          <li><Link to="/mechanics">Manage Mechanics</Link></li>
          <li><Link to="/users">Manage Users</Link></li>
          <li><Link to="/bookings">Manage Bookings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>
        <h3>Pending Mechanics</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.map((mechanic) => (
              <tr key={mechanic.id}>
                <td>{mechanic.name}</td>
                <td>{mechanic.email}</td>
                <td>
                  <button onClick={() => approveMechanic(mechanic.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Registered Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => banUser(user.id)}>Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
