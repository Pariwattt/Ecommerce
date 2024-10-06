import React from 'react';
import '../css/edit.css';  // นำเข้าไฟล์ CSS
import Navbar from './navbar';  // นำเข้าคอมโพเนนต์ Navbar
import Footbar from './footbar';  // นำเข้า Footbar
import Tabbar from './tabbar';

function App() {
    // กำหนดตำแหน่งที่ต้องการสำหรับกล่องแต่ละใบ
    const positions = [
        { top: 110, left: 1000},
        { top: 110, left: 1500 },
        { top: 200, left: 1000 },
        { top: 290, left: 1000 },
        // เพิ่มตำแหน่งอื่นๆ ได้ตามต้องการ
    ];

    // สร้างตำแหน่งสำหรับกล่องสี่เหลี่ยม
    const boxPositions = [];
    const boxHeight = 90; // ความสูงของกล่อง
    const boxWidth = 160; // ความกว้างของกล่อง
    const gap = 20; // ระยะห่างระหว่างกล่อง
    const startTop = 400 + 120; // ตำแหน่งเริ่มต้นจาก Tabbar

    for (let i = 0; i < 27; i++) {
        const rowCount = Math.floor(i / 10); // คำนวณจำนวนแถวที่ควรเริ่มต้น
        const topPosition = startTop + rowCount * (boxHeight + gap); // คำนวณตำแหน่งสูงตามแถว
        const leftPosition = 50 + (i % 10) * (boxWidth + gap); // คำนวณตำแหน่งซ้ายตามคอลัมน์
        boxPositions.push({ top: topPosition, left: leftPosition });
    }

    return (
        <div>
            <Navbar />
            <Footbar />
            <Tabbar/>

            <div className="edit-img_box"></div>
            {positions.map((pos) => (
                <div 
                    className="text-edit-box" 
                    style={{ top: `${pos.top}px`, left: `${pos.left}px`, position: 'absolute' }}
                >  
                </div>
            ))}
            {/* สร้างกล่องสี่เหลี่ยม */}
            {boxPositions.map((pos, index) => (
                <div
                    key={index}
                    className="square-box"
                    style={{ top: `${pos.top}px`, left: `${pos.left}px`, position: 'absolute', width: '160px', height: '90px' }}
                >
                    {`Box ${index + 1}`}
                </div>
            ))}

            {/* ปุ่มยืนยันอยู่ด้านล่างกล่องข้อความสุดท้าย */}
            <div className="button-center" style={{ position: 'absolute', top: '350px', left: '1200px' }}>
                <button className="confirm-button button-confirm-sub">
                    Confirm
                </button>
                <button className="cancel-button button-confirm-sub" style={{ marginLeft: '100px' }}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default App;
