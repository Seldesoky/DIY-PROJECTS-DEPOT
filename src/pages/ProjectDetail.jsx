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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/comments/${id}`);
        setComments(response.data || []); // Set comments or empty array
      } catch (err) {
        console.error('Failed to fetch comments:', err);
        setLoading(false);
      }
    };

    fetchProject();
    fetchComments();
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

  const handleAddComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add a comment.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5001/api/comments/${id}`,  // Adjusted path for adding a comment
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment(''); // Clear the input field after adding the comment
      const updatedComments = await axios.get(`http://localhost:5001/api/comments/${id}`);  // Adjusted path for fetching comments
      setComments(updatedComments.data); // Refresh the comments
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add a comment.');
      return;
    }    
    try {
      await axios.put(`http://localhost:5001/api/comments/${commentId}`,
        { content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedComments = await axios.get(`http://localhost:5001/api/comments/${id}`);
      setComments(updatedComments.data);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add a comment.');
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/api/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` } });
      setComments(comments.filter((comment) => comment._id !== commentId)); 
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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

      {/* Comments Section */}
      {comments.length > 0 && (
        <>
          <h2>Comments</h2>
          {comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.content} - <strong>{comment.author.username}</strong></p>
              {canEditOrDelete && (
                <>
                  <button onClick={() => handleEditComment(comment._id, prompt('Edit comment', comment.content))}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {/* Add Comment Section (for logged-in users) */}
      {localStorage.getItem('token') && (
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
