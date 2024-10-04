import React from 'react';
import '../css/payment.css';  // นำเข้าไฟล์ CSS
import Navbar from './navbar';  // นำเข้าคอมโพเนนต์ Navbar
import Footbar from './footbar';  // นำเข้า Footbar

function App() {
  return (
    <div>
        <Navbar />
      {/* กลุ่มปุ่มที่มีอยู่ */}
      <div className="button-container">
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
          <p className="label">รับเงิน</p>
          <div className="money-box">200.00</div>
        </div>
        <div className="con-button">
            <button>ยกเลิก</button>
            <button>คิดเงิน</button>
        </div>
      </div>
      <Footbar />
    </div>
  );
}

export default App;
