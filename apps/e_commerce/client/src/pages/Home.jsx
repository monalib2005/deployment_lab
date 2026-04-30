import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Products</h1>
      {error && <div className="error">{error}</div>}
      {products.length === 0 && !loading && (
        <div className="empty-cart">
          <h3>No products available</h3>
          <p>Add some products to get started!</p>
        </div>
      )}
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-description">{product.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/product/${product._id}`} className="btn">
                  View Details
                </Link>
                <button 
                  className="btn" 
                  onClick={() => handleAddToCart(product)}
                  style={{ background: '#28a745' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
