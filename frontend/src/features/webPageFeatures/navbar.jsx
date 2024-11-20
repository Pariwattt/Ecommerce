import React from 'react';
import '../css/navbar.css';  // นำเข้าไฟล์ CSS สำหรับ Navbar
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function Navbar() {
  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนเส้นทาง

  // ฟังก์ชันสำหรับ logout
  const handleLogout = () => {
    // ลบ token ออกจากคุกกี้
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // รีไดเรกไปหน้า login
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="left-buttons">
        <button onClick={() => navigate('/Menu')}>ขายสินค้า</button>
        <button onClick={() => navigate('/EditMenu')}>จัดการเมนู</button>
        <button onClick={() => navigate('/Summary1')}>สรุปยอดขาย</button>
      </div>
      <div className="right-section">
        <div className="user-box">นายผู้จัดการ</div>
        {/* ปุ่ม logout */}
        <button onClick={handleLogout}>ออกจากระบบ</button>
      </div>
    </div>
  );
}

export default Navbar;
