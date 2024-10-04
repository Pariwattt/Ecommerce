import React, { useState, useEffect } from 'react';
import '../css/footbar.css';  // นำเข้าไฟล์ CSS สำหรับ Footbar

function Footbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // อัปเดตเวลาทุกวินาที
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // ล้าง interval เมื่อคอมโพเนนต์ถูก unmounted
    return () => clearInterval(intervalId);
  }, []);

  const currentDate = currentTime.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('th-TH');

  return (
    <div className="footbar">
      <div className="footbar-left">
        {/* คุณสามารถเพิ่มเนื้อหาด้านซ้ายได้ เช่น ข้อมูลอื่นๆ */}
      </div>
      <div className="footbar-right">
        <span>{currentDate} {formattedTime}</span>
      </div>
    </div>
  );
}

export default Footbar;
