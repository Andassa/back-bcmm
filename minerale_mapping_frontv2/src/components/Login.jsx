import React from "react";
import './css/Login.css';
import Carte from './component/carteLog';

const Login = () => {

    return (
        <div>
            <div className="logo" >
                <img src="/bcmm.png" alt="Logo" height="55px" />
            </div>
            <center>
                <Carte />
            </center>
        </div>
    );
};

export default Login;