import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function EventManagement() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: ''
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await api.getEvents()
      setEvents(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch events')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({ title: '', date: '', description: '' })
    setEditingEvent(null)
    setShowCreateForm(false)
    setSuccessMessage('')
    setErrorMessage('')
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await api.createEvent(formData)
      setSuccessMessage('Event created successfully!')
      resetForm()
      fetchEvents()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description
    })
    setShowCreateForm(true)
  }

  const handleUpdateEvent = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await api.updateEvent(editingEvent.id, formData)
      setSuccessMessage('Event updated successfully!')
      resetForm()
      fetchEvents()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This will also delete all registrations for this event.')) {
      return
    }

    try {
      await api.deleteEvent(eventId)
      setSuccessMessage('Event deleted successfully!')
      fetchEvents()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  if (loading) {
    return <div>Loading events...</div>
  }

  return (
    <div>
      <Link to="/" className="btn btn-secondary">← Back to Events</Link>
      
      <h2>Event Management</h2>
      
      {successMessage && (
        <div className="success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error">{errorMessage}</div>
      )}

      {!showCreateForm ? (
        <button 
          className="btn" 
          onClick={() => setShowCreateForm(true)}
        >
          Create New Event
        </button>
      ) : (
        <div className="card">
          <h3>{editingEvent ? 'Edit Event' : 'Create New Event'}</h3>
          <form onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}>
            <div className="form-group">
              <label htmlFor="title">Event Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Event Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                style={{ width: '100%', padding: '8px', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
              />
            </div>
            
            <button type="submit" className="btn">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={resetForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Events ({events.length})</h3>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <div style={{ marginTop: '10px' }}>
                <Link to={`/event/${event.id}`} className="btn btn-secondary">
                  View Details
                </Link>
                <button 
                  className="btn" 
                  onClick={() => handleEditEvent(event)}
                  style={{ marginLeft: '5px' }}
                >
                  Edit
                </button>
                <button 
                  className="btn" 
                  onClick={() => handleDeleteEvent(event.id)}
                  style={{ marginLeft: '5px', backgroundColor: '#dc3545' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EventManagement
