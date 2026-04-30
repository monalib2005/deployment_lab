const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const todoAPI = {
  // Get all todos
  getTodos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (title) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Toggle todo completion
  toggleTodo: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
};
