import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, updatePost } from '../services/api'

function EditPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const data = await getPostById(id)
      setTitle(data.title)
      setContent(data.content)
      setError(null)
    } catch (err) {
      setError('Failed to fetch post')
      console.error('Error fetching post:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      await updatePost(id, { title, content })
      navigate(`/post/${id}`)
    } catch (err) {
      setError('Failed to update post')
      console.error('Error updating post:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading post...</div>
  }

  if (error && !title && !content) {
    return (
      <div className="error">
        {error}
        <div className="back-link">
          <a href="/">← Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="create-post">
      <h2>Edit Post</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            disabled={submitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows="10"
            disabled={submitting}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Post'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate(`/post/${id}`)}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost
