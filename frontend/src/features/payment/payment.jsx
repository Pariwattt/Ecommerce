import React from 'react';
import '../css/payment.css';  // นำเข้าไฟล์ CSS
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import LockZoom from '../webPageFeatures/LockZoom';

import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function App() {
  const Navigate = useNavigate();
  return (
    <div>
       <LockZoom/>
        <Navbar />
      {/* กลุ่มปุ่มที่มีอยู่ */}
      <div className="but-con">
        <button>QR Code</button>
        <button>เงินสด</button>
      </div>

      {/* กล่องสี่เหลี่ยมจาก new-container */}
      <div className="new-container">
        <div className="P-price-section">
          <p className="L-abel">ราคา</p>
          <div className="price0-box">115.00</div>
        </div>
        
        <div className="receive-money-section">
          <p className="L-abel">รับเงิน</p>
          <div className="money-box">200.00</div>
        </div>
        <div className="con-button1">
            <button onClick={() => Navigate('/')}>ยกเลิก</button>
            <button onClick={() => Navigate('/Payment2')}>คิดเงิน</button>
        </div>
      </div>
      <Footbar />
    </div>
  );
}

export default App;
