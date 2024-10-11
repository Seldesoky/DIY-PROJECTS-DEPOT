import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AddProject.css'; 

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materials: '',
    steps: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a project.');
        return;
      }

      await axios.post(
        'http://localhost:5001/api/projects',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      setTimeout(() => navigate('/projects'), 2000); 
    } catch (error) {
      console.error('Error adding project:', error);
      setError(error.response?.data?.message || 'Failed to add project.');
    }
  };

  return (
    <div className="add-project-container">
      <h2>Add a New DIY Project</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Project added successfully!</p>}

      <form className="add-project-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Project Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Project Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="materials">Materials</label>
        <textarea
          id="materials"
          name="materials"
          value={formData.materials}
          onChange={handleChange}
          required
        />

        <label htmlFor="steps">Steps</label>
        <textarea
          id="steps"
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button type="submit">Add Project</button>
          <Link to="/projects" className="back-link">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
