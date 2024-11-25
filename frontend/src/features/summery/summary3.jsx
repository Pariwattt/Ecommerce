import React, { useState, useEffect } from 'react'; 
import Navbar from '../webPageFeatures/navbar'; 
import Footbar from '../webPageFeatures/footbar'; 
import '../css/summary1.css'; 
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางระหว่างหน้า

const Summary3 = () => {
    const Navigate = useNavigate(); // ฟังก์ชันสำหรับนำทางไปยังหน้าอื่น
    const [payments, setPayments] = useState([]); //เก็บข้อมูลการชำระเงิน
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // สำหรับเก็บเดือนที่ผู้ใช้เลือก(ค่าเริ่มต้นคือเดือนปัจจุบัน)

    // ข้อมูลการชำระเงินเมื่อเดือนที่เลือก
    useEffect(() => {
        const fetchPayments = () => {
            // สำหรับดึงข้อมูลการชำระเงิน โดยมีเงื่อนไขตามเดือนที่เลือก
            const url = selectedMonth
                ? `http://localhost:8081/v1/payment/payments/monthly?date=${selectedMonth}`
                : 'http://localhost:8081/v1/payment/payments';

            // คำขอ API
            fetch(url)
                .then((response) => response.json()) // แปลงผลลัพธ์เป็น JSON
                .then((data) => {
                    if (data.payments && data.payments.length > 0) {
                        setPayments(data.payments); // บันทึกข้อมูลการชำระเงิน
                    } else {
                        setPayments([]); // ถ้าไม่มีข้อมูลให้ตั้งค่าเป็นว่าง
                    }
                })
                .catch((error) => {
                    console.error('Error fetching payments:', error); // แสดงข้อผิดพลาดใน console
                    setPayments([]); // ตั้งค่าเป็นว่างในกรณีเกิดข้อผิดพลาด
                });
        };

        fetchPayments(); // เรียกฟังก์ชัน fetchPayments
    }, [selectedMonth]); // ทำงานเมื่อ selectedMonth เปลี่ยนค่า

    // ฟังก์ชันการเปลี่ยนแปลงของเดือนที่เลือก
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    // ฟังก์ชันแปลงวันที่
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long' }; // ตั้งค่ารูปแบบวันที่
        return new Date(date).toLocaleDateString('th-TH', options); // แปลงรูปแบบไทย
    };

    // ฟังก์ชันคำนวณยอดขายรายวัน
    const calculateDailySummary = (payments) => {
        const dailySummary = {};

        payments.forEach((payment) => {
            const date = payment.date.split('T')[0]; // แยกวันที่จากเวลา

            if (!dailySummary[date]) {
                // ไม่มีข้อมูลของวันนั้น ให้เริ่มต้นค่าเริ่มต้น
                dailySummary[date] = {
                    productQuantity: 0,
                    totalPrice: 0,
                    discount: 0,
                    priceToPay: 0,
                };
            }

            // สะสมค่าจำนวนสินค้า, ราคารวม, ส่วนลด และยอดขายจริง
            dailySummary[date].productQuantity += payment.productQuantity;
            dailySummary[date].totalPrice += payment.totalPrice;
            dailySummary[date].discount += payment.discount;
            dailySummary[date].priceToPay += payment.priceToPay;
        });

        return dailySummary; // คืนค่าข้อมูลยอดขายรายวัน
    };

    const dailySummary = calculateDailySummary(payments); // ฟังก์ชันคำนวณยอดขายรายวัน

    return (
        <div>
            <Navbar /> 
            <div className="date-section deta-l">
                <span>{selectedMonth ? formatDate(selectedMonth) : formatDate(new Date())}</span> {/* แสดงเดือนที่เลือก */}
                <div className='butt'>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange} // อัปเดต selectedMonth เมื่อผู้ใช้เปลี่ยนค่า
                        max={new Date().toISOString().slice(0, 7)} // จำกัดให้เลือกได้ถึงเดือนปัจจุบัน
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
                            <th>ส่วนลด</th>
                            <th>ยอดขายจริง</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(dailySummary).length > 0 ? (
                            Object.keys(dailySummary).map((date, index) => (
                                <tr key={index}>
                                    <td>{date}</td> {/* วันที่ */}
                                    <td>{dailySummary[date].productQuantity}</td> 
                                    <td>{dailySummary[date].totalPrice.toFixed(2)}</td> 
                                    <td>{dailySummary[date].discount}%</td> 
                                    <td>{dailySummary[date].priceToPay.toFixed(2)}</td> 
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                    ไม่มีข้อมูลสำหรับเดือนที่เลือก
                                </td> {/* แสดงข้อความเมื่อไม่มีข้อมูล */}
                            </tr>
                        )}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="1">รวม</td> {/* สรุปยอดรวม */}
                            <td>{payments.reduce((sum, payment) => sum + payment.productQuantity, 0)}</td> 
                            <td>{payments.reduce((sum, payment) => sum + payment.totalPrice, 0).toFixed(2)}</td> 
                            <td></td>
                            <td>{payments.reduce((sum, payment) => sum + payment.priceToPay, 0).toFixed(2)}</td> 
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="summenu">
                <p className="ax">สรุปยอดขาย</p>
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