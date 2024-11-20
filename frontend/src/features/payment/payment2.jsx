import React from 'react';
import '../css/payment2.css';  // นำเข้าไฟล์ CSS
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const Navigate = useNavigate();

  // รับข้อมูลการทอนเงินที่ส่งมาจากหน้า payment.jsx
  const { change } = location.state || {};

  return (
    <div>
      <Navbar />
      {/* กล่องสี่เหลี่ยมจาก new-container */}
      <div className="new-container">
        <div className="price-section">
          <p className="label">ทอนเงิน</p>
          {/* แสดงเงินทอนที่ได้รับ */}
          <div className="price1-box">{change ? new Intl.NumberFormat().format(change) : '0.00'}</div>
        </div>
        
        <div className="con-button">
          <button onClick={() => Navigate('/Menu')} >จบรายการ</button>
        </div>
        <div className="con-button2">
          <button>ใบเสร็จคิดเงิน</button>
        </div>
      </div>
      <Footbar />
    </div>
  );
}

export default App;
