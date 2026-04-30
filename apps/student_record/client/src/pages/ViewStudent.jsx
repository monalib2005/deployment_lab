import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studentService } from '../services/api';

const ViewStudent = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const data = await studentService.getStudentById(id);
      setStudent(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch student details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading student details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!student) {
    return <div className="error">Student not found</div>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      <div className="card">
        <div className="student-card">
          <div className="student-info">
            <h3>{student.name}</h3>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Marks:</strong> {student.marks}</p>
            <p><strong>Created:</strong> {new Date(student.createdAt).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(student.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to={`/edit/${student._id}`} className="btn btn-warning" style={{ marginLeft: '10px' }}>
            Edit Student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
