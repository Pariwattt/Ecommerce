import React, { useState, useEffect } from 'react';
import '../css/tabbar.css';

function Type({ onConfirm, onClose, onDelete, initialValue }) {
  const [text, setText] = useState(initialValue || ''); // เก็บข้อความที่ป้อน

  useEffect(() => {
    setText(initialValue || ''); // อัปเดตข้อความเมื่อ props เปลี่ยน
  }, [initialValue]);

  const handleInputChange = (e) => {
    setText(e.target.value); // อัปเดตข้อความใน state
  };

  const handleConfirm = () => {
    if (text.trim()) { // ตรวจสอบว่าข้อความไม่ว่าง
      onConfirm(text); // ส่งข้อความไปยัง Tabbar
      setText(''); // รีเซ็ตข้อความ
    }
  };

  return (
    <div className="nametype">
      <div>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="หมวดหมู่"
          className="TypeNameInput"
        />
      </div>
      <div className="Type-center">
        <button
          className="confirm-type confirm-sub"
          onClick={handleConfirm} // เรียกใช้งานเมื่อกด Confirm
        >
          Confirm
        </button>
        {/* หากมีฟังก์ชัน onDelete ให้แสดงปุ่ม Delete แทน Cancel */}
        {onDelete ? (
          <button
            className="cancel-type confirm-sub"
            onClick={onDelete} // เรียกใช้งานเมื่อกด Delete
          >
            Delete
          </button>
        ) : (
          <button
            className="cancel-type confirm-sub"
            onClick={onClose} // เรียกใช้งานเมื่อกด Cancel
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default Type;
