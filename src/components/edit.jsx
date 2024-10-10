import React, { useState } from 'react';
import '../css/edit.css';  // นำเข้าไฟล์ CSS
import Navbar from './navbar';  // นำเข้าคอมโพเนนต์ Navbar
import Footbar from './footbar';  // นำเข้า Footbar
import Tabbar from './tabbar';

function App() {
    const [productName, setProductName] = useState(''); // สร้างตัวแปร text และฟังก์ชัน setText เพื่อจัดการข้อความ
    const [productPrice, setProductPrice] = useState(''); // สำหรับราคาสินค้า
    const [productCode,setProductCode] = useState('');
    return (
        
        <div>
            <Navbar />
            <Footbar />
            <Tabbar/>
            <div className='edit-img_box'></div>
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
                    onChange={(e) => setProductName(e.target.value)}  //เมื่อมีการพิมพ์ข้อความ จะอัปเดตค่า text 
                    placeholder="ชื่อสินค้า" //ข้อความที่จะแสดงเมื่อยังไม่มีข้อความ 
                />
            </div>
            <div className="con-ner">
                <input
                    type="number"
                    className="In-Price-box"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}  
                    placeholder="0"  // ข้อความที่จะแสดงเมื่อยังไม่มีข้อความ
                    min="0" // กำหนดค่าต่ำสุดเป็น 0
                />
            </div>
            <div className="con-ner">
                <input
                    className="In-Code-box" 
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}   
                    placeholder="รหัสสินค้า" //ข้อความที่จะแสดงเมื่อยังไม่มีข้อความ 
                />
            </div>
            <div className="button-center" >
                <button className="confirm-button button-confirm-sub">
                    Confirm
                </button>
                <button className="cancel-button button-confirm-sub" >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default App;
