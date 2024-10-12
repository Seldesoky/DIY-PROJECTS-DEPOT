import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      // Redirect to Home page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
      <div className="logo-container">
        <img src="https://imgur.com/jLuL4Pl.png" alt="DYI Project Depot Logo" className="logo" />
      </div>
        <p>Discover, share, and get inspired by creative DYI projects from our community!</p>
      </div>
      <Link to="/projects">
          <button>Check DIY Projects</button>
        </Link>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
