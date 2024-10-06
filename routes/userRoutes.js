import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', isAuthenticated, getUserProfile);

export default router;
