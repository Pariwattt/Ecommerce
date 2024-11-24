import React, { useEffect, useState } from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';
import { useNavigate } from 'react-router-dom';

const SalesTable = () => {
    const Navigate = useNavigate();
    const [salesData, setSalesData] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch รายละเอียดสินค้า (หรือสามารถเปลี่ยนเป็น endpoint จริง)
        fetch('http://localhost:8081/v1/payment/saleDetails/all') // URL ตัวอย่าง
            .then((response) => response.json())
            .then((data) => {
                if (data.saleDetails && Array.isArray(data.saleDetails)) {
                    // คำนวณยอดรวมจำนวนสินค้าและราคาทั้งหมด
                    const sortedData = data.saleDetails.sort((a, b) => b.quantity - a.quantity);
                    setSalesData(sortedData);
                    setTotalQuantity(sortedData.reduce((sum, item) => sum + item.quantity, 0));
                    setTotalPrice(sortedData.reduce((sum, item) => sum + item.quantity * item.price, 0));
                }
            })
            .catch((error) => console.error('Error fetching sale details:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="summary-header d-flex justify-content-between align-items-center mb-3">
                <span>
                    <input type="date" className="form-control w-25" id="dateInput" max={new Date().toISOString().split('T')[0]} />
                </span>
                <span className="calendar-icon">📅</span>
            </div>

            <div className="sales-container">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>อันดับ</th>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th>จำนวนสินค้า</th>
                            <th>ราคาสินค้า</th>
                            <th>ยอดรวม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toFixed(2)}</td>
                                <td>{(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">รวม</td>
                            <td>{totalQuantity}</td>
                            <td></td>
                            <td>{totalPrice.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>

                <div className="summenu">
                <p className="ax">สรุปยอดขาย</p>
                <div className="summary-section">
                    <button className="summary-button" onClick={() => Navigate('/summary1')}>ยอดขายรายวัน</button>
                    <button className="summary-button" onClick={() => Navigate('/summary3')}>ยอดขายรายเดือน</button>
                    <button className="summary-button">ยอดขายสินค้า</button>
                </div>
            </div>
            </div>
            <Footbar />
        </div>
    );
};

export default SalesTable;
