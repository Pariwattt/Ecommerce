import React from 'react';
import './css/style.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuTest from './components/MenuTest.jsx'; // นำเข้าไฟล์ MenuTest.jsx ที่สร้างไว้
import About from './components/About.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuTest />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
