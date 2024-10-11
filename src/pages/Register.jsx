import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
