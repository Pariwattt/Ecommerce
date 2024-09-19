// src/components/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <img src="https://via.placeholder.com/300" alt="Description" className="home-image" />
      <div className="home-text">
        <h2>Welcome to POS System</h2>
        <p>Your description goes here.</p>
      </div>
    </div>
  );
};

export default Home;
