import React from "react";
import { Link } from "react-router";

class Logo extends React.Component {
    render() {
        return (
            <Link className="logo" to="/" />
        );
    }
}

export default Logo;