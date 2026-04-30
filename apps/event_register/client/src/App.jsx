import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import ViewRegistrations from './pages/ViewRegistrations'

function App() {
  return (
    <div className="container">
      <h1>Event Registration System</h1>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/registrations">View Registrations</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/registrations" element={<ViewRegistrations />} />
      </Routes>
    </div>
  )
}

export default App
