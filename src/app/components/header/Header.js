import "./header.scss";

import React from "react";
import Logo from "./logo/Logo";
import Navigation from "./navigation/Navigation";

class Header extends React.Component {
    static propTypes = {
        location: React.PropTypes.object.isRequired
    }
    render() {
        return (
            <div id="header" className="transparent">
                <Logo />
                <div id="navigation">
                    <Navigation location={this.props.location} />
                </div>
            </div>
        );
    }
}

export default Header;