// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './Login.css';

function Login({ setIsLoggedIn }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = 'secretpassword'; // Hardcoded for now

    if (password === correctPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Store the login state in localStorage
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
