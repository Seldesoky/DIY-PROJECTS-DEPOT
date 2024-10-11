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
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      </div>

      <h1>Welcome to the Home Page</h1>
      <p>Here's some content for the home page...</p>
    </div>
  );
};

export default Home;
