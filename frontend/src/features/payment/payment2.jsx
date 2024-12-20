import React, { useState } from 'react';
import '../css/payment2.css'; 
import Navbar from '../webPageFeatures/navbar'; 
import Footbar from '../webPageFeatures/footbar'; 
import { useLocation, useNavigate } from 'react-router-dom'; // ใช้สำหรับการเปลี่ยนหน้าและรับข้อมูลจาก URL

function Payment() {
    const location = useLocation(); // รับข้อมูลที่ส่งมาจากหน้าก่อนหน้า
    const Navigate = useNavigate(); // ใช้สำหรับการนำทางไปยังหน้าอื่น

    // ดึงข้อมูลจาก state
    const {
        cart = [], // รายการสินค้าในตะกร้า
        discount = 0, // ส่วนลดที่ส่งมาจากหน้า Payment.jsx
        change = 0, // จำนวนเงินทอน
    } = location.state || {};

    // ฟังก์ชันคำนวณยอดรวม
    const calculateTotalAmount = () => {
        return cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    };

    const totalAmount = calculateTotalAmount(); // ยอดรวมก่อนหักส่วนลด
    const finalTotal = totalAmount * (1 - discount / 100); // คำนวณยอดหลังหักส่วนลด

    const [showReceipt, setShowReceipt] = useState(false); // ใช้สำหรับแสดงหรือซ่อนใบเสร็จ

    return (
        <div>
            <Navbar /> {/* Navbar ด้านบน */}
            <div className="new-container">
                {/* ส่วนแสดงเงินทอน */}
                <div className="price-section">
                    <p className="label">ทอนเงิน</p>
                    <div className="price1-box">
                        {new Intl.NumberFormat().format(change > 0 ? change : 0)} บาท
                    </div>
                </div>

                {/* ใบเสร็จ */}
                {showReceipt && (
                    <div className="receipt">
                        {/* ส่วนหัวใบเสร็จ */}
                        <div className="hh">
                            <h3>อาโดรา เบอร์เกอร์ แอน สแน็ค</h3>
                            <h4>สาขา คอมพิวเตอร์</h4>
                            <h4>มหาวิทยาลัยธุรกิจบัณฑิต วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี</h4>
                        </div>

                        {/* ตารางสินค้า */}
                        <table>
                            <thead>
                                <tr>
                                    <th>รายการ</th>
                                    <th>จำนวน</th>
                                    <th>รวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length > 0 ? (
                                    cart.map((product) => (
                                        <tr key={product.code}>
                                            <td>{product.name}</td>
                                            <td style={{ textAlign: 'center' }}>{product.quantity}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                {new Intl.NumberFormat().format(product.quantity * product.price)} บาท
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>
                                            ไม่มีรายการ
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* ส่วนสรุปยอดเงิน */}
                        <div className="sum">
                            <div className="sum-item">
                                <span>ราคา</span>
                                <span>{new Intl.NumberFormat().format(totalAmount)} บาท</span>
                            </div>
                            <div className="sum-item">
                                <span>ส่วนลด</span>
                                <span>{discount}%</span>
                            </div>
                            <div className="sum-item">
                                <span>ยอดคงเหลือ</span>
                                <span>{new Intl.NumberFormat().format(finalTotal)} บาท</span>
                            </div>
                        </div>

                        <div className="close-receipt-button">
                            <button onClick={() => setShowReceipt(false)}>ปิดใบเสร็จ</button>
                        </div>
                    </div>
                )}

                <div className="con-button">
                    <button onClick={() => Navigate('/Menu')}>จบรายการ</button>
                </div>
                <div className="con-button2">
                    <button onClick={() => setShowReceipt(true)}>ใบเสร็จคิดเงิน</button>
                </div>
            </div>
            <Footbar /> 
        </div>
    );
}

export default Payment; 
