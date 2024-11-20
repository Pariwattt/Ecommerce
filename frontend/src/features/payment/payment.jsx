import React, { useState } from 'react';
import '../css/payment.css'; 
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function App() {
  const Navigate = useNavigate();
  const location = useLocation();
  const { cart, discount, discountedTotal } = location.state || {}; // รับข้อมูลจาก Menu.jsx

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

    if (amountReceivedNum < discountedTotalNum) {
      setError('จำนวนเงินที่รับมาต้องไม่น้อยกว่ายอดเงินที่ต้องชำระ');
      return;
    }

    try {
      // ส่งคำขอการชำระเงินไปยัง API
      const response = await axios.post('http://localhost:8081/v1/payment/pay', {
        productIds: cart.map(item => item.id), // เช็คว่า cart มีข้อมูลถูกต้องหรือไม่
        discount: parseFloat(discount || 0),
        amountReceived: amountReceivedNum,
        typePay: typePay,
      });
    
      if (response.status === 201) {
        const change = amountReceivedNum - discountedTotalNum;
        Navigate('/payment2', {
          state: {
            change, // ส่งข้อมูลเงินทอน
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
            {new Intl.NumberFormat().format(discountedTotal)} {/* แสดงยอดที่ต้องชำระ */}
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
