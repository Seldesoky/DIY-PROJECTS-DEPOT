import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // Check user's role when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    }
  }, []);

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
          {userRole === 'admin' && (
            <a href="/users">User List</a>
          )}
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      </div>

      {/* Adding the logo */}
      <div className="logo-container">
        <img src="https://imgur.com/KM0ia2A.png" alt="DIY Project Depot Logo" className="logo" />
      </div>

      <h1>Welcome to the DIY Project Depot</h1>
      <p>You think of a project, We got you covered.</p>
    </div>
  );
};

export default Home;
