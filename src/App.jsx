import { useState } from 'react'
import './App.css'
import Foot from '../src/components/footbar'
import Nav from '../src/components/navbar'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Foot/>}/>
      </Routes>
      <Routes>
        <Route path='/' element={<Nav/>}/>
      
      </Routes>
    </Router>
  );
}

export default App
