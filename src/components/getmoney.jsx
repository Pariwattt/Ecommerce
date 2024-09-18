import React, { useState } from 'react';  // เพิ่มการ import useState
import '../css/home.css'
import '../css/getmoney.css'
import { useNavigate } from "react-router-dom";

const GetMoney = () => {
    const [value, setValue] = useState(''); // เรียกใช้ useState สำหรับจำนวนเงิน
    const [category, setCategory] = useState('เงินสด'); // เรียกใช้ useState สำหรับหมวดหมู่

    // ฟังก์ชันสำหรับเพิ่มตัวเลขใน input
    const increaseValue = (amount) => {
        setValue(prevValue => (parseInt(prevValue, 10) || 0) + amount);
    };

    // ฟังก์ชันสำหรับลบข้อมูลใน input
    const clearValue = () => {
        setValue(''); // ตั้งค่า value ให้เป็นค่าว่าง
    };

    const changeCategory = (newCategory) => {
        setCategory(newCategory); // เปลี่ยนหมวดหมู่
        clearValue(); // ลบข้อมูลใน input เมื่อเปลี่ยนหมวดหมู่
    };

    const navigate = useNavigate();

    return (
        <div className="containers">
            <select >
                <option value="เงินสด">เงินสด</option>
                <option value="สแกนจ่าย">แสกนจ่าย</option>
                <option value="บัตรเครดิต">บัตรเครดิต</option>
            </select>


            {/* Input สำหรับใส่จำนวนเงิน */}
            <input
                type="number"
                id="numberInput"
                className="input-box"
                placeholder="ใส่จำนวนเงิน"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            {/* ปุ่มตัวเลข */}
            <div>
                <button className="btn" onClick={() => increaseValue(0)}>0</button>
                <button className="btn" onClick={() => increaseValue(10)}>10</button>
                <button className="btn" onClick={() => increaseValue(50)}>50</button><br />
                <button className="btn" onClick={() => increaseValue(100)}>100</button>
                <button className="btn" onClick={() => increaseValue(500)}>500</button>
                <button className="btn" onClick={() => increaseValue(1000)}>1000</button>
            </div>

            {/* ปุ่มลบ */}
            <button className="btndelete" onClick={clearValue}>ลบ</button><br /><br /><br />

            {/* ปุ่มยกเลิกและยืนยัน */}
            <button className="custom-button button-logout" onClick={() => navigate('/menu')}>ยกเลิก</button>
            <button className="custom-button button-logout" onClick={() => navigate('/pay')}>ยืนยัน</button>
        </div>
    );
};

export default GetMoney;
