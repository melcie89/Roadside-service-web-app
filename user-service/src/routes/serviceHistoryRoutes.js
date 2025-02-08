const express = require('express');
const router = express.Router();
const serviceHistoryController = require('../controllers/serviceHistoryController');
const { authenticate } = require('../middleware/authMiddleware'); // Auth middleware

// Routes
router.get('/', authenticate, serviceHistoryController.getServiceHistory); // Get service history
router.delete('/:id', authenticate, serviceHistoryController.deleteServiceHistory); // Delete a service history record

module.exports = router;
