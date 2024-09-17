import React, { useState } from 'react';
import '../css/menu.css';
import { useNavigate } from 'react-router-dom';


// คอมโพเนนต์สำหรับการจัดการเมนู
const Menu = ({ addItemToCart, addNewMenuItem, menuItems, deleteMenuItem }) => {
  const [searchTerm, setSearchTerm] = useState(''); // คำค้นหาสำหรับกรองเมนู
  const [showAddMenuForm, setShowAddMenuForm] = useState(false); // การแสดงหรือซ่อนฟอร์มเพิ่มเมนู
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '' }); // ข้อมูลเมนูใหม่
  const [isManaging, setIsManaging] = useState(false); // โหมดการจัดการเมนู (เปิด/ปิด)

  // ฟิลเตอร์เมนูตามคำค้นหา
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ฟังก์ชันสำหรับอัปเดตข้อมูลเมนูใหม่
  const handleNewMenuChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // ฟังก์ชันสำหรับเพิ่มเมนูใหม่
  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      addNewMenuItem(newMenuItem); // เพิ่มเมนูใหม่
      setNewMenuItem({ name: '', price: '' }); // รีเซ็ตฟอร์มหลังเพิ่มเมนู
      setShowAddMenuForm(false); // ซ่อนฟอร์มหลังเพิ่มเมนู
    }
  };

  return (
    <div className="menu">
      <div className="menu-header">
        <div>MENU</div>
        <input
          type="text"
          id="search"
          placeholder="ค้นหาเมนู"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} // อัปเดตคำค้นหาตามที่ป้อน
        />
        <button className={`manage-menu ${isManaging ? 'active' : ''}`} onClick={() => setIsManaging(!isManaging)}>
          {isManaging ? "ยกเลิกการจัดการ" : "การจัดการ"}
        </button>
      </div>
      <div className="menu-grid">
        {filteredItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <div onClick={() => addItemToCart(item)}>
              {item.name} {item.price}฿
            </div>
            {isManaging && (
              <button className="delete-button" onClick={() => deleteMenuItem(index)}>
                ลบ
              </button>
            )}
          </div>
        ))}

        {/* ปุ่มสำหรับเพิ่มเมนูใหม่ */}
        <div className="menu-item add-menu" onClick={() => setShowAddMenuForm(true)}>
          เพิ่มMENU
        </div>

        {/* ฟอร์มสำหรับเพิ่มเมนูใหม่ */}
        {showAddMenuForm && (
          <div className="menu-item add-menu-form">
            <input
              type="text"
              name="name"
              placeholder="ชื่อเมนู"
              value={newMenuItem.name}
              onChange={handleNewMenuChange} // อัปเดตข้อมูลเมนูใหม่
            />
            <input
              type="number"
              name="price"
              placeholder="ราคา"
              value={newMenuItem.price}
              onChange={handleNewMenuChange} // อัปเดตข้อมูลราคา
            />
            <button onClick={handleAddMenuItem}>เพิ่ม</button>
            <button onClick={() => setShowAddMenuForm(false)}>ยกเลิก</button>
          </div>
        )}
      </div>
    </div>
  );
};

// คอมโพเนนต์สำหรับการจัดการตะกร้าสินค้า
const Cart = ({ cart, removeItemFromCart, total, discount, setDiscount }) => {
  // คำนวณยอดรวมหลังหักส่วนลด
  const finalTotal = total - (total * (parseFloat(discount) || 0)) / 100;
  const navigate = useNavigate(); // นำทางไปยังหน้า "/about"
  // ฟังก์ชันสำหรับอัปเดตส่วนลด
  const handleDiscountChange = (e) => {
    let value = e.target.value;

    if (value.startsWith('0')) {
      value = value.slice(1);
    }

    // ตรวจสอบค่าที่ป้อนเพื่อให้เป็นระหว่าง 1-100 หรือเป็นค่าว่าง
    if (value === '' || (parseFloat(value) >= 1 && parseFloat(value) <= 100)) {
      setDiscount(value);
    }
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <span>โต๊ะ...</span>
      </div>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>{item.price * item.quantity}</span>
            <span className="remove" onClick={() => removeItemFromCart(index)}>
              x
            </span>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <span>{cart.length} รายการ</span>
        <span>ยอดรวม {total} บาท</span>
        <div>
          <label htmlFor="discount">ส่วนลด (%) :</label>
          <input
            type="number"
            id="discount"
            min="1"
            max="100"
            value={discount}
            onChange={handleDiscountChange} // อัปเดตส่วนลด
            placeholder="เปอร์เซ็นต์"
          />
        </div>
        <br />
        <span>ยอดรวมหลังหักส่วนลด {finalTotal.toFixed(2)} บาท</span>
      </div>
      <div className="checkout-buttons">
        <button className="cancel" onClick={() => navigate('/order')}>ย้อนกลับ</button>
        <button className="checkout" onClick={() => navigate('/getmoney')}>ชำระเงิน</button>
      </div>
    </div>
  );
};

// คอมโพเนนต์หลักของแอพ
const App = () => {
  const [cart, setCart] = useState([]); // สถานะของตะกร้าสินค้า
  const [total, setTotal] = useState(0); // สถานะยอดรวม
  const [discount, setDiscount] = useState(''); // สถานะส่วนลด
  const [menuItems, setMenuItems] = useState([ // สถานะของเมนู
    { name: 'ข้าวผัดกุ้ง', price: 45 },
    { name: 'น้ำส้ม', price: 15 },
    { name: 'ลูกชิ้น', price: 10 },
  ]);

  // ฟังก์ชันสำหรับเพิ่มรายการลงในตะกร้า
  const addItemToCart = item => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      setCart(
        cart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    setTotal(total + item.price); // อัปเดตยอดรวม
  };

  // ฟังก์ชันสำหรับเพิ่มเมนูใหม่
  const addNewMenuItem = (item) => {
    setMenuItems([...menuItems, { ...item, price: parseFloat(item.price) }]);
  };

  // ฟังก์ชันสำหรับลบเมนู
  const deleteMenuItem = (index) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  // ฟังก์ชันสำหรับลบรายการจากตะกร้า
  const removeItemFromCart = index => {
    const item = cart[index];
    setTotal(total - item.price * item.quantity); // อัปเดตยอดรวม
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <Menu 
        addItemToCart={addItemToCart} 
        addNewMenuItem={addNewMenuItem} 
        menuItems={menuItems} 
        deleteMenuItem={deleteMenuItem} // ส่งฟังก์ชันลบเมนู
      />
      <Cart
        cart={cart}
        total={total}
        discount={discount}
        setDiscount={setDiscount}
        removeItemFromCart={removeItemFromCart}
      />
    </div>
  );
};

export default App;
