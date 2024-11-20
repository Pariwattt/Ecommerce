import React, { useState, useEffect } from 'react';
import '../css/Menu.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import LockZoom from '../webPageFeatures/LockZoom';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]); // ข้อมูลสินค้าทั้งหมด
    const [categories, setCategories] = useState([]); // ข้อมูลประเภทสินค้า
    const [selectedType, setSelectedType] = useState(null); // ประเภทสินค้าที่เลือก
    const [cart, setCart] = useState([]); // รายการสินค้าในตาราง

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

    // ฟิลเตอร์สินค้าโดยประเภท
    const filteredProducts = selectedType
        ? products.filter((product) => product.typeId === selectedType)
        : products;

    // เพิ่มสินค้าในตาราง
    const handleProductClick = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.code === product.code);
            if (existingProduct) {
                // ถ้าสินค้าถูกเลือกซ้ำ ให้เพิ่มจำนวน
                return prevCart.map((item) =>
                    item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // ถ้าเป็นสินค้าใหม่ เพิ่มเข้าไปในตาราง
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // คำนวณยอดรวมของแต่ละสินค้า
    const calculateTotal = (product) => product.price * product.quantity;

    // คำนวณยอดรวมทั้งหมด
    const calculateGrandTotal = () =>
        cart.reduce((total, product) => total + calculateTotal(product), 0);

    return (
        <LockZoom>
            <div>
                <Navbar />
                <div className="copyPages">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.code}
                            className="proCopyBox-increase"
                            onClick={() => handleProductClick(product)} // เมื่อกดสินค้าจะเพิ่มในตาราง
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
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>รายการ</th>
                                        <th>ราคา</th>
                                        <th>จำนวน</th>
                                        <th>รวม</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* แสดงรายการสินค้าที่อยู่ในตาราง */}
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
                        <div className="menu-grid"></div>
                    </div>
                    <div className="summary-container">
                        <div className="titleOfsummary">สรุปยอด</div>
                        <div className="summary">
                            <p>ราคา</p>
                            <div className="price">
                                {new Intl.NumberFormat().format(calculateGrandTotal())}
                            </div>
                            <p>ส่วนลด</p>
                            <input type="text" className="discount" placeholder="ส่วนลด %" />
                            <h2>ยอดชำระ</h2>
                            <div className="Total">
                                {new Intl.NumberFormat().format(calculateGrandTotal())}
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="pay-btn" disabled={cart.length === 0}>
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
        </LockZoom>
    );
}

export default App;
