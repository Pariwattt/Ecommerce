import React, { useEffect, useState } from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';

const Summary1 = () => {
    const [payments, setPayments] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

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

    // ฟังก์ชันในการแสดงวันที่ในรูปแบบที่ต้องการ
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('th-TH', options);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="date-section">
                {/* แสดงวันที่ปัจจุบัน */}
                <span> {selectedDate ? formatDate(selectedDate) : formatDate(new Date())}</span>
                {/* เพิ่มช่องเลือกวันที่ */}
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={new Date().toISOString().split("T")[0]}  // ไม่ให้เลือกวันที่ในอนาคต
                />
            </div>
            <div className="sales-container  frame">
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
