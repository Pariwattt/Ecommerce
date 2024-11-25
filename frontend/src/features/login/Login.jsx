import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
import Logo from '../../../img/Logo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/v1/user/login', {
        username,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        const { message } = response.data;
        alert(message); // แจ้งผู้ใช้ว่าเข้าสู่ระบบสำเร็จ

        // ตรวจสอบว่า token มีอยู่ในคุกกี้
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        console.log("Token after login:", token); // เช็คค่า token

        // ถ้ามี token จะนำทางไปหน้าอื่น
        if (token) {
          navigate('/Menu');
        } else {
          alert("Token is missing!");
        }
      }
    } catch (err) {
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
            <form onSubmit={handleLogin}>
              <div style={{ width: '100%', marginBottom: '20px' }}>
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div style={{ width: '100%', marginBottom: '20px' }}>
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <button className='bton'
                type="submit"
                
              >
                เข้าสู่ระบบ
              </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <img src={Logo} alt="Login" className='imageStyle' />
        </div>
      </div>
    </div>
  );
}

export default Login;