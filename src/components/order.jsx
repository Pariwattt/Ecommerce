import React from "react";
import '../Css/order.css'
const order =()=>{
    <div className="order-container">
        <button
            className="close-button"
            onClick={() => (window.location.href = 'home.jsx')}
            >
    &times;
    </button>
    <div className="order-title">ORDER</div>
        <div className="table-grid">
            <button className="table-button">โต๊ะ 1</button>
            <button className="table-button">โต๊ะ 2</button>
            <button className="table-button">โต๊ะ 3</button>
            <button className="table-button">โต๊ะ 4</button>
            <button className="table-button">โต๊ะ 5</button>
            <button className="table-button">โต๊ะ Vip</button>
            <button className="table-button">Take-away</button>
            <button className="add-table-button">[เพิ่มโต๊ะ]</button>
        </div>
    </div>
};