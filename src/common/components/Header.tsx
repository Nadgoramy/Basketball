import React from "react";
import logo from  "../../asserts/images/logo.svg"

const Header = (props:any ) =>{
    return (
        <div className="header">
            <div className="logoContainer"> 
            <img src={logo}/>
            </div>
        </div>
    );
}

export default Header;