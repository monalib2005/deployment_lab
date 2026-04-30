import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function ViewRegistrations() {
  const [registrations, setRegistrations] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [registrationsData, eventsData] = await Promise.all([
        api.getAllRegistrations(),
        api.getEvents()
      ])
      setRegistrations(registrationsData)
      setEvents(eventsData)
      setError(null)
    } catch (err) {
      setError('Failed to fetch data')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getEventTitle = (eventId) => {
    const event = events.find(e => e.id === eventId)
    return event ? event.title : 'Unknown Event'
  }

  const groupRegistrationsByEvent = () => {
    const grouped = {}
    registrations.forEach(registration => {
      const eventTitle = getEventTitle(registration.eventId)
      if (!grouped[eventTitle]) {
        grouped[eventTitle] = []
      }
      grouped[eventTitle].push(registration)
    })
    return grouped
  }

  if (loading) {
    return <div>Loading registrations...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  const groupedRegistrations = groupRegistrationsByEvent()

  return (
    <div>
      <Link to="/" className="btn btn-secondary">← Back to Events</Link>
      
      <h2>All Registrations</h2>
      
      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        Object.entries(groupedRegistrations).map(([eventTitle, eventRegistrations]) => (
          <div key={eventTitle} className="card">
            <h3>{eventTitle} ({eventRegistrations.length} registrations)</h3>
            {eventRegistrations.map((registration, index) => (
              <div key={index} className="registration-item">
                <strong>{registration.name}</strong> - {registration.email}
                <br />
                <small>Registered: {new Date(registration.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}

export default ViewRegistrations
