import React, { useState } from 'react';
import Navbar from './navbar';
import '../css/getmoney.css';

const GetMoney = () => {
  const [price, setPrice] = useState(115);
  const [received, setReceived] = useState(200);

  return (
    <div className="container">
      <Navbar />
      <div className="payment-section">
        <div className="payment-buttons">
          <button className="qr-code-btn">QR Code</button>
          <button className="cash-btn">เงินสด</button>
        </div>
        <div className="table-number">Table Number <span>9</span></div>

        <div className="payment-info">
          <div className="price">
            <label>ราคา</label>
            <div className="price-value">{price.toFixed(2)}</div>
          </div>
          <div className="received">
            <label>รับเงิน</label>
            <div className="received-value">{received.toFixed(2)}</div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="cancel-btn">ยกเลิก</button>
          <button className="submit-btn">คิดเงิน</button>
        </div>
      </div>
    </div>
  );
};

export default GetMoney;
