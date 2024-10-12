import express from 'express';
import { createComment, getCommentsByProject, updateComment, deleteComment } from '../controllers/commentController.js';
import { isAuthenticated, isModerator, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new comment
router.post('/:projectId', isAuthenticated, createComment);

// Get all comments for a specific project
router.get('/:projectId', getCommentsByProject);

// // Update a comment (author, moderators, and admins can update)
router.put('/:id', isAuthenticated, updateComment);

// // Delete a comment (author, moderators, and admins can delete)
router.delete('/:id', isAuthenticated, deleteComment);

export default router;
