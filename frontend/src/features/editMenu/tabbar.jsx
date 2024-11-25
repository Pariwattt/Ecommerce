import React, { useState, useEffect } from 'react';
import '../css/tabbar.css';
import { FaPlus } from 'react-icons/fa';
import Type from './type';
import axios from 'axios';
import triggerRefresh from "../../components/refreshUtil";

function Tabbar({ onCategorySelect }) {
  const [showType, setShowType] = useState(false);
  //การแสดงผลหน้าต่างเพิ่มหรือแก้ไขประเภทสินค้า
  const [categories, setCategories] = useState([]);
  // เก็บรายการหมวดหมู่สินค้า
  const [editIndex, setEditIndex] = useState(null);
  // เก็บตำแหน่งของหมวดหมู่ที่กำลังแก้ไข
  const [isEditing, setIsEditing] = useState(false);
  // ติดตามสถานะว่าอยู่ในโหมดการแก้ไขหรือไม่
  const [activeType, setActiveType] = useState('');
  // ติดตามประเภทสินค้าที่ถูกเลือก

  useEffect(() => {
    axios.get('http://localhost:8081/v1/type/get')
      .then(response => setCategories(response.data))
      // เมื่อดึงข้อมูลสำเร็จ ให้ตั้งค่า `categories` ด้วยข้อมูลที่ได้จาก API
      .catch(error => console.error("Error fetching categories:", error));
    // แสดงข้อผิดพลาดหากการเรียก API ล้มเหลว
  }, []);

  const addCategory = async (category) => {
    // ฟังก์ชันเพิ่มหมวดหมู่ใหม่
    try {
      const response = await axios.post('http://localhost:8081/v1/type/add', { type: category });
      // ส่งคำขอ POST ไปยัง API พร้อมข้อมูลหมวดหมู่ที่ต้องการเพิ่ม

      if (response.data && response.data.type) {
        // ตรวจสอบว่าคำตอบจาก API มีข้อมูลหมวดหมู่ใหม่
        setCategories((prev) => [...prev, response.data.type]);
        // เพิ่มหมวดหมู่ใหม่ใน state `categories`

        setShowType(false);
        // ซ่อนหน้าต่างเพิ่มหมวดหมู่

        setIsEditing(false);
        // ปิดสถานะการแก้ไข

        triggerRefresh();
        // กระตุ้นการรีเฟรชข้อมูล
      } else {
        console.error('Invalid response data:', response.data);
        // แจ้งข้อผิดพลาดหากคำตอบจาก API ไม่ถูกต้อง
      }
    } catch (error) {
      console.error("Error adding category:", error);
      // แสดงข้อผิดพลาดเมื่อการเพิ่มล้มเหลว
    }
  };

  const editCategory = async (category, index) => {
    // ฟังก์ชันแก้ไขหมวดหมู่
    const typeID = categories[index].typeID;
    // ดึง `typeID` ของหมวดหมู่ที่ต้องการแก้ไข

    try {
      const response = await axios.put(`http://localhost:8081/v1/type/edit/${typeID}`, { type: category });
      // ส่งคำขอ PUT ไปยัง API พร้อมข้อมูลใหม่ของหมวดหมู่

      const updatedCategories = [...categories];
      // สร้างสำเนาของ `categories`

      updatedCategories[index] = response.data.type;
      // อัปเดตหมวดหมู่ที่ตำแหน่งที่แก้ไขด้วยข้อมูลใหม่

      setCategories(updatedCategories);
      // ตั้งค่า `categories` ใหม่ด้วยข้อมูลที่อัปเดตแล้ว

      setShowType(false);
      // ซ่อนหน้าต่างแก้ไขหมวดหมู่

      setIsEditing(false);
      // ปิดสถานะการแก้ไข

      setEditIndex(null);
      // รีเซ็ต index ของหมวดหมู่ที่แก้ไข

      if (setIsEditing) {
        triggerRefresh();
        // กระตุ้นการรีเฟรชข้อมูล
      }
    } catch (error) {
      console.error("Error editing category:", error);
      // แสดงข้อผิดพลาดเมื่อการแก้ไขล้มเหลว
    }
  };

  const deleteCategory = async (index) => {
    // ฟังก์ชันลบหมวดหมู่
    const typeID = categories[index].typeID;
    // ดึง `typeID` ของหมวดหมู่ที่ต้องการลบ

    try {
      await axios.delete(`http://localhost:8081/v1/type/delete/${typeID}`);
      // ส่งคำขอ DELETE ไปยัง API เพื่อลบหมวดหมู่

      setCategories(categories.filter((_, idx) => idx !== index));
      // ลบหมวดหมู่ที่เลือกออกจาก state `categories`

      setShowType(false);
      // ซ่อนหน้าต่างแก้ไขหมวดหมู่

      setIsEditing(false);
      // ปิดการแก้ไข

      setEditIndex(null);
      // รีเซ็ต index ของหมวดหมู่ที่แก้ไข

      if (setIsEditing) {
        triggerRefresh();
        // การรีเฟรชข้อมูล
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      // แสดงข้อผิดพลาดเมื่อการลบล้มเหลว
    }
  };
  return (
    <div>
      {showType && (
        // แสดงหน้าต่าง Type สำหรับเพิ่มหรือแก้ไขหมวดหมู่เมื่อ `showType` มีค่าเป็น true
        <>
          <div
            className="overlay"
            onClick={() => {
              // เมื่อคลิกที่พื้นที่นอกหน้าต่าง Type
              setShowType(false); // ซ่อนหน้าต่าง Type
              setIsEditing(false); // ปิดสถานะแก้ไข
            }}
          ></div>
          <Type
            onConfirm={editIndex === null ? addCategory : (category) => editCategory(category, editIndex)}
            // หาก `editIndex` เป็น null แสดงว่าอยู่ในโหมดเพิ่มหมวดหมู่ (ใช้ `addCategory`)
            // หากไม่เป็น null แสดงว่าอยู่ในโหมดแก้ไขหมวดหมู่ (ใช้ `editCategory`)

            onDelete={editIndex !== null ? () => deleteCategory(editIndex) : null}
            // หากอยู่ในโหมดแก้ไข จะส่งฟังก์ชันลบ `deleteCategory` ไปยัง Component Type

            onClose={() => {
              // เมื่อปิดหน้าต่าง Type
              setShowType(false); // ซ่อนหน้าต่าง Type
              setIsEditing(false); // ปิดสถานะแก้ไข
              setEditIndex(null); // รีเซ็ต index ของหมวดหมู่ที่กำลังแก้ไข
            }}
            initialValue={editIndex !== null ? categories[editIndex]?.type : ''}
          // หากอยู่ในโหมดแก้ไข ให้ส่งค่าประเภทหมวดหมู่ที่แก้ไขเป็นค่าเริ่มต้น
          // ถ้าไม่อยู่ในโหมดแก้ไข ให้ส่งค่าว่าง
          />
        </>
      )}

      <div className="tabbar">
        <div className="left-buttons">
          <div
            className={`type-product ${activeType === '' ? 'active' : ''}`}
            // เพิ่มคลาส `active` เมื่อ `activeType` เป็นค่าว่าง (เลือก "ทั้งหมด")
            onClick={() => {
              setActiveType(''); // รีเซ็ต `activeType` เป็นค่าว่าง (เลือก "ทั้งหมด")
              onCategorySelect(''); // เรียก callback `onCategorySelect` พร้อมค่าว่าง
            }}
          >
            <span>ทั้งหมด</span>
          </div>

          {categories.map((category, index) => (
            <div
              key={index}
              // กำหนด `key` เป็น `index` เพื่อระบุ element ในการเรนเดอร์รายการ
              className={`type-product ${activeType === category.type ? 'active' : ''}`}
              // เพิ่มคลาส `active` หาก `activeType` ตรงกับประเภทสินค้านั้น
              onClick={() => {
                if (isEditing) {
                  // ถ้าอยู่ในโหมดแก้ไข
                  setEditIndex(index); // บันทึกตำแหน่ง index ของหมวดหมู่ที่เลือก
                  setShowType(true); // เปิดหน้าต่าง Type
                } else {
                  // ถ้าไม่ได้อยู่ในโหมดแก้ไข
                  setActiveType(category.type); // อัปเดต `activeType` เป็นหมวดหมู่ที่เลือก
                  onCategorySelect(category.type); // เรียก callback `onCategorySelect` พร้อมประเภทที่เลือก
                }
              }}
            >
              <span>{category.type}</span>
              {/* แสดงชื่อประเภทหมวดหมู่ */}
            </div>
          ))}
        </div>

        <div
          className="tabber-increase"
          onClick={() => { //คริก +
            setShowType(true); // เปิดหน้าต่าง Type
            setIsEditing(true); // เปิดสถานะแก้ไข
          }}
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );

}

export default Tabbar; 
