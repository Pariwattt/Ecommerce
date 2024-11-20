import React, { useEffect, useState } from 'react';
import '../css/navbar.css'; 
import { useNavigate } from 'react-router-dom'; 

function Navbar() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="));
    if (token) {
      const tokenValue = token.split("=")[1];
      const decodedToken = JSON.parse(atob(tokenValue.split('.')[1])); // Decoding JWT token
      setRole(decodedToken.role);  // เก็บ role จาก token
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="left-buttons">
        <button onClick={() => navigate('/Menu')}>ขายสินค้า</button>
        {role === "ADMIN" && (
          <button onClick={() => navigate('/EditMenu')}>จัดการเมนู</button> // ปุ่มนี้แสดงเฉพาะสำหรับ ADMIN
        )}
        <button onClick={() => navigate('/Summary1')}>สรุปยอดขาย</button>
      </div>
      <div className="right-section">
        <div className="user-box">{role === "ADMIN" ? "นายผู้จัดการ" : "ผู้ใช้งาน"}</div>
        <button onClick={handleLogout}>ออกจากระบบ</button>
      </div>
    </div>
  );
}

export default Navbar;
