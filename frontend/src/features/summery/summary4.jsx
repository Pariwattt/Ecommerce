import React from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

const SalesTable = () => {
    const Navigate = useNavigate();
    return (
        <div>
            {/* ส่วนของ Navbar */}
            <Navbar />
            {/* ส่วนของ Footer */}
            <Footbar />
            <div className="summary-header d-flex justify-content-between align-items-center mb-3">
                    {/* วันที่และไอคอนปฏิทิน */}
                    <span> <input type="date" class="form-control w-25" id="dateInput" value="2023-09-15"/></span>
                    <span className="calendar-icon">📅</span>
                </div>
            {/* ส่วนของคอนเทนเนอร์การขาย */}
            <div className="sales-container">
                

                {/* ตารางข้อมูลการขาย */}
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>อันดับ</th>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th>ประเภท</th>
                            <th>จำนวนสินค้า</th>
                            <th>ราคาสินค้า</th>
                            <th>ยอดรวม</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>00001</td>
                            <td>8</td>
                            <td>5560</td>
                            <td>0</td>
                            <td>5560</td>
                            <td>QrCode</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>00002</td>
                            <td>10</td>
                            <td>300</td>
                            <td>150</td>
                            <td>150</td>
                            <td>Cash</td>
                        </tr>
                    </tbody>
                </table>

                {/* ส่วนของปุ่มสรุปยอดขายที่อยู่ทางด้านขวาของตาราง */}
                <div className="summary-section">
                    <p className='ax'>สรุปยอดขาย</p>   
                    <button className="summary-button" onClick={() => Navigate('/Summary1')}>ยอดขายรายวัน</button>
                    <button className="summary-button" onClick={() => Navigate('/Summary3')}>ยอดขายรายเดือน</button>
                    <button className="summary-button" >ยอดขายสินค้า</button>
                </div>
            </div>
        </div>
    );
};

export default SalesTable;
