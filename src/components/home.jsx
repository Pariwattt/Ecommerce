import React from "react";
import '../css/home.css'
import { useNavigate } from "react-router-dom";

const home = () => {
    const Navigate = useNavigate()
    return (
        <nav>
            <div className="botton-container botton-center">
                <button className="custom-botton botton-order" onClick={() => Navigate('/order')}>
                    <a href="#">order</a>
                </button>
            </div>
            <br />
            <div className="button-row">
                <button className="custom-botton botton-report" onClick={() => Navigate('/reportday')}>
                    <a href="#">report</a>
                </button>
                <button className="custom-botton botton-report" onClick={() => Navigate('/settings')}>
                    <a href="#">settings</a>
                </button>
            </div>
            <br /><br /> <br />

            <div>
                <button className="custom-botton botton-logout botton-bottom-right">
                    <a href="#">Log out</a>
                </button>

            </div>
        </nav>
    );
};

export default home
