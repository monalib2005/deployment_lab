const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

// GET /api/events - Get all events
router.get('/', getEvents);

// GET /api/events/:id - Get single event by ID
router.get('/:id', getEventById);

// POST /api/events - Create a new event
router.post('/', createEvent);

// PUT /api/events/:id - Update an event
router.put('/:id', updateEvent);

// DELETE /api/events/:id - Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;
