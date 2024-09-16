import React from "react";
import '../css/home.css'

const home = () =>{
    return (
        <nav> 
            <div className="button-container button-center">
                <button className="custom-button button-order">
                    <a href="#">สินค้า</a> 
                </button>
            </div>        
            <br/>
            <div className="button-row">
                <button className="custom-button button-report">
                    <a href="#">รายงานขาย</a>
                </button>
                <button className="custom-button button-report">
                    <a href="#">ตั้งค่า</a>
                </button>
            </div>
            <br /><br/> <br />

            <div>
                <button className="custom-button button-logout button-bottom-right">
                    <a href="#">Log out</a>
                </button>
                    
            </div>
        </nav>
    );
};

export default home
