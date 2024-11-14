import React, { useState } from 'react';
import '../css/tabbar.css';
import { FaPlus } from 'react-icons/fa';

function Tabbar() {
  const [type, setType] = useState([]); // สร้าง state สำหรับเก็บกล่อง
  const [newText, setNewText] = useState(''); // สำหรับเก็บข้อความใหม่ที่กรอก
  const [showInput, setShowInput] = useState(false); // ใช้แสดง/ซ่อน input field
  const [editingIndex, setEditingIndex] = useState(null); // ใช้เก็บตำแหน่งของข้อความที่กำลังแก้ไข
  const [deletingIndex, setDeletingIndex] = useState(null); // ใช้เก็บตำแหน่งที่ต้องการลบ

  // ฟังก์ชันเพิ่มกล่องใหม่
  const handleAddtype = () => {
    setShowInput(true); // แสดง input field เมื่อคลิก +
    setEditingIndex(null); // รีเซ็ตการแก้ไข
  };

  // ฟังก์ชันยืนยันและเพิ่มข้อความลงใน type-container
  const handleConfirm = () => {
    if (newText.trim() !== '') { // เช็คถ้าข้อความไม่ว่าง
      if (editingIndex !== null) {
        // ถ้ากำลังแก้ไขกล่อง, ให้แก้ไขข้อความในตำแหน่งนั้น
        const updatedTypes = [...type];
        updatedTypes[editingIndex] = newText;
        setType(updatedTypes);
      } else {
        // ถ้าไม่ใช่การแก้ไข, ให้เพิ่มข้อความใหม่
        setType([...type, newText]);
      }

      setNewText(''); // รีเซ็ตข้อความหลังจากยืนยัน
      setShowInput(false); // ซ่อน input field
    }
  };

  // ฟังก์ชันยกเลิก
  const handleCancel = () => {
    setNewText(''); // รีเซ็ตข้อความที่กรอก
    setShowInput(false); // ซ่อน input field
    setEditingIndex(null); // รีเซ็ตการแก้ไข
  };

  // ฟังก์ชันลบข้อความ
  const handleDelete = () => {
    if (editingIndex !== null) {
      const updatedTypes = type.filter((_, i) => i !== editingIndex); // ลบข้อความที่ถูกเลือก
      setType(updatedTypes);
      setShowInput(false); // ซ่อน input field
      setEditingIndex(null); // รีเซ็ตการแก้ไข
    }
  };

  // ฟังก์ชันเริ่มต้นการแก้ไข
  const handleEdit = (index) => {
    setEditingIndex(index); // กำหนดตำแหน่งที่กำลังแก้ไข
    setNewText(type[index]); // กำหนดข้อความที่เลือกมาให้กรอกใน input
    setShowInput(true); // แสดง input field
  };

  return (
    <div className="tabbar">
      <div className="left-buttons">
        {/* แสดงกล่องแต่ละกล่องที่เพิ่ม */}
        <div className="type-container">
          {type.map((text, index) => (
            <div key={index} className="type-product">
              <span onClick={() => handleEdit(index)}>{text}</span> {/* แก้ไขข้อความเมื่อคลิก */}
            </div>
          ))}
        </div>

        {/* ปุ่ม + */}
        <div className="tabber-increase" onClick={handleAddtype}>
          <FaPlus />
        </div>
      </div> 

      {/* ฟอร์มกรอกข้อความ */}
      {showInput && (
        <div className="input-container">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="กรอกข้อความ"
          />
          <button onClick={handleConfirm}>ยืนยัน</button>
          <button onClick={editingIndex !== null ? handleDelete : handleCancel}>
            {editingIndex !== null ? 'ลบ' : 'ยกเลิก'}
          </button> {/* ถ้าเป็นการแก้ไขจะแสดงคำว่า 'ลบ', ถ้าไม่ใช่จะเป็น 'ยกเลิก' */}
        </div>
      )}
    </div>
  );
}

export default Tabbar;
