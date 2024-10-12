import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div>
      <div className="logo-container">
        <img src="https://imgur.com/jLuL4Pl.png" alt="DYI Project Depot Logo" className="logo" />
      </div>
      <Link to="/projects">
          <button>Check DYI Projects</button>
        </Link>
      <p>Discover, share, and get inspired by creative DIY projects from our community!</p>

      <div className="landing-buttons">
        <Link to="/login">
          <button>Log In</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>

      </div>
    </div>
  );
};

export default Landing;
