import React, { useEffect, useState } from 'react';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import '../css/summary1.css';
import { useNavigate } from 'react-router-dom';

const Summary1 = () => {
    const Navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]); // เปลี่ยนเป็น array แทน string

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
    }, [selectedDate]);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('th-TH', options);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // ฟังก์ชันเปิดป๊อปอัพและแสดงรายละเอียดสินค้า
    const openModal = (paymentId, time) => {
        fetch(`http://localhost:8081/v1/payment/saleDetails?paymentId=${paymentId}&time=${time}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.saleDetails && Array.isArray(data.saleDetails)) {
                    setModalContent(data.saleDetails); // ตั้งค่าเป็น array
                } else {
                    setModalContent('ไม่มีข้อมูลรายละเอียดสินค้า');
                }
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
                setModalContent('เกิดข้อผิดพลาดในการดึงข้อมูล');
                setIsModalOpen(true);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent([]);
    };

    return (
        <div>
            <Navbar />
            <div className="date-section deta-l">
                <span>{selectedDate ? formatDate(selectedDate) : formatDate(new Date())}</span>
                <div className="butt">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split("T")[0]}
                        className="datt"
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
                                                <th>ประเภท</th>
                                                <th>จำนวน</th>
                                                <th>ราคา</th>
                                                <th>ราคารวม</th> {/* เพิ่มคอลัมน์ราคารวม */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modalContent.map((detail, index) => (
                                                <tr key={index}>
                                                    <td>{detail.code}</td>
                                                    <td>{detail.name}</td>
                                                    <td>{detail.type}</td> {/* ดึงชื่อประเภทจาก `type` */}
                                                    <td>{detail.quantity}</td>
                                                    <td>{detail.price.toFixed(2)}</td>
                                                    <td>{(detail.quantity * detail.price).toFixed(2)}</td> {/* คำนวณราคารวม */}
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
