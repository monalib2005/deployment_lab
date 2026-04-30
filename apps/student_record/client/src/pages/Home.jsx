import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../services/api';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        setStudents(students.filter(student => student._id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete student');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>All Students</h2>
      {students.length === 0 ? (
        <div className="card">
          <p>No students found. <Link to="/add">Add a student</Link> to get started.</p>
        </div>
      ) : (
        <div>
          {students.map(student => (
            <div key={student._id} className="student-card">
              <div className="student-info">
                <h3>{student.name}</h3>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Marks:</strong> {student.marks}</p>
              </div>
              <div className="student-actions">
                <Link to={`/student/${student._id}`} className="btn btn-primary">
                  View
                </Link>
                <Link to={`/edit/${student._id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(student._id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
