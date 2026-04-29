import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPostById, deletePost } from '../services/api'

function ViewPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const data = await getPostById(id)
      setPost(data)
      setError(null)
    } catch (err) {
      setError('Post not found')
      console.error('Error fetching post:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      setDeleteLoading(true)
      await deletePost(id)
      navigate('/')
    } catch (err) {
      setError('Failed to delete post')
      console.error('Error deleting post:', err)
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading post...</div>
  }

  if (error || !post) {
    return (
      <div className="error">
        {error}
        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="view-post">
      <div className="post-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <div className="post-actions">
          <Link to={`/edit/${post._id}`} className="btn btn-secondary">
            Edit
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <small>
            Created: {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
          </small>
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <small>
              Updated: {new Date(post.updatedAt).toLocaleDateString()} at {new Date(post.updatedAt).toLocaleTimeString()}
            </small>
          )}
        </div>
        <div className="post-body">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  )
}

export default ViewPost
