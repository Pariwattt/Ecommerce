import React from 'react';
import '../css/report.css'
import { useNavigate } from "react-router-dom";

const Report2 = () => {
  const navigate = useNavigate();
  return (
    
    <div >
      
      <div className="box1"></div>
      <input type="date" name="dob" id="dob" />
        <div className='report-header'>รายงานการขาย - Sales Report</div>
          <button className='color1 report-headers' onClick={() => navigate('/reportday')}>ยอดขายรายวัน</button> 
          <button className='color1 report-headers1' onClick={() => navigate('/reportmonth')}>ยอดขายรายเดือน</button>
          <button className='color report-headers2'>สถิติการขาย</button>
          <button className="Report-headers" onClick={() => navigate('/')}>ย้อนกลับ</button>
          
        </div>
        
  );
};

export default Report2;
