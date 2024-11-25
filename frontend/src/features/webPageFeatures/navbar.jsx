import React, { useEffect, useState } from 'react'; 
import '../css/navbar.css'; 
import { useNavigate } from 'react-router-dom'; //useNavigate สำหรับการนำทางระหว่างหน้า

function Navbar() {
  const [role, setRole] = useState(""); //เก็บข้อมูล role ของผู้ใช้
  const navigate = useNavigate(); 

  useEffect(() => {
    // ดึงข้อมูล token จาก cookie
    const token = document.cookie.split("; ").find(row => row.startsWith("token="));
    if (token) {
      const tokenValue = token.split("=")[1]; // แยกค่าของ token
      // ถอดรหัส JWT token เพื่อดึง role
      const decodedToken = JSON.parse(atob(tokenValue.split('.')[1])); // แปลงส่วน payload ของ token เป็น JSON
      setRole(decodedToken.role); // เก็บ role ใน state
    }
  }, []); // ทำงานครั้งเดียวเมื่อ component ถูก mount

  const handleLogout = () => {
    // ลบ token ออกจาก cookie เพื่อออกจากระบบ
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/'); // นำทางกลับไปหน้า login
  };

  return (
    <div className="navbar"> 
      <div className="left-buttons">
        <button onClick={() => navigate('/Menu')}>ขายสินค้า</button> 
        {role === "ADMIN" && (
          <button onClick={() => navigate('/EditMenu')}>จัดการเมนู</button> 
        )}
        <button onClick={() => navigate('/Summary1')}>สรุปยอดขาย</button> 
      </div>
      <div className="right-section">
        {/* แสดงข้อความระบุ role ของผู้ใช้ */}
        <div className="user-box">{role === "ADMIN" ? "นายผู้จัดการ" : "ผู้ใช้งาน"}</div>
        <button onClick={handleLogout}>ออกจากระบบ</button>
      </div>
    </div>
  );
}

export default Navbar; 
