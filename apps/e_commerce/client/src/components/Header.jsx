import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getCartCount } = useCart();

  return (
    <header>
      <nav className="container">
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Simple E-commerce
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-product">Add Product</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart ({getCartCount()})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
