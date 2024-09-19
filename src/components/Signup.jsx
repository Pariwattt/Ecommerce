// src/components/Signup.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.length >= 8 && password.length >= 6) {
      localStorage.setItem('user', id);
      history.push('/login');
    } else {
      alert("ID must be at least 8 characters and Password must be at least 6 characters");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
