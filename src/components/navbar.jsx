import React from 'react';
import '../css/navbar.css'; // สไตล์ของ navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">ขายสินค้า</li>
        <li className="navbar-item">จัดการเมนู</li>
        <li className="navbar-item">สรุปยอดขาย</li>
        <li className="navbar-item navbar-user">นายผู้จัดการ</li>
        <li className="navbar-item navbar-logout">ออกจากระบบ</li>
      </ul>
    </nav>
  );
};

export default Navbar;
