import React from 'react';
import Navbar from './navbar';
import Footbar from './footbar';
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
            <div className="date-section">
                    {/* วันที่และไอคอนปฏิทิน */}
                    <span>15 กันยายน 2567</span>
                    <span className="calendar-icon">📅</span>
                </div>
            {/* ส่วนของคอนเทนเนอร์การขาย */}
            <div className="sales-container">
                

                {/* ตารางข้อมูลการขาย */}
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ที่</th>
                            <th>เลขที่บิล</th>
                            <th>จำนวน</th>
                            <th>ราคา</th>
                            <th>ส่วนลด</th>
                            <th>ยอดรวม</th>
                            <th>ชำระด้วย</th>
                            <th>เวลา</th>
                            <th>รายละเอียด</th>
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
                            <td>15:30:45</td>
                            <td><button className="details-button" onClick={() => Navigate('/summary2')}>...</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>00002</td>
                            <td>10</td>
                            <td>300</td>
                            <td>150</td>
                            <td>150</td>
                            <td>Cash</td>
                            <td>15:30:55</td>
                            <td><button className="details-button">...</button></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">รวม</td>
                            <td>18</td>
                            <td>5860</td>
                            <td>150</td>
                            <td>5710</td>
                        </tr>
                    </tfoot>
                </table>

                {/* ส่วนของปุ่มสรุปยอดขายที่อยู่ทางด้านขวาของตาราง */}
                <div className="summary-section">    
                    <button className="summary-button">ยอดขายรายวัน</button>
                    <button className="summary-button" onClick={() => Navigate('/summary3')}>ยอดขายรายเดือน</button>
                    <button className="summary-button" onClick={() => Navigate('/summary4')}>ยอดขายสินค้า</button>
                </div>
            </div>
        </div>
    );
};

export default SalesTable;
