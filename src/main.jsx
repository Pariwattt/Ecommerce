// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from '../src/components/Menu';
import Payment from '../src/components/payment';
import Payment2 from '../src/components/payment2';
import Login from '../src/components/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Router>
      <Routes>
        {/* กำหนดเส้นทางสำหรับหน้า Menu และหน้า Checkout */}
        <Route path="/" element={<Login />} />           {/* เส้นทางเริ่มต้น */}
        <Route path="/Menu" element={<Menu />} />
        <Route path="/payment" element={<Payment />} />  {/* เส้นทางไปหน้าคิดเงิน */}
        <Route path="/payment2" element={<Payment2 />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
