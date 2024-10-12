import React from 'react';
import '../css/navbar.css';  // นำเข้าไฟล์ CSS สำหรับ Navbar

function Navbar() {
  return (
    <div className="navbar">
      <div className="left-buttons">
        <button>ขายสินค้า</button>
        <button>จัดการเมนู</button>
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
