import React, { useState } from 'react';
import '../css/payment.css'; 
import Navbar from '../webPageFeatures/navbar'; 
import Footbar from '../webPageFeatures/footbar'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import axios from 'axios'; 

function App() {
    const Navigate = useNavigate(); // ใช้สำหรับการนำทางไปยังหน้าอื่น
    const location = useLocation(); // รับข้อมูลที่ส่งมาผ่าน state
    // รับข้อมูลจากหน้า `Menu.jsx` ผ่าน state
    const { cart = [], discount, discountedTotal } = location.state || {}; // ตั้งค่าเริ่มต้นกรณีไม่มีข้อมูล
    const [amountReceived, setAmountReceived] = useState(''); // เก็บจำนวนเงินที่รับจากลูกค้า
    const [typePay, setTypePay] = useState(''); // เก็บประเภทการชำระเงินที่เลือก (QR Code หรือ เงินสด)
    const [error, setError] = useState(''); // เก็บข้อความข้อผิดพลาด

    const handleConfirmPayment = async () => {
        // ตรวจสอบว่าประเภทการชำระเงินถูกเลือกหรือยัง
        if (!typePay) {
            setError('กรุณาเลือกประเภทการชำระเงิน');
            return;
        }

        const amountReceivedNum = parseFloat(amountReceived || 0); // แปลงจำนวนเงินที่รับจากข้อความเป็นตัวเลข
        const discountedTotalNum = parseFloat(discountedTotal || 0); // แปลงยอดที่ต้องชำระเป็นตัวเลข

        // ตรวจสอบว่าจำนวนเงินที่รับเพียงพอหรือไม่
        if (isNaN(amountReceivedNum) || amountReceivedNum < discountedTotalNum) {
            setError('จำนวนเงินที่รับมาต้องไม่น้อยกว่ายอดเงินที่ต้องชำระ');
            return;
        }

        try {
            // ส่งคำขอชำระเงินไปยัง API
            const response = await axios.post("http://localhost:8081/v1/payment/pay", {
                products: cart.map(item => ({ // แปลงรายการสินค้าในตะกร้าให้อยู่ในรูปแบบที่ API ต้องการ
                    productId: item.id,
                    code: item.code,
                    name: item.name,
                    type: item.typeId,
                    price: item.price,
                    quantity: item.quantity,
                })),
                discount: parseFloat(discount || 0), // ส่งส่วนลดที่ได้รับ
                amountReceived: amountReceivedNum, // ส่งจำนวนเงินที่รับจากลูกค้า
                typePay: typePay, // ส่งประเภทการชำระเงินที่เลือก
            });

            if (response.status === 201) { // ตรวจสอบว่าสำเร็จหรือไม่
                const change = amountReceivedNum - discountedTotalNum; // คำนวณเงินทอน

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

            // ตรวจสอบว่าข้อผิดพลาดมาจาก API หรือการเชื่อมต่อ
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
        const value = e.target.value; // รับค่าจาก input
        if (value >= 0) {
            setAmountReceived(value); // อัปเดต state ด้วยค่าที่ป้อน
        }
    };

    return (
        <div>
            <Navbar /> 
            <div className="but-con">
                <button
                    className={typePay === 'QR_CODE' ? 'selected' : ''} // เปลี่ยน style หากเลือก QR Code
                    onClick={() => setTypePay('QR_CODE')} // อัปเดตประเภทการชำระเงิน
                >
                    QR Code
                </button>
                <button
                    className={typePay === 'CASH' ? 'selected' : ''} // เปลี่ยน style หากเลือกเงินสด
                    onClick={() => setTypePay('CASH')} // อัปเดตประเภทการชำระเงิน
                >
                    เงินสด
                </button>
            </div>

            <div className="new-container">
                <div className="P-price-section">
                    <p className="L-abel">ราคาหลังหักส่วนลด</p>
                    <div className="price0-box">
                        {new Intl.NumberFormat().format(discountedTotal || 0)} {/* แปลงจำนวนเงินให้แสดงในรูปแบบที่อ่านง่าย */}
                    </div>
                </div>

                <div className="receive-money-section">
                    <p className="L-abel">รับเงิน</p>
                    <input
                        type="number"
                        className="money-box"
                        value={amountReceived} // แสดงค่าปัจจุบันใน input
                        onChange={handleInputChange} // เรียกฟังก์ชันเมื่อมีการเปลี่ยนแปลง
                        placeholder="กรอกจำนวนเงิน"
                        min="0"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}

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
