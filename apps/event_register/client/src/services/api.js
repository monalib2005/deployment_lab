const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = {
  // Events
  getEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },

  getEvent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    return response.json();
  },

  // Registrations
  createRegistration: async (registrationData) => {
    const response = await fetch(`${API_BASE_URL}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create registration');
    }
    return response.json();
  },

  getRegistrationsByEventId: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/registrations/${eventId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch registrations');
    }
    return response.json();
  },

  getAllRegistrations: async () => {
    const response = await fetch(`${API_BASE_URL}/registrations`);
    if (!response.ok) {
      throw new Error('Failed to fetch all registrations');
    }
    return response.json();
  },
};

export default api;
