import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Register a new user
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create and save new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

// User login
router.post('/login', [
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

export default router;
