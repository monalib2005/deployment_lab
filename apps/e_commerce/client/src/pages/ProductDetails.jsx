import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(id);
      setProduct(data);
      setError('');
    } catch (err) {
      setError('Failed to load product. Please try again later.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        alert('Product deleted successfully!');
        navigate('/');
      } catch (err) {
        alert('Failed to delete product. Please try again.');
        console.error('Error deleting product:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error">{error || 'Product not found'}</div>
        <Link to="/" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="btn" style={{ marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Products
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '10px' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
        </div>
        
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', color: '#ff6b6b', fontWeight: 'bold', marginBottom: '1rem' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ lineHeight: '1.6', marginBottom: '2rem', color: '#666' }}>
            {product.description}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button className="btn" onClick={handleAddToCart} style={{ background: '#28a745' }}>
              Add to Cart
            </button>
            <Link to={`/add-product`} className="btn">
              Add New Product
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
