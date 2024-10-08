import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  
    navigate('/login'); 
  };

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/home">Home</a></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <h1>Welcome to the Home Page</h1>
      <p>Here's some content for the home page...</p>
    </div>
  );
};

export default Home;
