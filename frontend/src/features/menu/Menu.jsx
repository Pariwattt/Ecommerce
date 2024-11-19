import React from 'react';
import '../css/Menu.css';  
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import LockZoom from '../webPageFeatures/LockZoom';

import { useNavigate } from 'react-router-dom';  

// นำเข้าคอมโพเนนต์ที่ต้องการใช้งาน
import Edit from '../editMenu/edit';
import Tabbar from '../editMenu/tabbar';

function App() {
    const Navigate = useNavigate(); 

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
                             <input type="text" placeholder="ค้นหา" className="search-input" />
                        </div>

                        {/* พื้นที่แสดงเมนู */}
                        <div className="menu-grid">
                            {/* ใส่คอมโพเนนต์ Tabbar ที่นี่ */}
                            <Tabbar onCategorySelect={(category) => console.log(category)} />
                        </div>

                        {/* ใส่คอมโพเนนต์ Edit ที่นี่ */}
                        <Edit />
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
                            <button className="pay-btn" onClick={() => Navigate('/Payment')} >คิดเงิน</button>
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
