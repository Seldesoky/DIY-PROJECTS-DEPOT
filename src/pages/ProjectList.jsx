import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticaed, setIsAuthenticated] = useState(false);
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

  // Fetch projects and include author details
  useEffect(() => {

    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/projects');
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Update filteredProjects whenever the search term changes
  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, projects]);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="project-list-container">
      <div className={`menu-container ${menuOpen ? 'active' : ''}`}>
        <button className="menu-button" onClick={toggleMenu}>Menu</button>
        <div className="nav-dropdown">
          <a href="/home">Home</a>
          {isAuthenticaed && (
            <a href="/add-project">Add Project</a>
          )}
          <a href="/projects">Projects</a>
          {isAuthenticaed && (
            <a href="/logout" onClick={handleLogout}>Logout</a>
          )}
        </div>
      </div>

      <h1>DIY Projects</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <ul className="project-links">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`} className="project-link">
                {project.title} <span className="author-name">by {project.createdBy?.username || 'Unknown Author'}</span>
              </Link>
            </li>
          ))
        ) : (
          <li>No projects found</li>
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
