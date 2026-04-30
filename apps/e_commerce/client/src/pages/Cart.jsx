import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(productId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some products to your cart to get started!</p>
          <Link to="/" className="btn" style={{ marginTop: '1rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Your Cart ({cart.length} items)</h1>
        <button className="btn btn-danger" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.2rem' }}>
                ${item.price.toFixed(2)}
              </p>
              <p style={{ color: '#666' }}>{item.description}</p>
            </div>
            
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <span style={{ margin: '0 0.5rem', fontWeight: 'bold' }}>
                  {item.quantity}
                </span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <span style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              
              <button 
                className="btn btn-danger"
                onClick={() => handleRemoveItem(item._id)}
                style={{ padding: '0.5rem 1rem' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="total">
        Total: ${getCartTotal().toFixed(2)}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/" className="btn" style={{ background: '#6c757d' }}>
          Continue Shopping
        </Link>
        <button 
          className="btn" 
          style={{ background: '#28a745' }}
          onClick={() => alert('Checkout functionality not implemented in this minimal version')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
