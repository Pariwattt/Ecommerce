import React from 'react';
import '../css/report.css'
import { useNavigate } from "react-router-dom";

const Reportday = () => {
  const navigate = useNavigate();
  return (
    
    <div >
      
      <div className="box1"></div>
      <input type="date" name="dob" id="dob" />
        <div className='report-header'>รายงานการขาย - Sales Report</div>
          <button className='color report-headers'>ยอดขายรายวัน</button> 
          <button className='color1 report-headers1' onClick={() => navigate('/month')}>ยอดขายรายเดือน</button>
          <button className='color1 report-headers2' onClick={() => navigate('/redata')}>สถิติการขาย</button>
          <button className="Report-headers" onClick={() => navigate('/')}>ย้อนกลับ</button>
          
        </div>
        
  );
};

export default Reportday;
