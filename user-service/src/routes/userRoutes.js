const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware'); // Auth middleware

// Routes
router.get('/me', authenticate, userController.getProfile); // Get current user's profile
router.put('/me', authenticate, userController.updateProfile); // Update user's profile

module.exports = router;
