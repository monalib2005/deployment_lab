import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <header>
      <h1>Student Record Management</h1>
      <nav>
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        <Link 
          to="/add" 
          className={location.pathname === '/add' ? 'active' : ''}
        >
          Add Student
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
