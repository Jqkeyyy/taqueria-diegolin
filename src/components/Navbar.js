// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Updated styling for the floating menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
      <button onClick={toggleMenu} className={`menu-btn ${isOpen ? 'open' : ''}`}>
        &#9776;
      </button>
      {isOpen && (
        <div className="menu-content">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

