import React, { useState } from 'react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [isMechanic, setIsMechanic] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
    verificationCertificate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, verificationCertificate: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('address', formData.address);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('role', isMechanic ? 'mechanic' : 'normalUser');
    
    if (isMechanic) {
      data.append('verificationCertificate', formData.verificationCertificate);
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        body: data, // Send as FormData for file uploads
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Registration successful:', result.message);
        // Optionally redirect or show a success message
      } else {
        console.error('Registration failed:', result.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-page">
      <h2>Register as {isMechanic ? 'Mechanic' : 'Normal User'}</h2>
      <div className="toggle-role">
        <button onClick={() => setIsMechanic(false)}>Normal User</button>
        <button onClick={() => setIsMechanic(true)}>Mechanic</button>
      </div>
      <form className="registration-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        {isMechanic && (
          <>
            <label htmlFor="verificationCertificate">Upload Verification Certificate:</label>
            <input
              type="file"
              id="verificationCertificate"
              onChange={handleFileChange}
              required
            />
          </>
        )}
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
