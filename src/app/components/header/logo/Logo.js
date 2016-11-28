import React from "react";
import { Link } from "react-router";
import "./logo.scss";

class Logo extends React.Component {
    render() {
        const logoIMG = require("./logo_white.png");
        return (
            <div className="logo-container">    
                <Link className="logo" to="/">
                    <img src={logoIMG} alt="Krissorbie" />
                </Link>
            </div>
        );
    }
}

export default Logo;