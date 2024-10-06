import React from 'react';
import '../css/pay.css'
import { useNavigate } from "react-router-dom";



const Pay =()=>{
    const Navigate = useNavigate()
    return(
        <div>
            <div className="box"></div>
            <button className="button-large" onClick={() => Navigate('../')}>ชำระเงินเสร็จสิ้น</button>
        </div>
    );
    
}


export default Pay;