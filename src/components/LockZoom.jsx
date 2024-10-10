import React, { useEffect } from 'react';

const PreventZoom = ({ children }) => {

  // ฟังก์ชันที่ป้องกันการซูมด้วยคีย์บอร์ด
  const preventZoomKeys = (e) => {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
      e.preventDefault(); // ป้องกันการซูม
    }
  };

  // ฟังก์ชันที่ป้องกันการซูมจากเมาส์ (Ctrl + Scroll)
  const preventZoomMouse = (e) => {
    if (e.ctrlKey) {
      e.preventDefault(); // ป้องกันการซูมจากการ Scroll เมื่อกด Ctrl
    }
  };

  useEffect(() => {
    document.body.style.zoom = "100%";
    // จับเหตุการณ์ keydown และ wheel เมื่อคอมโพเนนต์ mount
    window.addEventListener('keydown', preventZoomKeys);
    window.addEventListener('wheel', preventZoomMouse, { passive: false });

    // ลบ event listener เมื่อคอมโพเนนต์ unmount
    return () => {
      window.removeEventListener('keydown', preventZoomKeys);
      window.removeEventListener('wheel', preventZoomMouse);
    };
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default PreventZoom;
