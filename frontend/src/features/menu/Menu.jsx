import React, { useState, useEffect } from 'react';
import '../css/Menu.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function App() {
    const [products, setProducts] = useState([]); // ข้อมูลสินค้าทั้งหมด
    const [categories, setCategories] = useState([]); // ข้อมูลประเภทสินค้า
    const [selectedType, setSelectedType] = useState(null); // ประเภทสินค้าที่เลือก
    const [cart, setCart] = useState([]); // รายการสินค้าในตาราง
    const [payments, setPayments] = useState([]); // ข้อมูลการชำระเงินทั้งหมด
    const Navigate = useNavigate();
    const [discount, setDiscount] = useState(''); // เก็บค่าที่ใส่ในช่องส่วนลด
    const [error, setError] = useState(''); // เก็บข้อความแสดงข้อผิดพลาด

    // ดึงข้อมูลสินค้า
    useEffect(() => {
        axios.get('http://localhost:8081/v1/product/get')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // ดึงข้อมูลประเภทสินค้า
    useEffect(() => {
        axios.get('http://localhost:8081/v1/type/get')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching type:', error);
            });
    }, []);
    // ดึงข้อมูลการชำระเงินทั้งหมด
    useEffect(() => {
        axios.get('http://localhost:8081/v1/payment/payments')
            .then((response) => {
                setPayments(response.data.payments);
            })
            .catch((error) => {
                console.error('Error fetching payments:', error);
            });
    }, []);

    // ฟิลเตอร์สินค้าโดยประเภท
    const filteredProducts = selectedType
        ? products.filter((product) => product.typeId === selectedType)
        : products;

    // เพิ่มสินค้าในตาราง
    const handleProductClick = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.code === product.code);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าในช่องส่วนลด
    const handleDiscountChange = (e) => {
        const value = e.target.value;

        // ตรวจสอบว่าค่าเป็นตัวเลข และอยู่ในช่วง 0-100
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 100)) {
            setDiscount(value); // อัปเดตค่า
            setError(''); // ล้างข้อความข้อผิดพลาด
        } else {
            setError('กรุณากรอกส่วนลด');
        }
    };

    // คำนวณยอดรวมของแต่ละสินค้า
    const calculateTotal = (product) => product.price * product.quantity;

    // คำนวณยอดรวมทั้งหมด
    const calculateGrandTotal = () =>
        cart.reduce((total, product) => total + calculateTotal(product), 0);

    return (

        <div>
            <Navbar />
            <div className="copyPages">
                {filteredProducts.map((product) => (
                    <div
                        key={product.code}
                        className="proCopyBox-increase"
                        onClick={() => handleProductClick(product)}
                    >
                        <p>{product.name}</p>
                    </div>
                ))}
            </div>
            <div className="copeTabbar">
                <div className="left-buttons">
                    <div
                        className={`TypeCopyBox-increase ${!selectedType ? 'active' : ''}`}
                        onClick={() => setSelectedType(null)}
                    >
                        <span>ทั้งหมด</span>
                    </div>
                    {categories.map((category) => (
                        <div
                            key={category.typeID}
                            className={`TypeCopyBox-increase ${selectedType === category.typeID.toString() ? 'active' : ''}`}
                            onClick={() => setSelectedType(category.typeID.toString())}
                        >
                            <p>{category.type}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-Menu">
                <div className="left-container">
                    <div className="header-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th >รายการ</th>
                                    <th >ราคา</th>
                                    <th >จำนวน</th>
                                    <th >รวม</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <tbody>
                                {cart.map((product) => (
                                    <tr key={product.code}>
                                        <td>{product.name}</td>
                                        <td>{new Intl.NumberFormat().format(product.price)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{new Intl.NumberFormat().format(calculateTotal(product))}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="summary-container">
                    <div className="titleOfsummary">สรุปยอด</div>
                    <div className="summary">
                        <p>ราคา</p>
                        <div className="price">
                            {new Intl.NumberFormat().format(calculateGrandTotal())}
                        </div>
                        <p>ส่วนลด</p>
                        <input
                            type="text"
                            className="discount"
                            placeholder="ส่วนลด %"
                            value={discount}
                            onChange={handleDiscountChange}
                        />
                        {error && <span className="error-message">{error}</span>} {/* แสดงข้อความข้อผิดพลาด */}
                        <h2>ยอดชำระ</h2>
                        <div className="Total">
                            {/* คำนวณยอดชำระหลังหักส่วนลด */}
                            {new Intl.NumberFormat().format(
                                calculateGrandTotal() * (1 - discount / 100)
                            )}
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="pay-btn" disabled={cart.length === 0} onClick={() => Navigate('/Payment')}>
                            คิดเงิน
                        </button>
                        <button className="cancel-btn" onClick={() => setCart([])}>
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </div>
            <Footbar />
        </div>

    );
}

export default App;
