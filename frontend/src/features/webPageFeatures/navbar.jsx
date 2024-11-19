import React from 'react';
import '../css/navbar.css';  // นำเข้าไฟล์ CSS สำหรับ Navbar
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function Navbar() {
  const Navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="left-buttons">
        <button onClick={() => Navigate('/Menu')}>ขายสินค้า</button>
        <button onClick={() => Navigate('/EditMenu')}>จัดการเมนู</button>
        <button onClick={() => Navigate('/Summary1')}>สรุปยอดขาย</button>
      </div>
      <div className="right-section">
        <div className="user-box">นายผู้จัดการ</div>
        <button>ออกจากระบบ</button>
      </div>
    </div>
  );
}

export default Navbar;
