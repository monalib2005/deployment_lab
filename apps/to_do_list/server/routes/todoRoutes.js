const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo
} = require('../controllers/todoController');

// GET /api/todos - Get all todos
router.get('/', getTodos);

// POST /api/todos - Create a new todo
router.post('/', createTodo);

// PUT /api/todos/:id - Toggle todo completion
router.put('/:id', toggleTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', deleteTodo);

module.exports = router;
