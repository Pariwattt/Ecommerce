import React from 'react';
import Navbar from './navbar';
import Footbar from './footbar';
import '../css/summ1.css';

const SalesTable = () => {
    return (
        <div>
            <Navbar />
            <Footbar />
            
            <div className="sales-container">
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
                            <td><button className="details-button">...</button></td>
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

                <div className="summary-section">
                    <button className="summary-button">ยอดขายรายวัน</button>
                    <button className="summary-button">ยอดขายรายเดือน</button>
                    <button className="summary-button">ยอดขายสินค้า</button>
                </div>
            </div>
        </div>
    );
};

export default SalesTable;
