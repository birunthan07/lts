// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider'; // Ensure you have an AuthProvider

export const useAuth = () => {
  return useContext(AuthContext);
};
