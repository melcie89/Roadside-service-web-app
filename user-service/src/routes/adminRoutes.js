const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware'); // Middleware for admin access

// Routes
router.get('/', authenticate, authorizeAdmin, adminController.getAllUsers); // Get all users
router.put('/:id/role', authenticate, authorizeAdmin, adminController.updateUserRole); // Update user role
router.delete('/:id', authenticate, authorizeAdmin, adminController.deleteUser); // Delete a user

module.exports = router;
