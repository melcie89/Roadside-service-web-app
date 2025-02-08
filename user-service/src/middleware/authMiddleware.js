const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication Middleware
exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Authorization Middleware for Admins
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Admins only' });
  }
  next();
};
