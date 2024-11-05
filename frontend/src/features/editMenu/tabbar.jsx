import React from 'react';
import '../css/tabbar.css';  

function Tabbar() {
  return (
    <div className="tabbar">
      <div className="left-buttons">
        <button>Burger</button>
        <button>Appetizers</button>
        <button>Drink</button>
        <button>Dessert</button>
      </div>
    </div>
  );
}

export default Tabbar;
