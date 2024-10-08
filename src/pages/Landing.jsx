import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div>
      <h1>DIY Project Depot</h1>
      <Link to="/projects">
          <button>Check DIY Projects</button>
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
