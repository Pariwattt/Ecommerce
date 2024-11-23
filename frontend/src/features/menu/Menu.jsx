import React, { useState, useEffect } from 'react';
import '../css/Menu.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [cart, setCart] = useState([]);
    const [discount, setDiscount] = useState('0');
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/v1/product/get')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8081/v1/type/get')
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching type:', error));
    }, []);

    const filteredProducts = selectedType
        ? products.filter((product) => product.typeId === selectedType)
        : products;

    const handleProductClick = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.code === product.code);
            return existingProduct
                ? prevCart.map((item) =>
                    item.code === product.code
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const handleDiscountChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 100)) {
            setDiscount(value === '' ? '0' : value);
            setError('');
        } else {
            setError('กรุณากรอกส่วนลด');
        }
    };

    const calculateTotal = (product) => product.price * product.quantity;
    const calculateGrandTotal = () => cart.reduce((total, product) => total + calculateTotal(product), 0);
    const calculateDiscountedTotal = () => {
        const total = calculateGrandTotal();
        const discountValue = parseFloat(discount || 0);
        return total * (1 - discountValue / 100);
    };


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
                                    <th>รายการ</th>
                                    <th>ราคา</th>
                                    <th>จำนวน</th>
                                    <th>รวม</th>
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
                        <div className="price">{new Intl.NumberFormat().format(calculateGrandTotal())}</div>
                        <p>ส่วนลด</p>
                        <input
                            type="text"
                            className="discount"
                            placeholder="ส่วนลด %"
                            value={discount}
                            onChange={handleDiscountChange}
                        />
                        {error && <span className="error-message">{error}</span>}
                        <h2>ยอดชำระ</h2>
                        <div className="Total">
                            {new Intl.NumberFormat().format(calculateDiscountedTotal())}
                        </div>
                    </div>
                    <div className="buttons">
                        <button
                            className="pay-btn"
                            disabled={cart.length === 0}
                            onClick={() =>
                                Navigate('/Payment', {
                                    state: {
                                        cart,
                                        total: calculateGrandTotal(),
                                        discount: discount, // ส่งข้อมูลส่วนลดไปด้วย
                                        discountedTotal: calculateDiscountedTotal(),
                                    },
                                })
                            }
                        >
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
