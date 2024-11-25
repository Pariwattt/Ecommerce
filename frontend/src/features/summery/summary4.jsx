import React, { useEffect, useState } from 'react'; 
import Navbar from '../webPageFeatures/navbar'; 
import Footbar from '../webPageFeatures/footbar'; 
import '../css/summary1.css'; 
import { useNavigate } from 'react-router-dom'; // useNavigate สำหรับการนำทางระหว่างหน้า

const SalesTable = () => {
    const Navigate = useNavigate(); // ฟังก์ชันการนำทางระหว่างหน้า
    const [salesData, setSalesData] = useState([]); //เก็บข้อมูลยอดขายสินค้า
    const [totalQuantity, setTotalQuantity] = useState(0); //เก็บยอดรวมจำนวนสินค้า
    const [totalPrice, setTotalPrice] = useState(0); //เก็บยอดรวมราคาสินค้า

    useEffect(() => {
        // Fetch ข้อมูลรายละเอียดสินค้าจาก API
        fetch('http://localhost:8081/v1/payment/saleDetails/all') 
            .then((response) => response.json()) // แปลงผลลัพธ์เป็น JSON
            .then((data) => {
                if (data.saleDetails && Array.isArray(data.saleDetails)) {
                    // ตรวจสอบว่ามีข้อมูลในรูปแบบ array
                    // จัดเรียงข้อมูลจากสินค้าที่ขายมากไปหาน้อย
                    const sortedData = data.saleDetails.sort((a, b) => b.quantity - a.quantity);
                    setSalesData(sortedData); // บันทึกข้อมูลสินค้าที่จัดเรียงแล้ว
                    // คำนวณยอดรวมจำนวนสินค้า
                    setTotalQuantity(sortedData.reduce((sum, item) => sum + item.quantity, 0));
                    // คำนวณยอดรวมราคาสินค้า
                    setTotalPrice(sortedData.reduce((sum, item) => sum + item.quantity * item.price, 0));
                }
            })
            .catch((error) => console.error('Error fetching sale details:', error)); // แสดงข้อผิดพลาด
    }, []); // ทำงานครั้งเดียวเมื่อ component ถูก mount

    return (
        <div>
            <Navbar /> 

            <div className="sales-container frame">
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
                            <td>{totalQuantity}</td> {/* แสดงยอดรวมจำนวนสินค้า */}
                            <td></td>
                            <td>{totalPrice.toFixed(2)}</td> {/* แสดงยอดรวมราคาสินค้า */}
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
