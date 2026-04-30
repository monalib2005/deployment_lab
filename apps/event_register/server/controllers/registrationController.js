const Registration = require('../models/Registration');

// Create a new registration
const createRegistration = async (req, res) => {
  try {
    const { eventId, name, email } = req.body;

    // Validate required fields
    if (!eventId || !name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already registered for this event
    const existingRegistration = await Registration.findOne({ eventId, email });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Email already registered for this event' });
    }

    const registration = new Registration({
      eventId,
      name,
      email
    });

    const savedRegistration = await registration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ message: 'Error creating registration' });
  }
};

// Get registrations for a specific event
const getRegistrationsByEventId = async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId })
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
};

// Get all registrations (admin view)
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching all registrations:', error);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
};

module.exports = {
  createRegistration,
  getRegistrationsByEventId,
  getAllRegistrations
};
