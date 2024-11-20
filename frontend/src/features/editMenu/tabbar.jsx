import React, { useState, useEffect } from 'react';
import '../css/tabbar.css';
import { FaPlus } from 'react-icons/fa';
import Type from './type';
import axios from 'axios';

function Tabbar({ onCategorySelect }) { // รับ callback function
  const [showType, setShowType] = useState(false);
  const [categories, setCategories] = useState([]); // เก็บรายการกล่องข้อความ
  const [editIndex, setEditIndex] = useState(null); // เก็บตำแหน่งของกล่องที่กำลังแก้ไข
  const [isEditing, setIsEditing] = useState(false); // ตรวจสอบสถานะการเปิดแก้ไข
  const [activeType, setActiveType] = useState(''); // Track selected type

  useEffect(() => {
    axios.get('http://localhost:8081/v1/type/get')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const addCategory = async (category) => {
    try {
      // ส่งคำขอเพิ่มหมวดหมู่
      const response = await axios.post('http://localhost:8081/v1/type/add', { type: category });

      // ตรวจสอบข้อมูลที่ API ส่งกลับ
      console.log('API Response:', response.data);

      // เพิ่มหมวดหมู่ใน state (ตรวจสอบว่า response.data.type ถูกต้อง)
      if (response.data && response.data.type) {
        setCategories((prev) => [...prev, response.data.type]); // เพิ่มหมวดหมู่ใหม่
        setShowType(false); // ซ่อนหน้าต่าง Type
        setIsEditing(false); // ปิดโหมดแก้ไข
      } else {
        console.error('Invalid response data:', response.data);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // แก้ไขหมวดหมู่
  const editCategory = async (category, index) => {
    const typeID = categories[index].typeID;
    try {
      const response = await axios.put(`http://localhost:8081/v1/type/edit/${typeID}`, { type: category });
      const updatedCategories = [...categories];
      updatedCategories[index] = response.data.type;
      setCategories(updatedCategories);
      setShowType(false); // ซ่อน Type หลังแก้ไข
      setIsEditing(false); // ปิดการแก้ไข
      setEditIndex(null); // รีเซ็ตสถานะการแก้ไข
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  // ลบหมวดหมู่
  const deleteCategory = async (index) => {
    const typeID = categories[index].typeID;
    try {
      await axios.delete(`http://localhost:8081/v1/type/delete/${typeID}`);
      setCategories(categories.filter((_, idx) => idx !== index));
      setShowType(false); // ซ่อน Type หลังลบ
      setIsEditing(false); // ปิดการแก้ไข
      setEditIndex(null); // รีเซ็ตสถานะการแก้ไข
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      {/* แสดง Type เฉพาะเมื่อกด + หรือแก้ไข */}
      {showType && (
        <>
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
            initialValue={editIndex !== null ? categories[editIndex]?.type : ''} // ส่งค่าเริ่มต้นหากเป็นการแก้ไข
          />
        </>
      )}

      <div className="tabbar">
        <div className="left-buttons">
          {/* "All" Button */}
          <div
            className={`type-product ${activeType === '' ? 'active' : ''}`} // Highlight if active
            onClick={() => {
              setActiveType(''); // Reset activeType
              onCategorySelect(''); // เลือก "ทั้งหมด"
            }}
          >
            <span>ทั้งหมด</span>
          </div>

          {/* ปุ่มประเภทสินค้า */}
          {categories.map((category, index) => (
            <div
              key={index}
              className={`type-product ${activeType === category.type ? 'active' : ''}`} // ใช้ 'active' เมื่อเลือก
              onClick={() => {
                // ส่งค่า type
                // เปิดแก้ไขเฉพาะเมื่อกดปุ่ม + เท่านั้น
                if (isEditing) {
                  setEditIndex(index); // เลือกกล่องเพื่อแก้ไข
                  setShowType(true); // เปิดหน้า Type
                }
                else {
                  setActiveType(category.type); // อัปเดต activeType
                  onCategorySelect(category.type);
                }
              }}
            >
              <span>{category.type}</span>
            </div>
          ))}
        </div>
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
