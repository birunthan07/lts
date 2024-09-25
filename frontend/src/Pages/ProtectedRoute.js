import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';  // Custom hook for authentication

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth(); // Get the logged-in user from context or localStorage

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />; // Redirect if user role doesn't match
  }

  return children;
};



export default ProtectedRoute;
