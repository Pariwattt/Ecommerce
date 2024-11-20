import React, { useEffect, useState } from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';

const Summary1 = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลจาก API /payments
        fetch('http://localhost:8081/v1/payment/payments') // ตรวจสอบ URL ให้ตรงกับ API
            .then((response) => response.json())
            .then((data) => {
                if (data.payments) {
                    setPayments(data.payments);
                }
            })
            .catch((error) => console.error('Error fetching payments:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="date-section">
                <span>วันที่: 21 พฤศจิกายน 2567</span>
                <span className="calendar-icon">📅</span>
            </div>
            <div className="sales-container">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ที่</th>
                            <th>เลขที่บิล</th>
                            <th>จำนวน</th>
                            <th>ราคา</th>
                            <th>ส่วนลด</th>
                            <th>ยอดรวม</th>
                            <th>ชำระด้วย</th>
                            <th>เวลา</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>{payment.id}</td>
                                <td>{payment.productQuantity}</td>
                                <td>{payment.totalPrice}</td>
                                <td>{payment.discount}</td>
                                <td>{payment.priceToPay}</td>
                                <td>{payment.typePay}</td>
                                <td>{payment.time}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">รวม</td>
                            <td>
                                {payments.reduce((sum, payment) => sum + payment.productQuantity, 0)}
                            </td>
                            <td>
                                {payments.reduce((sum, payment) => sum + payment.totalPrice, 0)}
                            </td>
                            <td>
                                {payments.reduce((sum, payment) => sum + payment.discount, 0)}
                            </td>
                            <td>
                                {payments.reduce((sum, payment) => sum + payment.priceToPay, 0)}
                            </td>
                            <td colSpan="2"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Footbar />
        </div>
    );
};

export default Summary1;
