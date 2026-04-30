import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationError, setRegistrationError] = useState(null)

  useEffect(() => {
    fetchEventDetails()
    fetchRegistrations()
  }, [id])

  const fetchEventDetails = async () => {
    try {
      const data = await api.getEvent(id)
      setEvent(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch event details')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    try {
      const data = await api.getRegistrationsByEventId(id)
      setRegistrations(data)
    } catch (err) {
      console.error('Error fetching registrations:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setRegistrationError(null)
    setRegistrationSuccess(false)

    try {
      await api.createRegistration({
        eventId: id,
        name: formData.name,
        email: formData.email
      })
      setRegistrationSuccess(true)
      setFormData({ name: '', email: '' })
      fetchRegistrations() // Refresh registrations list
    } catch (err) {
      setRegistrationError(err.message)
    }
  }

  if (loading) {
    return <div>Loading event details...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div>
      <Link to="/" className="btn btn-secondary">← Back to Events</Link>
      
      <div className="card">
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {event.description}</p>
      </div>

      <div className="card">
        <h3>Register for this Event</h3>
        {registrationSuccess && (
          <div className="success">Registration successful!</div>
        )}
        {registrationError && (
          <div className="error">{registrationError}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Registrations ({registrations.length})</h3>
        {registrations.length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          registrations.map((registration, index) => (
            <div key={index} className="registration-item">
              <strong>{registration.name}</strong> - {registration.email}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EventDetails
