import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// Create a new project
router.post('/', isAuthenticated, createProject);

// Get all projects
router.get('/', getProjects);

// Get a single project by id
router.get('/:id', getProjectById);

// Update a project
router.put('/:id', isAuthenticated, updateProject);

// Delete a project
router.delete('/:id', isAuthenticated, deleteProject);

export default router;
