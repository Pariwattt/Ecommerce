import React from "react";
import '../css/home.css'
import { useNavigate } from "react-router-dom";

const home = () => {
    const Navigate = useNavigate()
    return (
        <nav>
            <div className="button-container button-center">
                <button className="custom-button button-order" onClick={() => Navigate('/order')}>
                    <a href="#">order</a>
                </button>
            </div>
            <br />
            <div className="button-row">
                <button className="custom-button button-report" onClick={() => Navigate('/report')}>
                    <a href="#">report</a>
                </button>
                <button className="custom-button button-report" onClick={() => Navigate('/settings')}>
                    <a href="#">settings</a>
                </button>
            </div>
            <br /><br /> <br />

            <div>
                <button className="custom-button button-logout button-bottom-right">
                    <a href="#">Log out</a>
                </button>

            </div>
        </nav>
    );
};

export default home
