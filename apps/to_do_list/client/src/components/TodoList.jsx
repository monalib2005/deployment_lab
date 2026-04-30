import React from 'react';
import { todoAPI } from '../services/api';

const TodoList = ({ todos, setTodos, setError }) => {
  const handleToggle = async (id) => {
    try {
      const updatedTodo = await todoAPI.toggleTodo(id);
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (error) {
      setError('Failed to update todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      setError('Failed to delete todo');
    }
  };

  if (todos.length === 0) {
    return <div className="empty-state">No todos yet. Add one above!</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className="todo-item">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo._id)}
          />
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <button
            className="todo-delete"
            onClick={() => handleDelete(todo._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
