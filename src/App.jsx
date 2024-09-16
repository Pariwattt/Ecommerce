import { useState } from 'react'
import './App.css'
import Nav from './components/home'
import Order from './components/order'
import Report from './components/report'
import Settings from './components/settings'
import Getmoney from './components/getmoney'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Nav/>}/>
        <Route path='/Order' element={<Order/>}/>
        <Route path='/Report' element={<Report/>}/>
        <Route path='/settings' element={<Settings/>}/>

        <Route path='/getmoney' element={<Getmoney/>}/>
      </Routes>
    </Router>
  );
}

export default App
