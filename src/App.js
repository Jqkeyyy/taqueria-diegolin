// src/App.js
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for login state on app load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const addToOrder = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem =>
      cartItem.name === item.name &&
      cartItem.selectedOptions.meat === item.selectedOptions.meat &&
      JSON.stringify(cartItem.selectedOptions.toppings.sort()) === JSON.stringify(item.selectedOptions.toppings.sort())
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: item.quantity }]);
    }
  };

  const updateQuantity = (item, delta) => {
    const updatedItems = cartItems
      .map(cartItem =>
        cartItem === item
          ? { ...cartItem, quantity: cartItem.quantity + delta }
          : cartItem
      )
      .filter(cartItem => cartItem.quantity > 0); // Filter out items with quantity 0 or less
    setCartItems(updatedItems);
  };

  const removeFromOrder = (item) => {
    const updatedItems = cartItems.filter(cartItem => cartItem !== item);
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const itemPrice = item.finalPrice || item.basePrice || '0.00';
        return total + parseFloat(itemPrice.replace('$', '')) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeModal = () => {
    setIsCheckoutOpen(false);
  };

  const submitOrder = (orderDetails) => {
    console.log('Order submitted:', orderDetails);
    alert('Order submitted! Thank you for your purchase.');
    setCartItems([]);  // Clear the cart after submission
    setIsCheckoutOpen(false);  // Close the modal after submission
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Menu addToOrder={addToOrder} />
                <Cart
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromOrder={removeFromOrder}
                  handleCheckout={handleCheckout}
                />
                {isCheckoutOpen && (
                  <CheckoutModal
                    cartItems={cartItems}
                    submitOrder={submitOrder}
                    closeModal={closeModal}
                    totalAmount={calculateTotal()}
                  />
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
