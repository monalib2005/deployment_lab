import React, { useState } from 'react';
import { todoAPI } from '../services/api';

const AddTodo = ({ setTodos, setError }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a todo title');
      return;
    }

    try {
      const newTodo = await todoAPI.createTodo(title.trim());
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      setTitle('');
      setError('');
    } catch (error) {
      setError('Failed to add todo');
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-todo-input"
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="add-todo-button">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
