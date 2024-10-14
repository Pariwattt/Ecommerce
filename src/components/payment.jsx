import React from 'react';
import '../css/payment.css';  // นำเข้าไฟล์ CSS
import Navbar from './navbar';  // นำเข้าคอมโพเนนต์ Navbar
import Footbar from './footbar';  // นำเข้า Footbar
import LockZoom from './LockZoom';

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
        <div className="price-section">
          <p className="label">ราคา</p>
          <div className="price-box">115.00</div>
        </div>
        
        <div className="receive-money-section">
          <p className="L-abel">รับเงิน</p>
          <div className="money-box">200.00</div>
        </div>
        <div className="con-button">
            <button onClick={() => Navigate('/')}>ยกเลิก</button>
            <button onClick={() => Navigate('/payment2')}>คิดเงิน</button>
        </div>
      </div>
      <Footbar />
    </div>
  );
}

export default App;
