import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProject.css';

const EditProject = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materials: '',
    steps: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the project by ID when component loads
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          title: response.data.title,
          description: response.data.description,
          materials: response.data.materials.join('\n'), 
          steps: response.data.steps.join('\n') 
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch project data');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit for update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5001/api/projects/${id}`,
        {
          title: formData.title,
          description: formData.description,
          materials: formData.materials.split('\n'), 
          steps: formData.steps.split('\n') 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/projects'); 
    } catch (error) {
      setError('Failed to update the project');
    }
  };

  if (loading) {
    return <div>Loading project data...</div>;
  }

  return (
    <div className="edit-project-container">
      <h2>Edit Project</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="edit-project-form" onSubmit={handleSubmit}>
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

        <label htmlFor="materials">Materials (one per line)</label>
        <textarea
          id="materials"
          name="materials"
          value={formData.materials}
          onChange={handleChange}
          required
        />

        <label htmlFor="steps">Steps (one per line)</label>
        <textarea
          id="steps"
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
