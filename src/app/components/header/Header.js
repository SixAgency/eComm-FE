import "./header.scss";

import React, { PropTypes } from "react";
import cx from "classnames";
import Logo from "./logo/Logo";
import Navigation from "./navigation/Navigation";

class Header extends React.PureComponent {
    static propTypes = {
        headerClass: PropTypes.string.isRequired,
        hoverClass: PropTypes.string,
        stickyClass: PropTypes.string,
        navItems: PropTypes.array.isRequired,
        onHoverStart: PropTypes.func.isRequired,
        onHoverEnd: PropTypes.func.isRequired
    }
    render() {
        return (
            <header
              className={cx(
                'header',
                this.props.headerClass,
                this.props.hoverClass,
                this.props.stickyClass
              )}
              onMouseEnter={this.props.onHoverStart}
              onMouseLeave={this.props.onHoverEnd}
            >
                <div className="logo-container">
                    <Logo />
                </div>
                <div className="navigation-container">
                    <Navigation navItems={this.props.navItems} />
                </div>
            </header>
        );
    }
}

export default Header;