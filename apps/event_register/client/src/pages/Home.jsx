import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) {
    return <div>Loading events...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div>
      <h2>Available Events</h2>
      {events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <Link to={`/event/${event.id}`} className="btn">
              View Details & Register
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default Home
