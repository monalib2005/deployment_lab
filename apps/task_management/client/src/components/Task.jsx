import React from 'react';
import api from '../services/api';

const Task = ({ task, onTaskUpdate, onTaskDelete }) => {
  const handleStatusToggle = async () => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const updatedTask = await api.updateTask(task._id, { status: newStatus });
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(task._id);
        onTaskDelete(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`task-status status-${task.status}`}>
        {task.status}
      </span>
      <div className="task-actions">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={handleStatusToggle}
          />
          <label>Mark as {task.status === 'pending' ? 'completed' : 'pending'}</label>
        </div>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
