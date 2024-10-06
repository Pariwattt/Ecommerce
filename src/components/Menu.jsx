import React from 'react';
import '../css/Menu.css';  // นำเข้าไฟล์ CSS
import Navbar from './navbar';  // นำเข้าคอมโพเนนต์ Navbar
import Footbar from './footbar';  // นำเข้า Footbar

function App() {
    return (
        <div>
            <Navbar />
            <div className="container">
                {/* ตารางแสดงรายการสินค้า และ พื้นที่แสดงเมนู */}
                <div className="left-container">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>รายการ</th>
                                    <th>ราคา</th>
                                    <th>จำนวน</th>
                                    <th>รวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>เบอร์เกอร์ไก่</td>
                                    <td>50</td>
                                    <td>2</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td>น้ำดื่มสิงห์</td>
                                    <td>15</td>
                                    <td>1</td>
                                    <td>15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* แถบเมนูหลัก */}
                    <div className="navbarMenuType">
                        <button className="nav-item">เบอร์เกอร์</button>
                        <button className="nav-item">ของทานเล่น</button>
                        <button className="nav-item">เครื่องดื่ม</button>
                        <button className="nav-item">Cafe</button>
                        <input type="text" placeholder="ค้นหา" className="search-input" />
                    </div>

                    {/* พื้นที่แสดงเมนู */}
                    <div className="menu-grid">
                        <button className="menu-item">เบอร์เกอร์ไก่</button>
                        <button className="menu-item">เบอร์เกอร์หมู</button>
                        <button className="menu-item">เบอร์เกอร์ปลา</button>
                        <button className="menu-item">เบอร์เกอร์เนื้อ</button>
                        <button className="menu-item">เบอร์เกอร์ไก่</button>
                        <button className="menu-item">เบอร์เกอร์หมู</button>
                        <button className="menu-item">เบอร์เกอร์ปลา</button>
                        <button className="menu-item">เบอร์เกอร์เนื้อ</button>
                        <button className="menu-item">เบอร์เกอร์ไก่</button>
                        <button className="menu-item">เบอร์เกอร์หมู</button>
                        <button className="menu-item">เบอร์เกอร์ปลา</button>
                        <button className="menu-item">เบอร์เกอร์เนื้อ</button>
                    </div>
                </div>

                {/* สรุปยอดชำระเงิน */}
                <div className="summary-container">
                    <div className="summary">
                        <p>ราคา: <span>115</span></p>
                        <p>ส่วนลด: <span>0</span></p>
                        <h2>ยอดชำระ: <span>115.00</span></h2>
                    </div>
                    <div className="buttons">
                        <button className="pay-btn">คิดเงิน</button>
                        <button className="cancel-btn">ยกเลิก</button>
                    </div>
                </div>
            </div>
            <Footbar />
        </div>
    );
}

export default App;
