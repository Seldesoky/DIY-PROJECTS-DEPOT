import express from 'express';
import { isAuthenticated, isModerator, isAdmin } from '../middleware/authMiddleware.js';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// Create a new project (only authenticated users can create)
router.post('/', isAuthenticated, createProject);

// Get all projects (publicly accessible)
router.get('/', getProjects);

// Get a single project by id (publicly accessible)
router.get('/:id', getProjectById);

// Update a project (author, moderators, and admins can update)
router.put('/:id', isAuthenticated, updateProject);

// Delete a project (author, moderators, and admins can delete)
router.delete('/:id', isAuthenticated, deleteProject);

export default router;
