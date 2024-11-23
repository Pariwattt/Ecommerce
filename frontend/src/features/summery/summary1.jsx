import React, { useEffect, useState } from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';
import { useNavigate } from 'react-router-dom';

const Summary1 = () => {
    const Navigate = useNavigate();
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
            <div className="date-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Display selected or current date */}
                <span>{selectedDate ? formatDate(selectedDate) : formatDate(new Date())}</span>

                {/* Styled calendar icon with hidden date input */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split("T")[0]} // Disable future dates
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0, // Hide the date input
                            cursor: 'pointer',
                        }}
                    />
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2089/2089641.png" // Example icon URL
                        alt="Calendar Icon"
                        style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                    />
                </div>
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
            <div className="summary-section">
                <button className="summary-button">ยอดขายรายวัน</button>
                <button className="summary-button" onClick={() => Navigate('/summary3')}>ยอดขายรายเดือน</button>
                <button className="summary-button" onClick={() => Navigate('/summary4')}>ยอดขายสินค้า</button>
            </div>


            <Footbar />
        </div>
    );
};

export default Summary1;
