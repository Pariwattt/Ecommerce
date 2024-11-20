import React, { useState, useEffect } from 'react';
import '../css/Menu.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import LockZoom from '../webPageFeatures/LockZoom';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]); // เก็บข้อมูลสินค้าทั้งหมด
    const [categories, setCategories] = useState([]); // เก็บข้อมูลประเภทสินค้า
    const [selectedType, setSelectedType] = useState(null); // เก็บประเภทที่เลือก (null หมายถึงแสดงทั้งหมด)

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

    // ฟิลเตอร์สินค้า
    const filteredProducts = selectedType
        ? products.filter((product) => product.typeId === selectedType) // ไม่ต้องแปลงเป็น Number
        : products; // แสดงสินค้าทั้งหมด


    return (
        <LockZoom>
            <div>
                <Navbar />
                <div className='copyPages'>
                    {filteredProducts.map((product) => (
                        <div key={product.code} className="proCopyBox-increase">
                            <p>{product.name}</p>
                        </div>
                    ))}
                </div>
                <div className='copeTabbar'>
                    <div className='left-buttons'>
                        {/* ปุ่ม "ทั้งหมด" */}
                        <div
                            className={`TypeCopyBox-increase ${!selectedType ? 'active' : ''}`} // ใช้ active เพื่อเน้นปุ่ม
                            onClick={() => setSelectedType(null)} // เคลียร์การเลือกประเภท
                        >
                            <span>ทั้งหมด</span>
                        </div>
                        {/* ปุ่มประเภทสินค้า */}
                        {categories.map((category) => (
                            <div
                                key={category.typeID}
                                className={`TypeCopyBox-increase  ${selectedType === category.typeID.toString() ? 'active' : ''}`} // เปรียบเทียบ string
                                onClick={() => setSelectedType(category.typeID.toString())} // ตั้งค่า selectedType เป็น String
                            >
                                <p>{category.type}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container-Menu">
                    {/* ตารางแสดงรายการสินค้า */}
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
                                    {filteredProducts.map((product) => (
                                        <tr key={product.code}>
                                            <td>{product.name}</td>
                                            <td>{new Intl.NumberFormat().format(product.price)}</td>
                                            <td>1</td> {/* สมมุติว่าเป็นจำนวน 1 */}
                                            <td>{new Intl.NumberFormat().format(product.price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="menu-grid"></div>
                    </div>
                    <div className="summary-container">
                        <div className='titleOfsummary'>สรุปยอด</div>
                        <div className="summary">
                            <p>ราคา</p>
                            <div className='price'>
                                {new Intl.NumberFormat().format(filteredProducts.reduce((total, product) => total + product.price, 0))}
                            </div>
                            <p>ส่วนลด</p>
                            <input type="text" className='discount' placeholder="ส่วนลด %" />
                            <h2>ยอดชำระ</h2>
                            <div className='Total'>....</div>
                        </div>
                        <div className="buttons">
                            <button className="pay-btn">คิดเงิน</button>
                            <button className="cancel-btn">ยกเลิก</button>
                        </div>
                    </div>
                </div>
                <Footbar />
            </div>
        </LockZoom>
    );
}

export default App;
