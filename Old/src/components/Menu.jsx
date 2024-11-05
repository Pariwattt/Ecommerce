import React from 'react';
import '../css/Menu.css';  // นำเข้าไฟล์ CSS
import Navbar from './navbar';  // นำเข้าคอมโพเนนต์ Navbar
import Footbar from './footbar';  // นำเข้า Footbar
import LockZoom from './LockZoom';

import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function App() {
    const Navigate = useNavigate();  // สร้าง instance ของ useNavigate
    return (
        <LockZoom>
            <div>
                <Navbar />
                <div className="container-Menu">
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
                        <div className='titleOfsummary'>สรูปยอด</div>
                        <div className="summary">
                            <p>ราคา</p>
                            <div className='price'>115</div>
                            <p>ส่วนลด</p>
                            <input type="text" className='discount' placeholder="ส่วนลด %" />
                            <h2>ยอดชำระ</h2>
                            <div className='Total'>....</div>
                        </div>
                        <div className="buttons">
                            <button className="pay-btn" onClick={() => Navigate('/payment')} >คิดเงิน</button>
                            <button className="cancel-btn" >ยกเลิก</button>
                        </div>
                    </div>
                </div>
                <Footbar />
            </div>
        </LockZoom>
    );
}

export default App;
