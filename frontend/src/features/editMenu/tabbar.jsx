import React, { useState } from 'react';
import '../css/tabbar.css';
import { FaPlus } from 'react-icons/fa';
import Type from './type';
import axios from 'axios';

function Tabbar() {
  const [showType, setShowType] = useState(false);
  const [categories, setCategories] = useState([]); // เก็บรายการกล่องข้อความ
  const [editIndex, setEditIndex] = useState(null); // เก็บตำแหน่งของกล่องที่กำลังแก้ไข
  const [isEditing, setIsEditing] = useState(false); // ตรวจสอบสถานะการเปิดแก้ไข

  // เพิ่มหมวดหมู่ใหม่
  const addCategory = (category) => {
    setCategories((prev) => [...prev, category]);
    setShowType(false); // ซ่อน Type หลังยืนยัน
    setIsEditing(false); // ปิดการแก้ไข
  };

  // แก้ไขหมวดหมู่
  const editCategory = (category, index) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = category; // อัปเดตหมวดหมู่ที่เลือก
    setCategories(updatedCategories);
    setShowType(false); // ซ่อน Type หลังแก้ไข
    setIsEditing(false); // ปิดการแก้ไข
    setEditIndex(null); // รีเซ็ตสถานะการแก้ไข
  };

  // ลบหมวดหมู่
  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, idx) => idx !== index);
    setCategories(updatedCategories);
    setShowType(false); // ซ่อน Type หลังลบ
    setIsEditing(false); // ปิดการแก้ไข
    setEditIndex(null); // รีเซ็ตสถานะการแก้ไข
  };

  return (
    <div>
      {/* แสดง Type เฉพาะเมื่อกด + หรือแก้ไข */}
      {showType && (
        <>
          {/* Overlay ที่ปิดกั้นการคลิกที่ด้านหลัง */}
          <div className="overlay" onClick={() => {
            setShowType(false);
            setIsEditing(false); // ปิดการแก้ไขเมื่อคลิกปิด
          }}></div>
          <Type
            onConfirm={editIndex === null ? addCategory : (category) => editCategory(category, editIndex)} 
            onDelete={editIndex !== null ? () => deleteCategory(editIndex) : null} // ส่งฟังก์ชันลบเมื่อแก้ไข
            onClose={() => {
              setShowType(false);
              setIsEditing(false); // ปิดการแก้ไข
              setEditIndex(null); // รีเซ็ตการแก้ไข
            }}
            initialValue={editIndex !== null ? categories[editIndex] : ''} // ส่งค่าเริ่มต้นหากเป็นการแก้ไข
          />
        </>
      )}

      <div className="tabbar">
        <div className="left-buttons">
          {/* แสดงกล่องข้อความที่เพิ่ม */}
          {categories.map((category, index) => (
            <div
              key={index}
              className="type-product"
              onClick={() => {
                // เปิดแก้ไขเฉพาะเมื่อกดปุ่ม + เท่านั้น
                if (isEditing) {
                  setEditIndex(index); // เลือกกล่องเพื่อแก้ไข
                  setShowType(true); // เปิดหน้า Type
                }
              }}
            >
              <span>{category}</span>
            </div>
          ))}
        </div>
        {/* ปุ่ม + */}
        <div className="tabber-increase" onClick={() => {
          setShowType(true);
          setIsEditing(true); // เปิดการแก้ไขเมื่อกดปุ่ม +
        }}>
          <FaPlus />
        </div>
      </div>
    </div>
  );
}

export default Tabbar;
