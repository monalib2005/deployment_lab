import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../services/api'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await getPosts()
      setPosts(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch posts')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading posts...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="home">
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="no-posts">No posts yet. Create your first post!</p>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-preview">
                {post.content.substring(0, 150)}...
              </p>
              <div className="post-meta">
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <Link to={`/post/${post._id}`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
