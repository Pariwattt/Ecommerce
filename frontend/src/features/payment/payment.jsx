import React, { useState } from 'react';
import '../css/payment.css'; // นำเข้าไฟล์ CSS
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function App() {
    const Navigate = useNavigate();
    const location = useLocation();

    // รับข้อมูลที่ส่งมาจาก Menu.jsx
    const { cart = [], discount, discountedTotal } = location.state || {};

    const [amountReceived, setAmountReceived] = useState('');
    const [typePay, setTypePay] = useState(''); // เก็บประเภทการชำระเงินที่เลือก
    const [error, setError] = useState('');

    const handleConfirmPayment = async () => {
        if (!typePay) {
            setError('กรุณาเลือกประเภทการชำระเงิน');
            return;
        }

        const amountReceivedNum = parseFloat(amountReceived || 0);
        const discountedTotalNum = parseFloat(discountedTotal || 0);

        if (isNaN(amountReceivedNum) || amountReceivedNum < discountedTotalNum) {
            setError('จำนวนเงินที่รับมาต้องไม่น้อยกว่ายอดเงินที่ต้องชำระ');
            return;
        }

        try {
            // ส่งคำขอการชำระเงินไปยัง API
            const response = await axios.post("http://localhost:8081/v1/payment/pay", {
                products: cart.map(item => ({
                    productId: item.id,
                    code: item.code,
                    name: item.name,
                    type: item.typeId,
                    price: item.price,
                    quantity: item.quantity,
                })),
                discount: parseFloat(discount || 0),
                amountReceived: amountReceivedNum,
                typePay: typePay,
            });

            if (response.status === 201) {
                const change = amountReceivedNum - discountedTotalNum;

                // ส่งข้อมูล cart และ change ไปยังหน้า payment2.jsx
                Navigate('/payment2', {
                    state: {
                        cart,   // รายการสินค้าในตะกร้า
                        change, // จำนวนเงินทอน
                        discount, // ส่วนลด
                    },
                });

                alert('ชำระเงินสำเร็จ');
            } else {
                setError('เกิดข้อผิดพลาดในการชำระเงิน');
            }
        } catch (error) {
            console.error('Error confirming payment:', error.response || error.message);

            if (error.response) {
                setError(`ข้อผิดพลาด: ${error.response.data.message || error.response.statusText}`);
            } else {
                setError('เกิดข้อผิดพลาดในการเชื่อมต่อหรือเซิร์ฟเวอร์ไม่ตอบสนอง');
            }
        }
    };

    const handleCancel = () => {
        Navigate('/Menu');
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setAmountReceived(value);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="but-con">
                <button
                    className={typePay === 'QR_CODE' ? 'selected' : ''}
                    onClick={() => setTypePay('QR_CODE')}
                >
                    QR Code
                </button>
                <button
                    className={typePay === 'CASH' ? 'selected' : ''}
                    onClick={() => setTypePay('CASH')}
                >
                    เงินสด
                </button>
            </div>

            <div className="new-container">
                <div className="P-price-section">
                    <p className="L-abel">ราคาหลังหักส่วนลด</p>
                    <div className="price0-box">
                        {new Intl.NumberFormat().format(discountedTotal || 0)} {/* แสดงยอดที่ต้องชำระ */}
                    </div>
                </div>

                <div className="receive-money-section">
                    <p className="L-abel">รับเงิน</p>
                    <input
                        type="number"
                        className="money-box"
                        value={amountReceived}
                        onChange={handleInputChange}
                        placeholder="กรอกจำนวนเงิน"
                        min="0"
                    />
                </div>

                {error && <p className="error-message">{error}</p>} {/* แสดงข้อความ error */}

                <div className="con-button1">
                    <button onClick={handleCancel}>ยกเลิก</button>
                    <button onClick={handleConfirmPayment}>คิดเงิน</button>
                </div>
            </div>
            <Footbar />
        </div>
    );
}

export default App;
