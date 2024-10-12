import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css'; 

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); 
        } else {
            setIsAuthenticated(false);
        }
    }, []);

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
    }, [setUsers]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        const deleteUser = async (id) => {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`http://localhost:5001/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const response = await axios.get('http://localhost:5001/api/users/all', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (err) {
                console.log('Failed to delete user. Please try again later.');
            }
        };

        deleteUser(id);
    };

    const handleRole = (id, role) => {
        const updateRole = async (id) => {
            const token = localStorage.getItem('token');
            try {
                await axios.put(`http://localhost:5001/api/users/${id}/role`, { role }, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const response = await axios.get('http://localhost:5001/api/users/all', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (err) {
                console.log('Failed to update user. Please try again later.');
            }
        };

        updateRole(id);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsAuthenticated(false); 
        navigate('/login'); 
    };

    return (
        <div className="user-management-container">
            <div className={`menu-container ${menuOpen ? 'active' : ''}`}>
                <button className="menu-button" onClick={toggleMenu}>Menu</button>
                <div className="nav-dropdown">
                    <a href="/home">Home</a>
                    {isAuthenticated && (
                        <a href="/add-project">Add Project</a>
                    )}
                    <a href="/projects">Projects</a>
                    {isAuthenticated && (
                        <a href="/login" onClick={handleLogout}>Logout</a>
                    )}
                </div>
            </div>

            <ul className="project-links">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user._id}>
                            <p>email: {user.email}</p>
                            <p>role: {user.role}</p>
                            <select onChange={(e) => handleRole(user._id, e.target.value)}>
                                <option> </option>
                                <option>admin</option>
                                <option>moderator</option>
                                <option>user</option>
                            </select>
                            <button onClick={() => handleDelete(user._id)}>Delete User</button>
                        </li>
                    ))
                ) : (
                    <li>No Users found</li>
                )}
            </ul>
        </div>
    );
};

export default UserManagementPage;
