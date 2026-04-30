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

module.exports = {
  getEvents,
  getEventById
};
