import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/edit.css'; // นำเข้าไฟล์ CSS
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import LockZoom from '../webPageFeatures/LockZoom';
import Tabbar from './tabbar';
import { FaPlus } from 'react-icons/fa'; // นำเข้าไอคอน

function App() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [showFields, setShowFields] = useState(false);
    const [editingProductIndex, setEditingProductIndex] = useState(null);

    // ดึงข้อมูลสินค้าทั้งหมดเมื่อโหลดหน้าเว็บ
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/v1/product/get");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

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

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            setProductPrice(value);
        }
    };

    const handleConfirm = async () => {
        const newProduct = {
            name: productName,
            price: productPrice,
            code: productCode,
            type: productCategory,
            image,
        };

        try {
            if (editingProductIndex !== null) {
                // เรียก API แก้ไขสินค้า
                await axios.put(`http://localhost:8081/v1/product/edit/${productCode}`, newProduct);
                alert("แก้ไขสินค้าสำเร็จ");
            } else {
                // เรียก API เพิ่มสินค้าใหม่
                await axios.post("http://localhost:8081/v1/product/add", newProduct);
                alert("เพิ่มสินค้าสำเร็จ");
            }
            // รีโหลดข้อมูลสินค้า
            const response = await axios.get("http://localhost:8081/v1/product/get");
            setProducts(response.data);
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error saving product");
        }

        // รีเซ็ตฟอร์ม
        setProductName('');
        setProductPrice('');
        setProductCode('');
        setProductCategory('');
        setImage(null);
        setShowFields(false);
        setEditingProductIndex(null);
    };

    const handleDeleteProduct = async () => {
        const codeToDelete = products[editingProductIndex].code;

        try {
            await axios.delete(`http://localhost:8081/v1/product/delete/${codeToDelete}`);
            alert("ลบสินค้าสำเร็จ");

            // รีโหลดข้อมูลสินค้า
            const response = await axios.get("http://localhost:8081/v1/product/get");
            setProducts(response.data);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product");
        }

        // รีเซ็ตฟอร์ม
        setProductName('');
        setProductPrice('');
        setProductCode('');
        setProductCategory('');
        setImage(null);
        setShowFields(false);
        setEditingProductIndex(null);
    };

    const handleShowFields = (index) => {
        if (editingProductIndex !== null && editingProductIndex === index) {
            setShowFields(!showFields);
        } else {
            setShowFields(true);
            setEditingProductIndex(index);
            if (index !== null) {
                const product = products[index];
                setProductName(product.name);
                setProductPrice(product.price);
                setProductCode(product.code);
                setProductCategory(product.type);
                setImage(product.image);
            } else {
                setProductName('');
                setProductPrice('');
                setProductCode('');
                setProductCategory('');
                setImage(null);
            }
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
                            onClick={() => handleShowFields(index)}
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
                        <select
                            className="In-Category-box"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option value="">เลือกประเภทสินค้า</option>
                            <option value="Electronics">อิเล็กทรอนิกส์</option>
                            <option value="Clothing">เสื้อผ้า</option>
                            <option value="Food">อาหาร</option>
                            <option value="Home">บ้านและสวน</option>
                        </select>
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

                    <div className="button-center">
                        <button className="confirm-button button-confirm-sub" onClick={handleConfirm}>
                            Confirm
                        </button>
                        {editingProductIndex !== null ? (
                            <button className="cancel-button button-confirm-sub" onClick={handleDeleteProduct}>
                                Delete
                            </button>
                        ) : (
                            <button className="cancel-button button-confirm-sub" onClick={() => setShowFields(false)}>
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
