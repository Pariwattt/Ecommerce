import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/edit.css';
import Navbar from '../webPageFeatures/navbar';
import Footbar from '../webPageFeatures/footbar';
import LockZoom from '../webPageFeatures/LockZoom';
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

    const handleShowFields = (productCode) => {
        if (editingProductCode === productCode) {
            setShowFields(!showFields);
        } else {
            setShowFields(true);
            setEditingProductCode(productCode);

            const product = products.find(product => product.code === productCode);
            if (product) {
                setProductName(product.name);
                setProductPrice(product.price);
                setProductCode(product.code);
                setProductCategory(product.type);
                setImage(product.image);
            } else {
                resetForm();
            }
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // เก็บประเภทที่เลือก
        setFilteredProducts(
            category ? products.filter(product => product.type === category) : products
        ); // หาก category เป็น '' จะแสดงสินค้าทั้งหมด
        setShowFields(false); // ปิดฟอร์มเมื่อเปลี่ยนประเภทสินค้า
    };

    const resetForm = () => {
        setProductName('');
        setProductPrice('');
        setProductCode('');
        setProductCategory('');
        setImage(null);
        setShowFields(false);
        setEditingProductCode(null);
    };

    return (
        <div>
            <LockZoom />
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
