import React, { useState } from 'react';
import { todoAPI } from '../services/api';

const TodoList = ({ todos, setTodos, setError }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

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

  const handleEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const handleSave = async (id) => {
    if (!editText.trim()) {
      setError('Todo title cannot be empty');
      return;
    }

    try {
      const updatedTodo = await todoAPI.updateTodo(id, editText.trim());
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      setEditingId(null);
      setEditText('');
      setError('');
    } catch (error) {
      setError('Failed to update todo');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleSave(id);
    } else if (e.key === 'Escape') {
      handleCancel();
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
          {editingId === todo._id ? (
            <input
              type="text"
              className="todo-edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, todo._id)}
              onBlur={() => handleSave(todo._id)}
              autoFocus
            />
          ) : (
            <span 
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
              onDoubleClick={() => handleEdit(todo._id, todo.title)}
            >
              {todo.title}
            </span>
          )}
          <div className="todo-actions">
            {editingId === todo._id ? (
              <>
                <button
                  className="todo-save"
                  onClick={() => handleSave(todo._id)}
                >
                  Save
                </button>
                <button
                  className="todo-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="todo-edit"
                  onClick={() => handleEdit(todo._id, todo.title)}
                >
                  Edit
                </button>
                <button
                  className="todo-delete"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
