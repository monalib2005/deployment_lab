const Todo = require('../models/Todo');

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({ title });
    await todo.save();
    
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

// Toggle todo completion status
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Update todo title
const updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title.trim();
    await todo.save();
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo
};
