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
                            <th>วันที่</th>
                            <th>จำนวนสินค้า</th>
                            <th>ราคา</th>
                            <th>ส่วนลด</th>
                            <th>ยอดรวม</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>59</td>
                            <td>98100</td>
                            <td>5699</td>
                            <td>91888</td>


                        </tr>
                        <tr>
                            <td>2</td>
                            <td>100</td>
                            <td>130012</td>
                            <td>100</td>
                            <td>129912</td>

                        </tr>
                    </tbody>
                    <tfoot className='foot'>
                        <tr>
                            <td colSpan="1">รวม</td>
                            <td>159</td>
                            <td>228112</td>
                            <td>5799</td>
                            <td>221800</td>

                        </tr>
                    </tfoot>
                </table>

                {/* ส่วนของปุ่มสรุปยอดขายที่อยู่ทางด้านขวาของตาราง */}
                <div className="summary-section">
                    <th>1</th>
                    <button className="summary-button" onClick={() => Navigate('/summary1')}>ยอดขายรายวัน</button>
                    <button className="summary-button" >ยอดขายรายเดือน</button>
                    <button className="summary-button" onClick={() => Navigate('/summary4')}>ยอดขายสินค้า</button>
                </div>
            </div>
        </div>
    );
};

export default SalesTable;
