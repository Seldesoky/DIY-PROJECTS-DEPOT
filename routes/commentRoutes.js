import express from 'express';
import { createComment, getCommentsByProject, updateComment, deleteComment } from '../controllers/commentController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new comment
router.post('/', isAuthenticated, createComment);

// Get all comments for a specific project
router.get('/project/:projectId', getCommentsByProject);

// Update a comment
router.put('/:id', isAuthenticated, updateComment);

// Delete a comment
router.delete('/:id', isAuthenticated, deleteComment);

export default router;
