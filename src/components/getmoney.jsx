import React, { useState } from 'react';
import Navbar from './navbar';
import '../css/getmoney.css';

const GetMoney = () => {
  const [price, setPrice] = useState(115);
  const [received, setReceived] = useState(200);

  return (
    <div className="page-layout">
      <Navbar />
      
      {/* Buttons positioned to the left, now aligned horizontally */}
      <div className="left-buttons">
        <button className="qr-code-btn">QR Code</button>
        <button className="cash-btn">เงินสด</button>
      </div>

      {/* Payment section moved to the right */}
      <div className="container">
        <div className="payment-section">
          <div className="payment-info">
            <div className="price">
              <label className="submit-label">คิดเงิน</label>
              <div className="price-value red">{price.toFixed(2)}</div>
            </div>
            <div className="received">
              <label className="received-label">รับเงิน</label>
              <div className="received-value green">{received.toFixed(2)}</div>
            </div>
          </div>

          {/* Add both buttons here */}
          <div className="action-buttons">
            <button className="cancel-btn">ยกเลิก</button>
            <button className="submit-btn">คิดเงิน</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMoney;
