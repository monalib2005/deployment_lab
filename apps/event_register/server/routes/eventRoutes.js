const express = require('express');
const router = express.Router();
const { getEvents, getEventById } = require('../controllers/eventController');

// GET /api/events - Get all events
router.get('/', getEvents);

// GET /api/events/:id - Get single event by ID
router.get('/:id', getEventById);

module.exports = router;
