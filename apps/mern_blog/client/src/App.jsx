import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import EditPost from './pages/EditPost'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>MERN Blog</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/create">Create Post</a>
        </nav>
      </header>
      
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
