import React, { useState } from 'react';
import '../css/payment2.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
    const location = useLocation();
    const Navigate = useNavigate();

    // รับข้อมูล cart และ change จาก state
    const { cart = [], change } = location.state || {}; // ตั้งค่าเริ่มต้นเป็น array ว่างหากไม่มีค่า
    const [showReceipt, setShowReceipt] = useState(false); // สถานะแสดงใบเสร็จ

    return (
        <div>
            <Navbar />
            <div className="new-container">
                <div className="price-section">
                    <p className="label">ทอนเงิน</p>
                    <div className="price1-box">{change ? new Intl.NumberFormat().format(change) : '0.00'}</div>
                </div>
                
                {showReceipt && (
                    <div className="table-wrapper">
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
                                            <td>{product.quantity}</td>
                                            <td>{new Intl.NumberFormat().format(product.quantity * product.price)}</td>
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
                        {/* ปุ่มปิดใบเสร็จ */}
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

export default App;
