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
            
            {/* ส่วนของคอนเทนเนอร์การขาย */}
            <div className="sales-container">
                

                {/* ตารางข้อมูลการขาย */}
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ที่</th>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th>จำนวนสินค้า</th>
                            <th>ราคาสินค้า</th>
                            <th>ยอดรวม</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>B0001</td>
                            <td>เบอร์เกอร์ไก่</td>
                            <td>5</td>
                            <td>80</td>
                            <td>400</td>
                            
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>B0021</td>
                            <td>เบอร์เกอร์หมู</td>
                            <td>2</td>
                            <td>80</td>
                            <td>160</td>
                            
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">รวม</td>
                            <td>18</td>
                            <td>5860</td>
                            
                            
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
