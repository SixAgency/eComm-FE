import React from "react";
import { Link } from "react-router";
import "./logo.scss";

class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container white">    
                <Link className="logo" to="/" />
            </div>
        );
    }
}

export default Logo;