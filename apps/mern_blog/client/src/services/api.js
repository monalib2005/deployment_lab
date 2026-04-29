import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Get all blog posts
export const getPosts = async () => {
  const response = await api.get('/posts')
  return response.data
}

// Get single blog post by ID
export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`)
  return response.data
}

// Create a new blog post
export const createPost = async (postData) => {
  const response = await api.post('/posts', postData)
  return response.data
}

// Delete a blog post
export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`)
  return response.data
}

// Update a blog post
export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData)
  return response.data
}
