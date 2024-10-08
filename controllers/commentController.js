import Comment from '../models/Comment.js';
import Project from '../models/Project.js';

// Create a new comment
export const createComment = async (req, res) => {
    try {
        const { content, projectId } = req.body;

        // Ensure the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newComment = new Comment({
            content,
            project: projectId,
            author: req.user._id
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not create comment' });
    }
};

// Get all comments for a project
export const getCommentsByProject = async (req, res) => {
    try {
        const comments = await Comment.find({ project: req.params.projectId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not fetch comments' });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Ensure the user is the author of the comment, a moderator, or an admin
        if (comment.author.toString() !== req.user._id && req.user.role !== 'moderator' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized to edit this comment' });
        }

        comment.content = req.body.content;
        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not update comment' });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Ensure the user is the author of the comment, a moderator, or an admin
        if (comment.author.toString() !== req.user._id && req.user.role !== 'moderator' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized to delete this comment' });
        }

        await comment.remove();
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not delete comment' });
    }
};
