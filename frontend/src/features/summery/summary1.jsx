import React, { useEffect, useState } from 'react';
import Navbar from '../webPageFeatures/navbar'; 
import Footbar from '../webPageFeatures/footbar'; 
import '../css/summary1.css'; 
import { useNavigate } from 'react-router-dom'; 

const Summary1 = () => {
    const Navigate = useNavigate(); 
    const [payments, setPayments] = useState([]); // เก็บข้อมูลการชำระเงิน
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // วันที่เลือก
    const [isModalOpen, setIsModalOpen] = useState(false); // สถานะป๊อปอัพ
    const [modalContent, setModalContent] = useState([]); // รายละเอียดสินค้าในป๊อปอัพ

    useEffect(() => {
        const fetchPayments = () => {
            const url = selectedDate
                ? `http://localhost:8081/v1/payment/payments?date=${selectedDate}`
                : 'http://localhost:8081/v1/payment/payments'; // API สำหรับดึงข้อมูลการชำระเงิน
    
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.payments && data.payments.length > 0) {
                        setPayments(data.payments); // ตั้งค่า payments เมื่อมีข้อมูล
                    } else {
                        setPayments([]); // รีเซต payments เป็น array ว่าง
                    }
                })
                .catch((error) => {
                    console.error('Error fetching payments:', error); // แสดงข้อผิดพลาด
                    setPayments([]); // รีเซต payments เป็น array ว่าง
                });
        };
    
        fetchPayments(); // เรียกฟังก์ชันดึงข้อมูล
    }, [selectedDate]); // ทำงานใหม่ทุกครั้งเมื่อ selectedDate เปลี่ยน

    // ฟังก์ชันจัดรูปแบบวันที่
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('th-TH', options); // แปลงวันที่เป็นรูปแบบภาษาไทย
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // เปลี่ยนค่า selectedDate
    };

    // ฟังก์ชันเปิดป๊อปอัพและแสดงรายละเอียดสินค้า
    const openModal = (paymentId, time) => {
        fetch(`http://localhost:8081/v1/payment/saleDetails?paymentId=${paymentId}&time=${time}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.saleDetails && Array.isArray(data.saleDetails)) {
                    setModalContent(data.saleDetails); // ตั้งค่า modalContent เป็น array
                } else {
                    setModalContent('ไม่มีข้อมูลรายละเอียดสินค้า'); // แสดงข้อความกรณีไม่มีข้อมูล
                }
                setIsModalOpen(true); // เปิดป๊อปอัพ
            })
            .catch((error) => {
                console.error('Error fetching product details:', error); // แสดงข้อผิดพลาด
                setModalContent('เกิดข้อผิดพลาดในการดึงข้อมูล'); // แสดงข้อความข้อผิดพลาด
                setIsModalOpen(true);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false); // ปิดป๊อปอัพ
        setModalContent([]); // ล้างข้อมูลใน modalContent
    };
    return (
        <div>
            <Navbar /> {/* Navbar ด้านบน */}
            <div className="date-section deta-l">
                <span>{selectedDate ? formatDate(selectedDate) : formatDate(new Date())}</span>
                <div className="butt">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split("T")[0]} // ไม่สามารถเลือกวันที่ในอนาคตได้
                        className="datt"
                    />
                    <img
                        className="imgg"
                        src="/img/PT.png"
                        alt="Calendar Icon"
                    />
                </div>
            </div>

            {/* ตารางสรุปการขาย */}
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
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment.id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.id}</td>
                                    <td>{payment.productQuantity}</td>
                                    <td>{(parseFloat(payment.totalPrice) || 0).toFixed(2)}</td>
                                    <td>{(parseFloat(payment.discount) || 0)}%</td>
                                    <td>{(parseFloat(payment.priceToPay) || 0).toFixed(2)}</td>
                                    <td>{payment.typePay}</td>
                                    <td>{payment.time}</td>
                                    <td>
                                        <button className="details-button" onClick={() => openModal(payment.id, payment.time)}>
                                            รายละเอียด
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>
                                    ไม่มีข้อมูลสำหรับวันที่เลือก
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {/* ส่วนสรุปยอดรวม */}
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

            {/* ป๊อปอัพสำหรับแสดงรายละเอียดสินค้า */}
            {isModalOpen && (
                <div className="mo">
                    <div className="mo-content">
                        <span className="close-btn" onClick={closeModal}>ปิด</span>
                        <div className="mo-body">
                            <h3>รายละเอียดสินค้า</h3>
                            {Array.isArray(modalContent) ? (
                                modalContent.length > 0 ? (
                                    <table className="modal-table">
                                        <thead>
                                            <tr>
                                                <th>รหัสสินค้า</th>
                                                <th>ชื่อสินค้า</th>
                                                <th>จำนวน</th>
                                                <th>ราคา</th>
                                                <th>ราคารวม</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modalContent.map((detail, index) => (
                                                <tr key={index}>
                                                    <td>{detail.code}</td>
                                                    <td>{detail.name}</td>
                                                    <td>{detail.quantity}</td>
                                                    <td>{detail.price.toFixed(2)}</td>
                                                    <td>{(detail.quantity * detail.price).toFixed(2)}</td> {/* ราคารวม */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>ไม่มีข้อมูลรายละเอียดสินค้า</p>
                                )
                            ) : (
                                <p>{modalContent}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="summenu">
                <p className="ax">สรุปยอดขายรายวัน</p>
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
