const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// GET /api/todos - Get all todos
router.get('/', getTodos);

// POST /api/todos - Create a new todo
router.post('/', createTodo);

// PUT /api/todos/:id - Toggle todo completion
router.put('/:id/toggle', toggleTodo);

// PUT /api/todos/:id - Update todo title
router.put('/:id', updateTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', deleteTodo);

module.exports = router;
