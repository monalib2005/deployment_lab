const Event = require('../models/Event');
const staticEvents = require('../data/staticEvents');

// Get all events
const getEvents = async (req, res) => {
  try {
    // Check if events exist in database, if not, seed them
    const existingEvents = await Event.find();
    
    if (existingEvents.length === 0) {
      // Seed static events
      await Event.insertMany(staticEvents);
      console.log('Static events seeded to database');
    }
    
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event' });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    // Validate required fields
    if (!title || !date || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate unique ID for the event
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();

    const event = new Event({
      id,
      title,
      date,
      description
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const eventId = req.params.id;

    const event = await Event.findOne({ id: eventId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update fields if provided
    if (title) event.title = title;
    if (date) event.date = date;
    if (description) event.description = description;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    
    const event = await Event.findOne({ id: eventId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Also delete all registrations for this event
    const Registration = require('../models/Registration');
    await Registration.deleteMany({ eventId });

    await Event.deleteOne({ id: eventId });
    res.json({ message: 'Event and its registrations deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
