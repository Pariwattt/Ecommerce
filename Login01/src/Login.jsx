import React from 'react';

function Login() {
  const style = {
    backgroundColor: '#990701', // พื้นหลังสีแดง
    height: '100vh', // ความสูงเต็มหน้าจอ
    display: 'flex',
    flexDirection: 'column', // จัดวางแนวตั้ง (เพื่อให้ "สวัสดี" อยู่ด้านบน)
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  };

  const headerStyle = {
    color: 'white', // สีข้อความ
    fontSize: '4rem', // ขนาดข้อความ
    marginBottom: '80px', // ระยะห่างด้านล่าง
    fontWeight: 'bold', // ตัวหนา
  };

  const contentStyle = {
    display: 'flex', // จัดวางเนื้อหาแบบเคียงข้าง
    background: 'white',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 1.5)',
    overflow: 'hidden',
  };

  const formStyle = {
    padding: '20px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column', // จัดเรียงแนวตั้ง
    alignItems: 'center', // จัดกลางในแนวนอน
    textAlign: 'center', // จัดข้อความให้อยู่ตรงกลาง
  };

  const imageStyle = {
    width: '300px',
    height: 'auto',
  };

  return (
    <div style={style}>
      {/* คำว่า "สวัสดี" */}
      <h1 style={headerStyle}>E-commerce POS</h1>

      {/* ส่วนเนื้อหา */}
      <div style={contentStyle}>
        {/* ส่วนแบบฟอร์ม */}
        <div style={formStyle}>
          <h1>เข้าสู่ระบบ</h1>
          <form>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <label htmlFor="username">ชื่อผู้ใช้</label>
              <input type="text" id="username" name="username" style={{ width: '100%' }} />
            </div>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <label htmlFor="password">รหัสผ่าน</label>
              <input type="password" id="password" name="password" style={{ width: '100%' }} />
            </div>
            <button style={{ marginTop: '10px', padding: '10px', width: '100%' }}>
              เข้าสู่ระบบ
            </button>
          </form>
        </div>

        {/* ส่วนรูปภาพ */}
        <img
          src="public/img/Logo_Login.png" // รูปภาพที่คุณต้องการ
          alt="Login"
          style={imageStyle}
        />
      </div>
    </div>
  );
}

export default Login;
