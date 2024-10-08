import Project from '../models/Project.js';

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, materials, steps } = req.body;
    const newProject = new Project({
      title,
      description,
      materials,
      steps,
      createdBy: req.user._id  
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy', 'username');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Ensure the user is the creator, a moderator, or an admin
    if (project.createdBy.toString() !== req.user._id && req.user.role !== 'moderator' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to edit this project' });
    }
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Ensure the user is the creator, a moderator, or an admin
    if (project.createdBy.toString() !== req.user._id && req.user.role !== 'moderator' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this project' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
