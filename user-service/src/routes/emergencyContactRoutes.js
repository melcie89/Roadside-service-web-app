const express = require('express');
const router = express.Router();
const emergencyContactController = require('../controllers/emergencyContactController');
const { authenticate } = require('../middleware/authMiddleware'); // Auth middleware

// Routes
router.get('/', authenticate, emergencyContactController.getContacts); // Get all emergency contacts
router.post('/', authenticate, emergencyContactController.addContact); // Add a new emergency contact
router.put('/:contactId', authenticate, emergencyContactController.updateContact); // Update an emergency contact
router.delete('/:contactId', authenticate, emergencyContactController.deleteContact); // Delete an emergency contact

module.exports = router;
