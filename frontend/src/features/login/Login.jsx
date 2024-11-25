import React, { useState } from 'react'; // นำเข้า React และ useState สำหรับการจัดการ state
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางระหว่างหน้า
import axios from 'axios'; // นำเข้า axios สำหรับขอ HTTP
import '../css/Login.css'; // 
import Logo from '../../../img/Logo.png'; 

function Login() {
  // State สำหรับจัดการค่า username, password และ error
  const [username, setUsername] = useState(''); // เก็บชื่อผู้ใช้
  const [password, setPassword] = useState(''); // เก็บรหัสผ่าน
  const [error, setError] = useState(''); //แสดงข้อความข้อผิดพลาด
  const navigate = useNavigate(); // useNavigate ควบคุมการเปลี่ยนหน้า

  // ฟังก์ชัเข้าสู่ระบบ
  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกันการ reload หน้าเมื่อฟอร์มถูก submit
    try {
      // ส่งคำขอ POST ไปยังเซิร์ฟเวอร์เพื่อเข้าสู่ระบบ
      const response = await axios.post(
        'http://localhost:8081/v1/user/login',
        { username, password }, // ข้อมูลที่ส่งไปกับคำขอ
        { withCredentials: true } // ใช้คุกกี้ในการยืนยันตัวตน
      );

      if (response.status === 200) { // ตรวจสอบว่าเซิร์ฟเวอร์ตอบกลับด้วยสถานะ(สำเร็จ)
        const { message } = response.data; // ข้อความตอบกลับจากเซิร์ฟเวอร์
        alert(message); // แจ้งผู้ใช้ว่าเข้าสู่ระบบสำเร็จ

        // ตรวจสอบว่ามี token ในคุกกี้
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));

        // มี token นำทางผู้ใช้ไปที่หน้าเมนู
        if (token) {
          navigate('/Menu');
        } else {
          alert("Token is missing!"); // แจ้งเตือนหากไม่มี token
        }
      }
    } catch (err) {
      // จัดการข้อผิดพลาดเมื่อเข้าสู่ระบบล้มเหลว
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div className='StyleLogin'> 
      <h1 className='headerStyle'>E-commerce POS</h1> 
      <div className='inner'> 
        <div className='contentStyle'>
          <div className='formStyle'> 
            <h1>เข้าสู่ระบบ</h1> 
            <form onSubmit={handleLogin}> {/* ฟอร์มสำหรับกรอกชื่อผู้ใช้และรหัสผ่าน */}
              <div style={{ width: '100%', marginBottom: '10px' }}>
                <label htmlFor="username">ชื่อผู้ใช้</label> 
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // อัปเดต state ของ username
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div style={{ width: '100%', marginBottom: '10px' }}>
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // อัปเดต state ของ password
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{ marginTop: '10px', padding: '10px', width: '100%' }}
              >
                เข้าสู่ระบบ
              </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* แสดงข้อผิดพลาดถ้ามี */}
          </div>
          <img src={Logo} alt="Login" className='imageStyle' /> 
        </div>
      </div>
    </div>
  );
}

export default Login;
