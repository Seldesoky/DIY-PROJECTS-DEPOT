import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch project details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decodedToken.id, role: decodedToken.role });
    }
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Project deleted successfully!');
      navigate('/projects');
    } catch (err) {
      setError('Failed to delete project. Please try again later.');
    }
  };

  const handleEdit = () => {
    navigate(`/projects/edit/${id}`);
  };

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  // Check if the user is the project author, admin, or moderator
  const canEditOrDelete = user && (user.id === project.createdBy._id || user.role === 'admin' || user.role === 'moderator');

  return (
    <div>
      <h1>{project.title}</h1>
      <p><strong>Description:</strong> {project.description}</p>
      <h2>Materials</h2>
      <ul>
        {project.materials.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol>
        {project.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* Show Edit and Delete buttons only if the user is authorized */}
      {canEditOrDelete && (
        <div>
          <button onClick={handleEdit}>Edit Project</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete Project</button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
