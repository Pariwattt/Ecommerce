import React, { useState } from 'react';
import '../css/edit.css';  // นำเข้าไฟล์ CSS
import Navbar from './navbar';  // นำเข้าคอมโพเนนต์ Navbar
import Footbar from './footbar';  // นำเข้า Footbar
import Tabbar from './tabbar';
import LockZoom from './LockZoom';

import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

function App() {
    const Navigate = useNavigate();
    
    const [productName, setProductName] = useState(''); // สร้างตัวแปร text และฟังก์ชัน setText เพื่อจัดการข้อความ
    const [productPrice, setProductPrice] = useState(''); // สำหรับราคาสินค้า
    const [productCode,setProductCode] = useState('');
    const [image, setImage] = useState(null); // สร้าง state สำหรับรูปภาพ
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                    reader.onloadend = () => {
                    setImage(reader.result); // ตั้งค่ารูปภาพเมื่ออ่านไฟล์เสร็จ
                };
            reader.readAsDataURL(file); // อ่านไฟล์เป็น Base64 URL
        }
    };
    // ฟังก์ชันสำหรับแปลงตัวเลขให้มีคอมม่า
    const formatPrice = (value) => {
        if (!value) return ''; // ถ้าไม่มีค่าให้ส่งกลับเป็นค่าว่าง
        const numberValue = parseFloat(value.replace(/,/g, '')); // ลบคอมม่าออกก่อนแปลงเป็นตัวเลข
        return numberValue.toLocaleString(); // แปลงตัวเลขให้มีคอมม่า
    };
    const handlePriceChange = (e) => {
        const { value } = e.target;
        // อัปเดตราคาสินค้าเป็นฟอร์แมตที่มีคอมม่า
        setProductPrice(formatPrice(value));
    };

    return (   
        <div>
            <LockZoom/>
            <Navbar />
            <Footbar />
            <Tabbar/>
            <div className='edit-img_box'>
            {image && <img src={image} alt="Uploaded" className='uploaded-image' />} {/* แสดงรูปภาพที่อัพโหลด */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // เมื่อมีการเลือกไฟล์
                    style={{ display: 'none' }} // ซ่อน input
                    id="file-upload"/>
                <label htmlFor="file-upload" className="file-upload-label">
                <img src="/img/upload.png"className="L-upload-logo" />
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
                    onChange={(e) => setProductName(e.target.value)}  //เมื่อมีการพิมพ์ข้อความ จะอัปเดตค่า text 
                    placeholder="ชื่อสินค้า" //ข้อความที่จะแสดงเมื่อยังไม่มีข้อความ 
                />
            </div>
            <div className="con-ner">
                <input
                    type="text"
                    className="In-Price-box"
                    value={productPrice}
                    onChange={handlePriceChange} // อัปเดตราคาเมื่อมีการพิมพ 
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
