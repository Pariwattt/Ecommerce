import React from 'react';
import '../css/navbar.css';  // นำเข้าไฟล์ CSS สำหรับ Navbar
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function Navbar() {
  const Navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="left-buttons">
        <button onClick={() => Navigate('/')}>ขายสินค้า</button>
        <button onClick={() => Navigate('/edit')}>จัดการเมนู</button>
        <button>สรุปยอดขาย</button>
      </div>
      <div className="right-section">
        <div className="user-box">นายผู้จัดการ</div>
        <button>ออกจากระบบ</button>
      </div>
    </div>
  );
}

export default Navbar;
