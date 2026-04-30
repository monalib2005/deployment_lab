import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/api';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    marks: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.course || !formData.marks) {
      setError('All fields are required');
      return;
    }

    if (isNaN(formData.marks) || formData.marks < 0 || formData.marks > 100) {
      setError('Marks must be a number between 0 and 100');
      return;
    }

    try {
      setLoading(true);
      await studentService.createStudent({
        ...formData,
        marks: Number(formData.marks)
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <div className="card">
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course:</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="marks">Marks (0-100):</label>
            <input
              type="number"
              id="marks"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
