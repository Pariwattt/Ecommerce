import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/edit.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import Tabbar from './tabbar';
import { FaPlus } from 'react-icons/fa';

function App() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]); // เก็บรายการสินค้าทั้งหมด
    const [filteredProducts, setFilteredProducts] = useState([]); // เก็บสินค้าหลังจากการกรอง
    const [categories, setCategories] = useState([]); // เก็บประเภทสินค้า
    const [selectedCategory, setSelectedCategory] = useState(''); // ประเภทที่เลือกสำหรับการกรอง
    const [showFields, setShowFields] = useState(false); // ใช้แสดงหรือซ่อนฟอร์ม
    const [editingProductCode, setEditingProductCode] = useState(null); // เก็บรหัสสินค้าที่กำลังแก้ไข
    const [isEditing, setIsEditing] = useState(false); // บ่งบอกสถานะว่าอยู่ในโหมดแก้ไขหรือไม่

    useEffect(() => {
        // ใช้ useEffect สำหรับเรียกข้อมูลจาก API เมื่อ component โหลดครั้งแรก

        const fetchProducts = async () => {
            // ฟังก์ชันสำหรับดึงข้อมูลสินค้าจาก API
            try {
                const response = await axios.get("http://localhost:8081/v1/product/get");
                setProducts(response.data); // ตั้งค่า products ด้วยข้อมูลที่ได้จาก API
                setFilteredProducts(response.data); // ตั้งค่า filteredProducts ให้แสดงสินค้าทั้งหมด
            } catch (error) {
                console.error("Error fetching products:", error); // แสดงข้อผิดพลาดใน console
            }
        };

        const fetchCategories = async () => {
            // ฟังก์ชันสำหรับดึงประเภทสินค้าจาก API
            try {
                const response = await axios.get("http://localhost:8081/v1/type/get");
                setCategories(response.data); // ตั้งค่า categories ด้วยข้อมูลที่ได้จาก API
            } catch (error) {
                console.error("Error fetching categories:", error); // แสดงข้อผิดพลาดใน console
            }
        };

        fetchProducts(); // เรียกฟังก์ชันเพื่อดึงข้อมูลสินค้า
        fetchCategories(); // เรียกฟังก์ชันเพื่อดึงข้อมูลประเภทสินค้า
    }, []); // useEffect จะทำงานครั้งเดียวเมื่อ component ถูก mount

    const handleCategorySelect = (category) => {
        // ฟังก์ชันที่ทำงานเมื่อผู้ใช้เลือกประเภทสินค้า
        setSelectedCategory(category); // ตั้งค่าประเภทสินค้าที่เลือก
        if (category === "") {
            // ถ้าผู้ใช้เลือก "ทั้งหมด"
            setFilteredProducts(products); // แสดงสินค้าทั้งหมด
        } else {
            const filtered = products.filter((product) => product.type?.type === category);
            // กรองสินค้าตามประเภทที่เลือก
            setFilteredProducts(filtered); // ตั้งค่า filteredProducts ด้วยสินค้าที่ถูกกรอง
        }
    };

    const handleShowFields = (productCode) => {
        // ฟังก์ชันที่ทำงานเมื่อคลิกเพิ่มหรือแก้ไขสินค้า
        const product = products.find((product) => product.code === productCode); // หาสินค้าจากรหัสสินค้า
        if (product) {
            // ถ้าสินค้ามีอยู่แล้ว (เข้าสู่โหมดแก้ไข)
            setProductName(product.name);
            setProductPrice(product.price);
            setProductCode(product.code);
            setProductCategory(product.type?.type || ""); // ตั้งค่าประเภทสินค้า
            setImage(product.image);
            setEditingProductCode(productCode);
            setIsEditing(true); // ตั้งค่าเป็นโหมดแก้ไข
            setShowFields(true); // แสดงฟอร์ม
        } else {
            // ถ้าเป็นการเพิ่มสินค้าใหม่
            resetForm(); // รีเซ็ตฟอร์ม
            setIsEditing(false); // ตั้งค่าเป็นโหมดเพิ่มสินค้าใหม่
            setShowFields(true); // แสดงฟอร์ม
        }
    };

    const handleImageChange = (e) => {
        // ฟังก์ชันที่ทำงานเมื่อผู้ใช้อัปโหลดรูปภาพ
        const file = e.target.files[0]; // ดึงไฟล์แรกจาก input
        if (file) {
            const reader = new FileReader(); // ใช้ FileReader เพื่อแปลงไฟล์เป็น base64
            reader.onloadend = () => {
                setImage(reader.result); // ตั้งค่า image ด้วยผลลัพธ์ที่อ่านได้
            };
            reader.readAsDataURL(file); // อ่านไฟล์เป็น base64
        }
    };

    const handlePriceChange = (e) => {
        // ฟังก์ชันที่ตรวจสอบและอัปเดตราคา
        let value = e.target.value; // ดึงค่าจาก input
        value = value.replace(/,/g, ""); // ลบเครื่องหมายคอมม่าออก
        if (/^\d*\.?\d*$/.test(value)) {
            // ถ้าเป็นตัวเลขหรือทศนิยมที่ถูกต้อง
            setProductPrice(value); // ตั้งค่าราคา
        }
    };

    const handleBlurPrice = () => {
        // ฟังก์ชันที่แปลงราคาให้มีเครื่องหมายคั่นพันเมื่อออกจาก input
        const formattedValue = new Intl.NumberFormat().format(productPrice); 
        setProductPrice(formattedValue); // ตั้งค่าราคาใหม่
    };
    const handleConfirm = async () => {
        // ฟังก์ชันที่ทำงานเมื่อคลิกปุ่ม Confirm เพื่อเพิ่มหรือแก้ไขสินค้า
        const newProduct = {
            name: productName,
            price: parseFloat(productPrice) || 0, // แปลงราคาจาก string เป็น number หรือใช้ค่า 0 ถ้าว่าง
            code: productCode,
            type: productCategory, 
            image, 
        };

        try {
            if (editingProductCode) {
                // ถ้าอยู่ในโหมดแก้ไขสินค้า
                await axios.put(`http://localhost:8081/v1/product/edit/${editingProductCode}`, newProduct);
                // ส่งคำร้อง PUT ไปยัง API เพื่อแก้ไขสินค้า
                alert("แก้ไขสินค้าสำเร็จ"); // แจ้งเตือนเมื่อแก้ไขสำเร็จ
            } else {
                // ถ้าเป็นการเพิ่มสินค้าใหม่
                await axios.post("http://localhost:8081/v1/product/add", newProduct);
                // ส่งคำร้อง POST ไปยัง API เพื่อเพิ่มสินค้าใหม่
                alert("เพิ่มสินค้าสำเร็จ"); // แจ้งเตือนเมื่อเพิ่มสำเร็จ
            }

            const response = await axios.get("http://localhost:8081/v1/product/get");
            // ดึงรายการสินค้าใหม่จาก API
            setProducts(response.data); // ตั้งค่า products ใหม่
            setFilteredProducts(
                selectedCategory
                    ? response.data.filter(product => product.type === selectedCategory)
                    : response.data
            ); // อัปเดต filteredProducts ตามประเภทสินค้าที่เลือก
        } catch (error) {
            console.error("Error saving product:", error); // แสดงข้อผิดพลาด
            alert("Error saving product"); // แจ้งเตือนข้อผิดพลาด
        }

        resetForm(); // รีเซ็ตหลังจากบันทึกข้อมูล
    };

    const handleDeleteProduct = async () => {
        // ฟังก์ชันที่ทำงานเมื่อคลิกปุ่ม Delete
        try {
            await axios.delete(`http://localhost:8081/v1/product/delete/${editingProductCode}`);
            // ส่งคำร้อง DELETE ไปยัง API เพื่อลบสินค้า
            alert("ลบสินค้าสำเร็จ"); // แจ้งเตือนเมื่อสำเร็จ

            const response = await axios.get("http://localhost:8081/v1/product/get");
            // ดึงรายการสินค้าใหม่จาก API
            setProducts(response.data); // ตั้งค่า products ใหม่
            setFilteredProducts(
                selectedCategory
                    ? response.data.filter(product => product.type === selectedCategory)
                    : response.data
            ); // อัปเดต filteredProducts ตามประเภทสินค้าที่เลือก
        } catch (error) {
            console.error("Error deleting product:", error); // แสดงข้อผิดพลาด
            alert("Error deleting product"); // ข้อผิดพลาด
        }

        resetForm(); // รีเซ็ตฟอร์มหลังจากลบสินค้า
    };

    const resetForm = () => {
        // ฟังก์ชันสำหรับรีเซ็ต
        setProductName('');
        setProductPrice('');
        setProductCode('');
        setProductCategory('');
        setImage(null); // รีเซ็ตรูปภาพ
        setShowFields(false); // ซ่อนฟอร์ม
        setEditingProductCode(null); // ล้างค่ารหัสสินค้าที่กำลังแก้ไข
        setIsEditing(false); // รีเซ็ตโหมดการแก้ไข
    };

    return (
        <div>
            <Navbar /> 
            <Footbar /> 
            <Tabbar onCategorySelect={handleCategorySelect} /> 
            {/* แสดง Tabbar พร้อมส่งฟังก์ชัน handleCategorySelect เป็น props */}

            <div className="product-list-con">
                {/* ส่วนแสดงรายการสินค้า */}
                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <button
                            key={product.code} // ใช้รหัสสินค้าเป็น key
                            className="productList-button"
                            onClick={() => handleShowFields(product.code)} // แสดงฟอร์มสำหรับแก้ไข
                            style={{
                                backgroundImage: `url(${product.image || '/path/to/default/image.jpg'})`,
                            }} // ตั้งค่ารูปภาพพื้นหลัง
                        >
                            <span>{product.name}</span> {/* แสดงชื่อสินค้า */}
                        </button>
                    ))}
                </div>
                <div className="proBox-increase" onClick={() => handleShowFields(null)}>
                    {/* ปุ่มสำหรับเพิ่มสินค้าใหม่ */}
                    <FaPlus />
                </div>
            </div>

            {showFields && (
                // แสดงฟอร์มถ้าค่า showFields เป็น true
                <div className='prolist-con'>
                    <div className='edit-img_box'>
                        {image && (
                            // ถ้ามีรูปภาพให้แสดงรูปนั้น
                            <img
                                src={image}
                                alt="Uploaded"
                                className='uploaded-image'
                                onClick={() => document.getElementById("file-upload").click()} 
                                // คลิกที่รูปภาพเพื่อเลือกใหม่
                                style={{ cursor: 'pointer' }}
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} // เรียกฟังก์ชันเมื่ออัปรูป
                            style={{ display: 'none' }}
                            id="file-upload"
                        />
                        {!image && (
                            // ไม่มีรูปภาพ ให้แสดงโลโก้ 
                            <label htmlFor="file-upload" className="file-upload-label">
                                <img src="/img/upload.png" className="L-upload-logo" alt="Upload" />
                            </label>
                        )}
                    </div>

                    <div className='textName'>
                        <h6 className='t1'>ชื่อสินค้า</h6>
                        <h6 className='t2'>ประเภทสินค้า</h6>
                        <h6 className='t3'>ราคาสินค้า</h6>
                        <h6 className='t4'>รหัสสินค้า</h6>
                    </div>

                    <div className="con-ner">
                        {/* กรอกชื่อ*/}
                        <input
                            className="In-Name-box"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="ชื่อสินค้า"
                        />
                    </div>
                    <div className="con-ner">
                        {/* เลือกประเภท */}
                        <select
                            className="In-Category-box"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option value="">เลือกประเภทสินค้า</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.type}>
                                    {category.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="con-ner">
                        {/* กรอกราคา */}
                        <input
                            type="text"
                            className="In-Price-box"
                            value={productPrice}
                            onChange={handlePriceChange}
                            onBlur={handleBlurPrice}
                            placeholder="0"
                            inputMode="decimal"
                            min="0"
                        />
                    </div>
                    <div className="con-ner">
                        {/* กรอกรหัส */}
                        <input
                            className="In-Code-box"
                            value={productCode}
                            readOnly={isEditing} 
                            onChange={(e) => setProductCode(e.target.value)}
                            placeholder="รหัสสินค้า"
                        />
                    </div>

                    <div className="button-center">
                        <button className="confirm-button button-confirm-sub" onClick={handleConfirm}>
                            Confirm
                        </button>
                        {editingProductCode ? (
                            <button className="cancel-button button-confirm-sub" onClick={handleDeleteProduct}>
                                Delete
                            </button>
                        ) : (
                            <button className="cancel-button button-confirm-sub" onClick={resetForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

