import { useState } from 'react'
import './App.css'
import Nav from './components/home'
import Order from './components/order'
import Reportday from './components/reportday'
import Settings from './components/settings'
import Getmoney from './components/getmoney'
import Menu from './components/Menu'
import Pay  from './components/pay'
import Month from './components/month';
import Redata from './components/redata';

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Nav/>}/>
        <Route path='/Order' element={<Order/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/Menu' element={<Menu/>}/>
        <Route path='/getmoney' element={<Getmoney/>}/>
        <Route path='/pay' element={<Pay/>}/>
        <Route path='/Reportday' element={<Reportday/>}/>
        <Route path='/Month' element={<Month/>}/>
        <Route path='/Redata' element={<Redata/>}/>
      </Routes>
    </Router>
  );
}

export default App
