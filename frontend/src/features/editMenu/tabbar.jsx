import React, { useState, useEffect } from 'react';
import '../css/tabbar.css';
import { FaPlus } from 'react-icons/fa';
import Type from './type';
import axios from 'axios';

function Tabbar({ onCategorySelect }) {
  const [showType, setShowType] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeType, setActiveType] = useState(''); // Track selected type

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/v1/type/get');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await axios.post('http://localhost:8081/v1/type/add', { type: category });
      setCategories((prev) => [...prev, response.data.type]);
      setShowType(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const editCategory = async (category, index) => {
    const typeID = categories[index].typeID;
    try {
      const response = await axios.put(`http://localhost:8081/v1/type/edit/${typeID}`, { type: category });
      const updatedCategories = [...categories];
      updatedCategories[index] = response.data.type;
      setCategories(updatedCategories);
      setShowType(false);
      setIsEditing(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const deleteCategory = async (index) => {
    const typeID = categories[index].typeID;
    try {
      await axios.delete(`http://localhost:8081/v1/type/delete/${typeID}`);
      setCategories(categories.filter((_, idx) => idx !== index));
      setShowType(false);
      setIsEditing(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setActiveType(category); // Set the active type
    onCategorySelect(category); // Call the parent callback
  };

  return (
    <div>
      {showType && (
        <>
          <div
            className="overlay"
            onClick={() => {
              setShowType(false);
              setIsEditing(false);
            }}
          ></div>
          <Type
            onConfirm={editIndex === null ? addCategory : (category) => editCategory(category, editIndex)}
            onDelete={editIndex !== null ? () => deleteCategory(editIndex) : null}
            onClose={() => {
              setShowType(false);
              setIsEditing(false);
              setEditIndex(null);
            }}
            initialValue={editIndex !== null ? categories[editIndex]?.type : ''}
          />
        </>
      )}

      <div className="tabbar">
        <div className="left-buttons">
          {/* "All" Button */}
          <div
            className={`type-product all-button ${activeType === '' ? 'active' : ''}`} // Highlight if active
            onClick={() => handleCategorySelect('')}
          >
            <span>ทั้งหมด</span>
          </div>
          {/* Category Buttons */}
          {categories.map((category, index) => (
            <div
              key={index}
              className={`type-product ${activeType === category.type ? 'active' : ''}`} // Highlight if active
              onClick={() => handleCategorySelect(category.type)}
            >
              <span>{category.type}</span>
            </div>
          ))}
        </div>
        {/* Add Category Button */}
        <div
          className="tabber-increase"
          onClick={() => {
            setShowType(true);
            setIsEditing(false);
          }}
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
}

export default Tabbar;
