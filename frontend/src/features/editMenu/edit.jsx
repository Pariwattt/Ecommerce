import React, { useState } from 'react';
import '../css/edit.css';  // นำเข้าไฟล์ CSS
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import LockZoom from '../webPageFeatures/LockZoom';
import Tabbar from './tabbar';
import { FaPlus } from 'react-icons/fa'; // นำเข้าไอคอน

import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function App() {
    const Navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCode, setProductCode] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]); // เพิ่ม state สำหรับเก็บสินค้าที่เพิ่มเข้ามา
    const [showFields, setShowFields] = useState(false);  // state ใหม่ที่จะใช้ควบคุมการแสดงผลของ input fields
    const [editingProductIndex, setEditingProductIndex] = useState(null);  // เพิ่ม state สำหรับการเก็บสินค้าที่กำลังแก้ไข

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatPrice = (value) => {
        if (!value) return '';
        const numberValue = parseFloat(value.replace(/,/g, ''));
        return numberValue.toLocaleString();
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            setProductPrice(value);
        }
    };

    const handleConfirm = () => {
        const newProduct = {
            name: productName,
            price: productPrice,
            code: productCode
        };

        // ถ้ากำลังแก้ไขสินค้า ให้แทนที่สินค้าเดิม
        if (editingProductIndex !== null) {
            const updatedProducts = [...products];
            updatedProducts[editingProductIndex] = newProduct;
            setProducts(updatedProducts);
        } else {
            // ถ้าไม่ได้แก้ไขสินค้าใหม่ ให้เพิ่มสินค้าใหม่
            setProducts([...products, newProduct]);
        }

        // รีเซ็ตค่าต่างๆ และซ่อนฟอร์ม
        setProductName('');
        setProductPrice('');
        setProductCode('');
        setImage(null);
        setShowFields(false);
        setEditingProductIndex(null);  // รีเซ็ตสถานะการแก้ไข
    };

    const handleCancel = () => {
        // ถ้ามีการแก้ไขสินค้า, ลบสินค้าออกจากรายการ
        if (editingProductIndex !== null) {
            handleDeleteProduct(editingProductIndex);  // ลบสินค้าที่กำลังแก้ไข
        } else {
            setProductName('');
            setProductPrice('');
            setProductCode('');
            setImage(null);
        }

        // รีเซ็ตฟอร์มและซ่อนการแสดงผล
        setShowFields(false);
        setEditingProductIndex(null);  // รีเซ็ตสถานะการแก้ไข
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const handleShowFields = (index) => {
        // ถ้ามีการคลิกสินค้ารายการเดิมเพื่อแก้ไข
        if (editingProductIndex !== null && editingProductIndex === index) {
            setShowFields(!showFields);  // สลับการแสดงฟอร์ม
        } else {
            setShowFields(true);
            setEditingProductIndex(index);  // กำหนดให้กำลังแก้ไขสินค้ารายการนี้
            const product = products[index];
            setProductName(product.name);
            setProductPrice(product.price);
            setProductCode(product.code);
        }
    };

    return (
        <div>
            <LockZoom />
            <Navbar />
            <Footbar />
            <Tabbar />
            <div className="product-list-con">
                <div className="product-list">
                    {products.map((product, index) => (
                        <button
                            key={index}
                            className="productList-button"
                            onClick={() => handleShowFields(index)} // เมื่อกดปุ่มให้แก้ไขสินค้า
                        >
                            {product.name}
                        </button>
                    ))}
                </div>
                <div className='proBox-increase' onClick={() => handleShowFields(null)}>
                    <FaPlus />
                </div>
            </div>

            {/* เงื่อนไขการแสดงผลของ input fields */}
            {showFields && (
                <>
                    <div className='prolist-con'>
                        <div className='edit-img_box'>
                            {image && <img src={image} alt="Uploaded" className='uploaded-image' />}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="file-upload-label">
                                <img src="/img/upload.png" className="L-upload-logo" />
                            </label>
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
                            <input
                                type="text"
                                className="In-Price-box"
                                value={productPrice}
                                onChange={handlePriceChange}
                                placeholder="0"
                                min="0"
                            />
                        </div>
                        <div className="con-ner">
                            <input
                                className="In-Code-box"
                                value={productCode}
                                onChange={(e) => setProductCode(e.target.value)}
                                placeholder="รหัสสินค้า"
                            />
                        </div>

                        {/* เงื่อนไขการแสดงผลปุ่ม Confirm และ Cancel */}
                        <div className="button-center">
                            <button className="confirm-button button-confirm-sub" onClick={handleConfirm}>
                                Confirm
                            </button>
                            <button className="cancel-button button-confirm-sub" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
