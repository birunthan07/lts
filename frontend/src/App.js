// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider'; // Import your AuthProvider
import LandingPage from './Pages/LandingPage';
import RegistrationPage from './Pages/RegistrationPage';
import LoginPage from './Pages/LoginPage';
import AdminDashboard from './Pages/AdminDashboard';
import MechanicDashboard from './Pages/MechanicDashboard';
import NormalUserDashboard from './Pages/NormalUserDashboard';
import PaymentPage from './Pages/PaymentPage';
import PaymentHistory from './Pages/PaymentHistory';
import RefundDispute from './Pages/RefundDispute';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} 
          />

          {/* Mechanic Routes */}
          <Route 
            path="/mechanic-dashboard" 
            element={<ProtectedRoute role="mechanic"><MechanicDashboard /></ProtectedRoute>} 
          />

          {/* Normal User Routes */}
          <Route 
            path="/user-dashboard" 
            element={<ProtectedRoute role="user"><NormalUserDashboard /></ProtectedRoute>} 
          />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/refund-dispute" element={<RefundDispute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
