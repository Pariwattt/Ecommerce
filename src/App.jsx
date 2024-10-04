import React, { useState } from 'react';
import './App.css';  // ใช้สำหรับเพิ่ม CSS ของคุณ


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // เพิ่มฟังก์ชันการล็อกอินตามที่คุณต้องการ
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#990701', height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}> 
      {/* หัวข้อ E-commerce POS */}
      <h1 style={{ color: '#fff', margin: '50px 0' }}>E-commerce POS</h1>

      <div className="login-box" style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', display: 'flex', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px' }}>
        {/* Form ด้านซ้าย */}
        <div style={{ paddingRight: '20px', width: '100%' }}>
          <h2 style={{ color: '#990701', textAlign: 'center' }}>ลงชื่อเข้าใช้งาน</h2>
          <div style={{ margin: '10px 0', }}>
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '10px', backgroundColor: '#E6E2E2' }}
            />
            <input
              type="password"
              placeholder="User Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: '#E6E2E2' }}
            />
          </div>
          <p style={{ color: '#999', textAlign: 'center' }}>
            <a href="/" style={{ color: '#999', textDecoration: 'none' }}>Forgot password</a>
          </p>
          <button onClick={handleLogin} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
            ลงชื่อเข้าใช้งาน
          </button>
          <p style={{ marginTop: '10px', color: '#999', textAlign: 'center' }}>
            พนักงานใหม่ <a href="/" style={{ color: '#990701', textDecoration: 'none' }}>ลงทะเบียน</a>
          </p>
        </div>
        {/* โลโก้ด้านขวา */}
        <div style={{ paddingLeft: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/img/Red and Yellow Illustrative Burger Logo (1).png" alt="Logo" style={{ maxWidth: '320px' }} />
        </div>
      </div>
    </div>
  );
}

export default App;
