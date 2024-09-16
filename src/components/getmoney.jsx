import React, { useState } from 'react';  // เพิ่มการ import useState
import '../css/home.css'
import '../css/getmoney.css'

const GetMoney = () => {
    const [value, setValue] = useState(''); // เรียกใช้ useState

    // ฟังก์ชันสำหรับเพิ่มตัวเลขใน input
    const increaseValue = (amount) => {
        setValue(prevValue => (parseInt(prevValue, 10) || 0) + amount);
    };

    // ฟังก์ชันสำหรับลบข้อมูลใน input
    const clearValue = () => {
        setValue(''); // ตั้งค่า value ให้เป็นค่าว่าง
    };

    return (
        <div className="container">
            <div className="textbox">เงินสด</div>
            <input
                type="number"
                id="numberInput"
                className="input-box"
                placeholder="ใส่จำนวนเงิน"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div>
                <button className="btn" onClick={() => increaseValue(0)}>0</button>
                <button className="btn" onClick={() => increaseValue(10)}>10</button>
                <button className="btn" onClick={() => increaseValue(50)}>50</button><br />
                <button className="btn" onClick={() => increaseValue(100)}>100</button>
                <button className="btn" onClick={() => increaseValue(500)}>500</button>
                <button className="btn" onClick={() => increaseValue(1000)}>1000</button>
            </div>
            <button className="btndelete" onClick={clearValue}>ลบ</button><br /><br /><br />
            <button className="custom-button button-logout">ยกเลิก</button>
            <button className="custom-button button-logout">ยืนยัน</button>
        </div>
    );
};

export default GetMoney;
