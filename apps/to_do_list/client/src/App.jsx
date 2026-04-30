import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { todoAPI } from './services/api';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getTodos();
      setTodos(data);
      setError('');
    } catch (error) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>To-Do List Manager</h1>
      </header>
      
      <main>
        {error && <div className="error">{error}</div>}
        
        <AddTodo setTodos={setTodos} setError={setError} />
        
        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList todos={todos} setTodos={setTodos} setError={setError} />
        )}
      </main>
    </div>
  );
}

export default App;
