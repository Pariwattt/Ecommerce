import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/edit.css";
import Navbar from "../webPageFeatures/navbar";
import Footbar from "../webPageFeatures/footbar";
import LockZoom from "../webPageFeatures/LockZoom";
import Tabbar from "./tabbar";
import { FaPlus } from "react-icons/fa";

function App() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCode, setProductCode] = useState("");
    const [productCategory, setProductCategory] = useState(""); // Store selected category
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products by selected category
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // Currently selected category
    const [showFields, setShowFields] = useState(false);
    const [editingProductCode, setEditingProductCode] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/v1/product/get");
                setProducts(response.data);
                setFilteredProducts(response.data); // Display all products initially
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
            setShowFields(true);
        } else {
            resetForm();
            setShowFields(true);
        }
    };

    const handleConfirm = async () => {
        const newProduct = {
            name: productName,
            price: parseFloat(productPrice), // Ensure price is sent as Float
            code: productCode,
            type: productCategory, // Send selected category
            image,
        };

        try {
            if (editingProductCode) {
                await axios.put(`http://localhost:8081/v1/product/edit/${editingProductCode}`, newProduct);
                alert("แก้ไขสินค้าสำเร็จ");
            } else {
                await axios.post("http://localhost:8081/v1/product/add", newProduct);
                alert("เพิ่มสินค้าสำเร็จ");
            }
            const response = await axios.get("http://localhost:8081/v1/product/get");
            setProducts(response.data);
            setFilteredProducts(
                selectedCategory
                    ? response.data.filter((product) => product.type?.type === selectedCategory)
                    : response.data
            );
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error saving product");
        }

        resetForm();
    };

    const resetForm = () => {
        setProductName("");
        setProductPrice("");
        setProductCode("");
        setProductCategory("");
        setImage(null);
        setEditingProductCode(null);
        setShowFields(false);
    };

    return (
        <div>
            <LockZoom />
            <Navbar />
            <Footbar />
            <Tabbar onCategorySelect={handleCategorySelect} />

            <div className="product-list-con">
                <div className="product-list">
                    {/* Display filtered products */}
                    {filteredProducts.map((product) => (
                        <button
                            key={product.code}
                            className="productList-button"
                            onClick={() => handleShowFields(product.code)}
                        >
                            {product.name}
                        </button>
                    ))}
                </div>
                <div className="proBox-increase" onClick={() => handleShowFields(null)}>
                    <FaPlus />
                </div>
            </div>

            {showFields && (
                <div className="prolist-con">
                    <div className="edit-img_box">
                        {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => setImage(reader.result);
                                reader.readAsDataURL(file);
                            }}
                            style={{ display: "none" }}
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                            <img src="/img/upload.png" className="L-upload-logo" />
                        </label>
                    </div>

                    <div className="con-ner">
                        <input
                            className="In-Name-box"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="ชื่อสินค้า"
                        />
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
                        <input
                            type="text"
                            className="In-Price-box"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="0"
                        />
                        <input
                            className="In-Code-box"
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                            placeholder="รหัสสินค้า"
                        />
                    </div>

                    <div className="button-center">
                        <button className="confirm-button" onClick={handleConfirm}>
                            Confirm
                        </button>
                        {editingProductCode && (
                            <button className="cancel-button" onClick={resetForm}>
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
