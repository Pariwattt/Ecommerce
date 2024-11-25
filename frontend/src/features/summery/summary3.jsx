import React, { useState, useEffect } from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';
import { useNavigate } from 'react-router-dom';

const Summary3 = () => {
    const Navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    // Fetch data when month changes
    useEffect(() => {
        const fetchPayments = () => {
            const url = selectedMonth
                ? `http://localhost:8081/v1/payment/payments/monthly?date=${selectedMonth}`
                : 'http://localhost:8081/v1/payment/payments';

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.payments && data.payments.length > 0) {
                        setPayments(data.payments);
                    } else {
                        setPayments([]); // รีเซต payments เป็น array ว่าง
                    }
                })
                .catch((error) => {
                    console.error('Error fetching payments:', error);
                    setPayments([]); // รีเซต payments เป็น array ว่างในกรณีเกิดข้อผิดพลาด
                });
        };

        fetchPayments();
    }, [selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString('th-TH', options);
    };

    // คำนวณยอดขายของแต่ละวัน
    const calculateDailySummary = (payments) => {
        const dailySummary = {};

        payments.forEach((payment) => {
            const date = payment.date.split('T')[0]; // แยกวันที่จากเวลา

            if (!dailySummary[date]) {
                dailySummary[date] = {
                    productQuantity: 0,
                    totalPrice: 0,
                    discount: 0,
                    priceToPay: 0,
                };
            }

            // สะสมจำนวนสินค้าทั้งหมด, ราคารวม, ส่วนลด, และยอดขายจริง
            dailySummary[date].productQuantity += payment.productQuantity;
            dailySummary[date].totalPrice += payment.totalPrice;
            dailySummary[date].discount += payment.discount;
            dailySummary[date].priceToPay += payment.priceToPay;
        });

        return dailySummary;
    };

    const dailySummary = calculateDailySummary(payments);

    return (
        <div>
            <Navbar />
            <div className="date-section deta-l">
                <span>{selectedMonth ? formatDate(selectedMonth) : formatDate(new Date())}</span>
                <div className='butt'>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        max={new Date().toISOString().slice(0, 7)}
                        className='datt'
                    />
                    <img
                        className="imgg"
                        src="/img/PT.png"
                        alt="Calendar Icon"
                    />
                </div>
            </div>
            <div className="sales-container frame">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>วันที่</th>
                            <th>จำนวนสินค้า</th>
                            <th>ราคา</th>
                            
                            <th>ยอดขายจริง</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(dailySummary).length > 0 ? (
                            Object.keys(dailySummary).map((date, index) => (
                                <tr key={index}>
                                    <td>{date}</td>
                                    <td>{dailySummary[date].productQuantity}</td>
                                    <td>{dailySummary[date].totalPrice.toFixed(2)}</td>
                                   
                                    <td>{dailySummary[date].priceToPay.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                    ไม่มีข้อมูลสำหรับเดือนที่เลือก
                                </td>
                            </tr>
                        )}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="1">รวม</td>
                            <td>{payments.reduce((sum, payment) => sum + payment.productQuantity, 0)}</td>
                            <td>{payments.reduce((sum, payment) => sum + payment.totalPrice, 0).toFixed(2)}</td>
                            <td>{payments.reduce((sum, payment) => sum + payment.priceToPay, 0).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="summenu">
                <p className="ax">สรุปยอดขายรายเดือน</p>
                <div className="summary-section">
                    <button className="summary-button" onClick={() => Navigate('/summary1')}>ยอดขายรายวัน</button>
                    <button className="summary-button">ยอดขายรายเดือน</button>
                    <button className="summary-button" onClick={() => Navigate('/summary4')}>ยอดขายสินค้า</button>
                </div>
            </div>
            <Footbar />
        </div>
    );
};

export default Summary3;