// src/components/Dashboard.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const history = useHistory();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user}</h2>
      <button onClick={handleLogout}>Log Out</button>
      <div className="dashboard-menu">
        <button>เข้าสู่ระบบขาย</button>
        <button>สรุปยอดขาย</button>
      </div>
    </div>
  );
};

export default Dashboard;
