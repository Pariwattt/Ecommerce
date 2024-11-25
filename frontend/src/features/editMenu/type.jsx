import React, { useState, useEffect } from 'react';
import '../css/tabbar.css';

// Component Type สำหรับเพิ่ม/แก้ไขหมวดหมู่
function Type({ onConfirm, onClose, onDelete, initialValue }) {
  const [text, setText] = useState(initialValue || ''); 
  // สร้าง state `text` เพื่อเก็บข้อความที่ป้อนใน input โดยตั้งค่าเริ่มต้นจาก `initialValue`

  useEffect(() => {
    setText(initialValue || ''); 
    // อัปเดตข้อความใน input เมื่อค่า `initialValue` เปลี่ยน
  }, [initialValue]);

  const handleInputChange = (e) => {
    setText(e.target.value); 
    // อัปเดตค่า `text` ใน state ทุกครั้งที่ผู้ใช้พิมพ์ข้อความใน input
  };

  const handleConfirm = () => {
    if (text.trim()) { 
      // ตรวจสอบว่าผู้ใช้ป้อนข้อความที่ไม่ใช่ช่องว่างหรือข้อความว่าง
      onConfirm(text); 
      // ส่งข้อความ `text` กลับไปยังฟังก์ชัน `onConfirm` ใน Component หลัก
      setText(''); 
      // รีเซ็ตข้อความใน input ให้ว่างเปล่า
    }
  };

  return (
    <div className="nametype">
      <div>
        <input
          type="text"
          value={text} // กำหนดค่าใน input ให้ตรงกับ `text` ใน state
          onChange={handleInputChange} // เรียก `handleInputChange` เมื่อมีการเปลี่ยนแปลงใน input
          placeholder="หมวดหมู่" 
          className="TypeNameInput" 
        />
      </div>
      <div className="Type-center">
        <button
          className="confirm-type confirm-sub"
          onClick={handleConfirm} 
        >
          Confirm
        </button>
        {onDelete ? (
          <button
            className="cancel-type confirm-sub"
            onClick={onDelete} 
          >
            Delete
          </button>
        ) : (
          <button
            className="cancel-type confirm-sub"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default Type; 
