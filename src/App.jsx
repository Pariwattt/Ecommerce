import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Css/style.css';
import './App.css';
import MenuTest from './Components/MenuTest.jsx';
import TestPage from './components/TestPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MenuTest />} /> {/* หน้าเมนู */}
          <Route path="/testpage" element={<TestPage />} /> {/* หน้า TestPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
