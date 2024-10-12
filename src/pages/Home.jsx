import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  return (
    <div className="home-container">
      <div className={`menu-container ${menuOpen ? 'active' : ''}`}>
        <button className="menu-button" onClick={toggleMenu}>Menu</button>
        <div className="nav-dropdown">
          <a href="/home">Home</a>
          <a href="/add-project">Add Project</a>
          <a href="/projects">Projects</a>
          <a href="/users">User List</a>
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      </div>

      {/* Adding the logo */}
      <div className="logo-container">
        <img src="https://imgur.com/jLuL4Pl.png" alt="DYI Project Depot Logo" className="logo" />
      </div>

      <h1>Welcome to the DYI Project Depot</h1>
      <p>You think of a project, We got you covered.</p>
    </div>
  );
};

export default Home;
