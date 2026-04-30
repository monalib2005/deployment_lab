import React, { useState } from 'react';
import api from '../services/api';

const Task = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description
  });

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

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        title: task.title,
        description: task.description
      });
    }
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await api.updateTask(task._id, editForm);
      onTaskUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              required
              className="edit-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              required
              className="edit-textarea"
            />
          </div>
          <div className="edit-actions">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
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
            <button className="btn btn-secondary" onClick={handleEditToggle}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
