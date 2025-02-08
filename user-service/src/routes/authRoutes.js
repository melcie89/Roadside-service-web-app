const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes
router.post('/register', authController.register); // Register user
router.post('/login', authController.login);       // User login
router.put('/reset-password', authController.resetPassword); // Reset password

module.exports = router;
