import React, { useState } from 'react';
import '../css/payment2.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const Navigate = useNavigate();

    // รับข้อมูลจาก state ที่ส่งมาจาก Menu
    const {
        cart = [], 
        discount = 0, // ส่วนลดจากหน้า Menu
    } = location.state || {}; // fallback state กรณีไม่มีข้อมูล

    // คำนวณราคารวมของสินค้าทั้งหมด
    const calculateTotalAmount = () => {
        return cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    };

    const totalAmount = calculateTotalAmount(); // ราคารวมของสินค้าทั้งหมด

    // คำนวณยอดหลังหักส่วนลด
    const calculateDiscountedTotal = () => {
        return totalAmount * (1 - (discount / 100)); // หักส่วนลด
    };

    const finalTotal = calculateDiscountedTotal(); // ยอดที่ต้องชำระหลังหักส่วนลด
    const paymentReceived = 100; // สมมติว่าลูกค้าจ่ายเงินมา 100 บาท
    const change = paymentReceived - finalTotal; // เงินทอน
    const [showReceipt, setShowReceipt] = useState(false); // แสดงใบเสร็จหรือไม่

    return (
        <div>
            <Navbar />
            <div className="new-container">
                {/* ส่วนแสดงจำนวนเงินทอน */}
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

                        {/* ปุ่มปิดใบเสร็จ */}
                        <div className="close-receipt-button">
                            <button onClick={() => setShowReceipt(false)}>ปิดใบเสร็จ</button>
                        </div>
                    </div>
                )}

                {/* ปุ่มดำเนินการ */}
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
