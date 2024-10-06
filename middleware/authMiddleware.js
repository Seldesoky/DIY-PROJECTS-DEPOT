import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to authenticate any user
export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No authorization header found' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication token not found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed, invalid token' });
    }
};

// Middleware to check if the authenticated user has a moderator access
export const isModerator = (req, res, next) => {
    if (req.user && req.user.role === 'moderator') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, requires moderator role' });
    }
};

