import React, { useState, useEffect } from 'react'; 
import '../css/Menu.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() { 
    const [products, setProducts] = useState([]); 
    // เก็บรายการสินค้าจาก API
    const [categories, setCategories] = useState([]); 
    // เก็บประเภทสินค้า   
    const [selectedType, setSelectedType] = useState(null); 
    // เก็บประเภทสินค้าที่ผู้ใช้เลือก
    const [cart, setCart] = useState([]); 
    // เก็บข้อมูลตะกร้าสินค้า
    const [discount, setDiscount] = useState('0'); 
    // เก็บส่วนลดในรูปแบบตัวเลข
    const [error, setError] = useState(''); 
    // แสดงข้อผิดพลาดเมื่อกรอกส่วนลดไม่ถูกต้อง  
    const Navigate = useNavigate(); 
    // เปลี่ยนหน้า

    useEffect(() => { 
        axios.get('http://localhost:8081/v1/product/get') 
            .then((response) => setProducts(response.data)) 
            // ดึงข้อมูลสินค้าจาก API แล้วเก็บใน state products
            .catch((error) => console.error('Error fetching products:', error)); 
            // แสดงข้อผิดพลาด
    }, []); 
    useEffect(() => { 
        axios.get('http://localhost:8081/v1/type/get') 
            .then((response) => setCategories(response.data)) 
            // ดึงข้อมูลประเภทสินค้าแล้วเก็บใน state categories
            .catch((error) => console.error('Error fetching type:', error)); 
    }, []); 
  

    const filteredProducts = selectedType 
        ? products.filter((product) => product.typeId === selectedType) 
        // กรองสินค้าตามประเภทที่เลือก
        : products; 
        // แสดงสินค้าทั้งหมดถ้าไม่ได้เลือกประเภท

    const handleProductClick = (product) => { 
        setCart((prevCart) => { 
            const existingProduct = prevCart.find((item) => item.code === product.code); 
            // ตรวจสอบว่าสินค้านี้มีอยู่ในตะกร้าแล้วหรือไม่
            
            return existingProduct 
                ? prevCart.map((item) => 
                    item.code === product.code 
                        ? { ...item, quantity: item.quantity + 1 } 
                        // มี + 1
                
                        : item
                )
                : [...prevCart, { ...product, quantity: 1 }]; 
                // ไม่มี = เพิ่มรายการใหม่
        });
    };

    const handleDiscountChange = (e) => { 
        const value = e.target.value; 
        // ดึงค่าจาก input   
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 100)) { 
            setDiscount(value === '' ? '' : value); 
            // อัปเดตส่วนลดถ้ากรอกค่าเป็นตัวเลขระหว่าง 0 ถึง 100
            setError(''); 
            // ล้างข้อความข้อผิดพลาด
        } else { 
            setError('กรุณากรอกส่วนลด'); 
            // แสดงข้อผิดพลาดเมื่อกรอกค่าไม่ถูกต้อง
        }
    };

    const calculateTotal = (product) => product.price * product.quantity; 
    // คำนวณราคาสินค้า(จำนวน x ราคา)
    const calculateGrandTotal = () => cart.reduce((total, product) => total + calculateTotal(product), 0); 
    // คำนวณยอดรวมของสินค้าทั้งหมดในตะกร้า

    const calculateDiscountedTotal = () => { 
        const total = calculateGrandTotal(); 
        const discountValue = parseFloat(discount || 0); 
        return total * (1 - discountValue / 100); 
        // คำนวณราคาหลังหักส่วนลด
    };

    const handleRemove = (code, cart, setCart) => { 
        const updatedCart = cart.map((product) => 
            product.code === code 
                ? { ...product, quantity: product.quantity - 1 } 
                // ลดจำนวนสินค้าในรายการที่ตรงกัน      
                : product
        ).filter((product) => product.quantity > 0); 
        // ลบสินค้าออกจากตะกร้าเมื่อจำนวนเหลือ 0
        setCart(updatedCart); 
        // อัปเดตตะกร้าสินค้า
    };

    return ( 
        <div> 
            <Navbar /> 
            {/* เพิ่มแถบเมนูด้านบน */}
            
            <div className='copyPages-con'> 
                <div className="copyPages"> 
                    {filteredProducts.map((product) => ( 
                        <div 
                            key={product.code} 
                            className="proCopyBox-increase" 
                            onClick={() => handleProductClick(product)} 
                            // คลิกเพิ่มสินค้าในตะกร้า
                            
                            style={{ 
                                backgroundImage: `url(${product.image || '/path/to/default/image.jpg'})` 
                            }}
                        >
                            <p>{product.name}</p> 
                        </div> 
                    ))} 
                </div> 
            </div> 
            {/* แสดงสินค้าตามประเภท */}
            <div className="copeTabbar"> 
                <div className="left-buttons"> 
                    <div 
                        className={`TypeCopyBox-increase ${!selectedType ? 'active' : ''}`} 
                        onClick={() => setSelectedType(null)} 
                        // ยกเลิกการกรองประเภทสินค้า
                    >
                        <span>ทั้งหมด</span> 
                    </div> 
                    {categories.map((category) => ( 
                        <div 
                            key={category.typeID} 
                            className={`TypeCopyBox-increase ${selectedType === category.typeID.toString() ? 'active' : ''}`} 
                            // เพิ่มคลาส active เมื่อประเภทที่เลือกตรงกับประเภทนี้
                            
                            onClick={() => setSelectedType(category.typeID.toString())} 
                            // คลิกแสดงสินค้าตามประเภท
                        >
                            <p>{category.type}</p> 
                        </div> 
                    ))} 
                </div> 
            </div> 
            {/* แสดงประเภทสินค้าเป็นแถบปุ่ม */}
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
                    {/* แสดงหัวตารางของตะกร้าสินค้า */}
                    
                    <div className="table-wrapper"> 
                        <table> 
                            <tbody> 
                                {cart.map((product) => ( 
                                    <tr className='table-wrapper-item' 
                                        key={product.code} 
                                        onMouseEnter={(e) => e.currentTarget.classList.add('hovered')} 
                                        // เพิ่มคลาส hovered เมื่อเมาส์ชี้ที่รายการ
                                        
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')} 
                                        // ลบคลาส hovered เมื่อเมาส์ออกจากรายการ
                                        
                                        onClick={() => handleRemove(product.code, cart, setCart)} 
                                        // คลิกเพื่อลดจำนวนสินค้าหรือเอาออก
                                    >
                                        <td>{product.name}</td> 
                                        <td>{new Intl.NumberFormat().format(product.price)}</td> 
                                        <td>{product.quantity}</td> 
                                        <td>{new Intl.NumberFormat().format(calculateTotal(product))}</td> 
                                        {/* แสดงข้อมูลสินค้าในแต่ละแถว */}
                                    </tr> 
                                ))} 
                            </tbody> 
                        </table> 
                    </div> 
                    {/* แสดงรายการสินค้าในตะกร้า */}
                </div> 
                
                <div className="summary-container"> 
                    <div className="titleOfsummary">สรุปยอด</div> 
                    <div className="summary"> 
                        <p>ราคา</p> 
                        <div className="price">{new Intl.NumberFormat().format(calculateGrandTotal())}</div> 
                        {/* แสดงยอดรวมก่อนหักส่วนลด */}
                        
                        <p>ส่วนลด</p> 
                        <input 
                            type="text" 
                            className="discount" 
                            placeholder="ส่วนลด %" 
                            value={discount} 
                            onChange={handleDiscountChange} 
                            // ช่องกรอกส่วนลด พร้อมตรวจสอบค่าที่กรอก
                        /> 
                        {error && <span className="error-message">{error}</span>} 
                        {/* แสดงข้อความข้อผิดพลาด */}
                        
                        <h2>ยอดชำระ</h2> 
                        <div className="Total"> 
                            {new Intl.NumberFormat().format(calculateDiscountedTotal())} 
                        </div> 
                        {/* แสดงยอดรวมหลังหักส่วนลด */}
                    </div> 
                    
                    <div className="buttons"> 
                        <button 
                            className="pay-btn" 
                            disabled={cart.length === 0} 
                            // ปิดการใช้งานปุ่มเมื่อไม่มีสินค้าในตะกร้า
                            
                            onClick={() => 
                                Navigate('/Payment', { 
                                    state: { 
                                        cart, 
                                        total: calculateGrandTotal(), 
                                        discount: discount, 
                                        discountedTotal: calculateDiscountedTotal(), 
                                        // ส่งข้อมูลที่จำเป็นไปยังหน้าชำระเงิน
                                    }, 
                                }) 
                            } 
                        > 
                            คิดเงิน 
                        </button> 
                        <button className="cancel-btn" onClick={() => setCart([])}> 
                            ยกเลิก 
                        </button> 
                        {/* ปุ่มสำหรับลบสินค้าทั้งหมดในตะกร้า */}
                    </div> 
                </div> 
            </div> 
            <Footbar /> 
            {/* เพิ่ม footer */}
        </div> 
    ); 
} 

export default App; 


