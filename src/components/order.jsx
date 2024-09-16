import React from 'react';
import '../css/order.css'
const Order =()=>{
    return (
    <div className="order-container">

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
    );
};
export default Order
