import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, deleteUser, updateUserRole } from '../controllers/userController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', isAuthenticated, getUserProfile);

// Admin: Get all users (only admins can access)
router.get('/all', isAuthenticated, isAdmin, getAllUsers);

// Admin: Delete a user (only admins can delete)
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);

// Admin: Promote/demote user role (only admins can update roles)
router.put('/:id/role', isAuthenticated, isAdmin, updateUserRole);

export default router;
