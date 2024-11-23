import React, { useEffect, useState } from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';
import { useNavigate } from 'react-router-dom';

const Summary1 = () => {
    const Navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // ค่าเริ่มต้นเป็นวันที่ปัจจุบัน

    useEffect(() => {
        const fetchPayments = () => {
            const url = selectedDate
                ? `http://localhost:8081/v1/payment/payments?date=${selectedDate}`
                : 'http://localhost:8081/v1/payment/payments';

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.payments) {
                        setPayments(data.payments);
                    }
                })
                .catch((error) => console.error('Error fetching payments:', error));
        };

        fetchPayments();
    }, [selectedDate]); // เมื่อ selectedDate เปลี่ยนจะดึงข้อมูลใหม่

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
            <div className="date-section deta-l">
                <span>{selectedDate ? formatDate(selectedDate) : formatDate(new Date())}</span>
                <div className='butt'>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split("T")[0]}
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
                            <th>ที่</th>
                            <th>เลขที่บิล</th>
                            <th>จำนวน</th>
                            <th>ราคา</th>
                            <th>ส่วนลด</th>
                            <th>ยอดรวม</th>
                            <th>ชำระด้วย</th>
                            <th>เวลา</th>
                            <th>รายละเอียดสินค้า</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>{payment.id}</td>
                                <td>{payment.productQuantity}</td>
                                <td>{(parseFloat(payment.totalPrice) || 0).toFixed(2)}</td>
                                <td>{(parseFloat(payment.discount)|| 0)}%</td> {/* แสดงส่วนลดในรูปแบบเปอร์เซ็นต์ */}
                                <td>{(parseFloat(payment.priceToPay) || 0).toFixed(2)}</td>
                                <td>{payment.typePay}</td>
                                <td>{payment.time}</td>
                                <td>{payment.productDetails || 'ไม่มีข้อมูล'}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">รวม</td>
                            <td>{payments.reduce((sum, payment) => sum + payment.productQuantity, 0)}</td>
                            <td>{(payments.reduce((sum, payment) => sum + payment.totalPrice, 0) || 0).toFixed(2)}</td>
                            <td></td>
                            <td>{(payments.reduce((sum, payment) => sum + payment.priceToPay, 0) || 0).toFixed(2)}</td>
                            <td colSpan="2"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="summenu">
                <p className="ax">สรุปยอดขาย</p>
                <div className="summary-section">
                    <button className="summary-button">ยอดขายรายวัน</button>
                    <button className="summary-button" onClick={() => Navigate('/summary3')}>ยอดขายรายเดือน</button>
                    <button className="summary-button" onClick={() => Navigate('/summary4')}>ยอดขายสินค้า</button>
                </div>
            </div>
            <Footbar />
        </div>
    );
};

export default Summary1;
