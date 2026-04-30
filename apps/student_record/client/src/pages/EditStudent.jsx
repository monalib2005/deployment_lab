import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../services/api';

const EditStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    marks: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setFetchLoading(true);
      const data = await studentService.getStudentById(id);
      setFormData({
        name: data.name,
        email: data.email,
        course: data.course,
        marks: data.marks.toString()
      });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch student details');
    } finally {
      setFetchLoading(false);
    }
  };

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
      await studentService.updateStudent(id, {
        ...formData,
        marks: Number(formData.marks)
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="loading">Loading student details...</div>;
  }

  if (error && !formData.name) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Edit Student</h2>
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

          <div>
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Updating...' : 'Update Student'}
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
