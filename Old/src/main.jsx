// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from '../src/components/Menu';
import Payment from '../src/components/payment';
import Payment2 from '../src/components/payment2';
import Edit from '../src/components/edit';
import Summary1 from '../src/components/summary1';
import Summary2 from '../src/components/summary2';
import Summary3 from '../src/components/summary3';
import Summary4 from '../src/components/summary4';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Router>
      <Routes>
        {/* กำหนดเส้นทางสำหรับหน้า Menu และหน้า Checkout */}
        <Route path="/" element={<Menu />} />           {/* เส้นทางเริ่มต้น */}
        <Route path="/payment" element={<Payment />} />  {/* เส้นทางไปหน้าคิดเงิน */}
        <Route path="/payment2" element={<Payment2 />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/summary1" element={<Summary1 />} />
        <Route path="/summary2" element={<Summary2 />} />
        <Route path="/summary3" element={<Summary3 />} />
        <Route path="/summary4" element={<Summary4 />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
