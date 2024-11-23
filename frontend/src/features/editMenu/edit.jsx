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
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // สินค้าที่ถูกกรอง
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); // ประเภทที่เลือก
    const [showFields, setShowFields] = useState(false);
    const [editingProductCode, setEditingProductCode] = useState(null); // ใช้ productCode แทน index
    const [isEditing, setIsEditing] = useState(false); // ใช้บ่งชี้ว่าอยู่ในโหมดแก้ไขหรือไม่

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/v1/product/get");
                setProducts(response.data);
                setFilteredProducts(response.data); // เริ่มต้นแสดงสินค้าทั้งหมด
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8081/v1/type/get");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);
    
    // Handle category selection from Tabbar
    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // Update the currently selected category
        if (category === "") {
            setFilteredProducts(products); // Show all products if "ทั้งหมด" is selected
        } else {
            const filtered = products.filter((product) => product.type?.type === category);
            setFilteredProducts(filtered); // Show products matching the selected category
        }
    };

    const handleShowFields = (productCode) => {
        const product = products.find((product) => product.code === productCode);
        if (product) {
            setProductName(product.name);
            setProductPrice(product.price);
            setProductCode(product.code);
            setProductCategory(product.type?.type || ""); // Ensure correct category is pre-filled
            setImage(product.image);
            setEditingProductCode(productCode);
            setIsEditing(true); // Set to editing mode
            setShowFields(true);
        } else {
            resetForm();
            setIsEditing(false); // Set to add mode
            setShowFields(true);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // ตรวจสอบว่า reader.result มีค่าที่ถูกต้อง
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePriceChange = (e) => {
        let value = e.target.value;
        // ลบเครื่องหมายคอมม่าออก
        value = value.replace(/,/g, "");
        // ตรวจสอบว่าเป็นตัวเลขหรือไม่ (รองรับตัวเลขทศนิยม)
        if (/^\d*\.?\d*$/.test(value)) {
            // แสดงตัวเลขที่มีเครื่องหมายคั่นพัน
            setProductPrice(value);
        }
    };

    const handleBlurPrice = () => {
        // แปลงเป็นตัวเลขและใส่เครื่องหมายคั่นพัน
        const formattedValue = new Intl.NumberFormat().format(productPrice);
        setProductPrice(formattedValue);
    };

    const handleConfirm = async () => {
        const newProduct = {
            name: productName,
            price: parseFloat(productPrice) || 0,// แปลงเป็นตัวเลข หรือใช้ 0 หากเว้นว่าง
            code: productCode,
            type: productCategory,
            image,
        };

        try {
            if (editingProductCode) {
                // แก้ไขสินค้า
                await axios.put(`http://localhost:8081/v1/product/edit/${editingProductCode}`, newProduct);
                alert("แก้ไขสินค้าสำเร็จ");
            } else {
                // เพิ่มสินค้าใหม่
                await axios.post("http://localhost:8081/v1/product/add", newProduct);
                alert("เพิ่มสินค้าสำเร็จ");
            }

            const response = await axios.get("http://localhost:8081/v1/product/get");
            setProducts(response.data);
            setFilteredProducts(
                selectedCategory
                    ? response.data.filter(product => product.type === selectedCategory)
                    : response.data
            );
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error saving product");
        }

        resetForm();
    };

    const handleDeleteProduct = async () => {
        try {
            // ใช้ backticks (`  `) สำหรับ template string
            await axios.delete(`http://localhost:8081/v1/product/delete/${editingProductCode}`);
            alert("ลบสินค้าสำเร็จ");

            const response = await axios.get("http://localhost:8081/v1/product/get");
            setProducts(response.data);
            setFilteredProducts(
                selectedCategory
                    ? response.data.filter(product => product.type === selectedCategory)
                    : response.data
            );
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product");
        }

        resetForm();
    };

    const resetForm = () => {
        setProductName('');
        setProductPrice('');
        setProductCode('');
        setProductCategory('');
        setImage(null);
        setShowFields(false);
        setEditingProductCode(null);
        setIsEditing(false); // Reset editing status
    };

    return (
        <div>
            
            <Navbar />
            <Footbar />
            <Tabbar onCategorySelect={handleCategorySelect} />

            <div className="product-list-con">
                <div className="product-list">
                    {filteredProducts.map(product => (
                        <button
                            key={product.code}
                            className="productList-button"
                            onClick={() => handleShowFields(product.code)}
                        >
                            {product.name}
                        </button>
                    ))}
                </div>
                <div className='proBox-increase' onClick={() => handleShowFields(null)}>
                    <FaPlus />
                </div>
            </div>

            {showFields && (
                <div className='prolist-con'>
                    <div className='edit-img_box'>
                        {image && (
                            <img
                                src={image}
                                alt="Uploaded"
                                className='uploaded-image'
                                onClick={() => document.getElementById("file-upload").click()} // คลิกที่รูปเพื่อเปลี่ยนภาพ
                                style={{ cursor: 'pointer' }} // เพิ่ม cursor แบบ pointer เพื่อบอกผู้ใช้ว่าสามารถคลิกได้
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="file-upload"
                        />
                        {!image && (
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
                        <input
                            className="In-Name-box"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="ชื่อสินค้า"
                        />
                    </div>
                    <div className="con-ner">
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
                        <input
                            type="text"
                            className="In-Price-box"
                            value={productPrice}
                            onChange={handlePriceChange} // ตรวจสอบการเปลี่ยนแปลงและแสดงผล
                            onBlur={handleBlurPrice} // เมื่อออกจากช่องกรอก จะใส่เครื่องหมายคั่นพัน
                            placeholder="0"
                            inputMode="decimal"
                            min="0"
                        />
                    </div>
                    <div className="con-ner">
                        <input
                            className="In-Code-box"
                            value={productCode}
                            readOnly={isEditing} // ถ้าอยู่ในโหมดแก้ไข จะไม่สามารถกรอกข้อมูลได้
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