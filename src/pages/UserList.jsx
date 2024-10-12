import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5001/api/users/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.log('Failed to fetch users. Please try again later.');
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh the user list after deletion
      const response = await axios.get('http://localhost:5001/api/users/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.log('Failed to delete user. Please try again later.');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5001/api/users/${id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh the user list after updating the role
      const response = await axios.get('http://localhost:5001/api/users/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.log('Failed to update user role. Please try again later.');
    }
  };

  return (
    <ul className="project-links">
      {users.length > 0 ? (
        users.map((user) => (
          <li key={user._id}>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
            <button onClick={() => handleDelete(user._id)}>
              Delete User
            </button>
          </li>
        ))
      ) : (
        <li>No Users found</li>
      )}
    </ul>
  );
};

export default UserManagementPage;
