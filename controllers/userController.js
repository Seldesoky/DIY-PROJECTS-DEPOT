import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
export const getUserProfile = (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User is not authenticated' });
    }
    res.json(req.user);
};

// Admin: Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username email role'); // Fetch all users with selected fields
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not retrieve users' });
    }
};

// Admin: Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not delete user' });
    }
};

// Admin: Promote/demote user role
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.role = role;
        await user.save();
        res.json({ message: 'User role updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not update user role' });
    }
};
