import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import AddTask from './components/AddTask';
import api from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const handleTaskDelete = (deletedTaskId) => {
    setTasks(tasks.filter(task => task._id !== deletedTaskId));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Task Management App</h1>
        <p>A simple CRUD application for managing your tasks</p>
      </div>

      {error && <div className="error">{error}</div>}

      <AddTask onTaskAdded={handleTaskAdded} />

      <div className="tasks-section">
        <h2>Your Tasks ({tasks.length})</h2>
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="task-item">
            <p>No tasks yet. Add your first task above!</p>
          </div>
        ) : (
          tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
