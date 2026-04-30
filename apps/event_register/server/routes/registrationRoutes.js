const express = require('express');
const router = express.Router();
const { createRegistration, getRegistrationsByEventId, getAllRegistrations } = require('../controllers/registrationController');

// POST /api/registrations - Create new registration
router.post('/', createRegistration);

// GET /api/registrations/:eventId - Get registrations for specific event
router.get('/:eventId', getRegistrationsByEventId);

// GET /api/registrations - Get all registrations (admin view)
router.get('/', getAllRegistrations);

module.exports = router;
