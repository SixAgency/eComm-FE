import React from "react";
import { Link } from "react-router";

import "./navigation.scss";

class Navigation extends React.Component {

    static propTypes = {
        location: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentStyles: {}
        };
    }

    getCurrentStyles = () => {
        let currentStyles = {};
        Array.from(this.node.childNodes).map(function(el){
            if (el.className == "active") {
                currentStyles = {
                    left: el.offsetLeft,
                    width: el.offsetWidth
                };
            }
        });

        return currentStyles;
    }

    onNavHover = (e) => {
        let currentStyles = {
            width: e.target.parentElement.offsetWidth,
            left: e.target.parentElement.offsetLeft,
            display: "block"

        };
        this.setState({
            currentStyles: currentStyles
        });
        e.preventDefault;
    }

    onHoverEnd = () => {
        this.setState({
            currentStyles: this.getCurrentStyles()
        });
    }

    componentDidMount = () => {
        this.setState({
            currentStyles: this.getCurrentStyles()
        });
    }

    render() {
        // const navItems = [
        //     {
        //         isActive: (location) => location.pathname === '/',
        //         url: '/home',
        //         label: 'Home'
        //     },
        //     {
        //         url: '/product',
        //         label: 'Product'
        //     }];

        // return(
        //     <ul>
        //         {navItems.map((item) => {
        //             const isActive = location.pathname.match(item.url) ||
        //                 (item.isActive && item.isActive(location));

        //             return(
        //                 <li className={cx({active: isActive})}>

        //                 </li>
        //             );
        //         });}
        //     </ul>
        // );

        const { location } = this.props;
        const homeClass = location.pathname === "/" ? "active" : "";
        const educationClass = location
                                    .pathname
                                    .match(/^\/product/) ? "active" : "";
        const biographyClass = location
                                    .pathname
                                    .match(/^\/biography/) ? "active" : "";
        const myAccountClass = location
                                    .pathname
                                    .match(/^\/my-account/) ? "active" : "";
        const contactClass = location
                                    .pathname
                                    .match(/^\/contact/) ? "active" : "";
        return (
            <ul className="navigation white" ref={c => this.node = c} >
                <li 
                  className={homeClass} 
                  onMouseEnter={this.onNavHover}
                  onMouseLeave={this.onHoverEnd}>
                    <Link to="/">Shop</Link>
                    <div className="topLine" />
                </li>
                <li 
                  className={educationClass}
                  onMouseEnter={this.onNavHover}
                  onMouseLeave={this.onHoverEnd}
                >
                    <Link to="/product/mentoring-program-day">Education</Link>
                    <div className="topLine" />
                </li>
                <li 
                  className={biographyClass}
                  onMouseEnter={this.onNavHover}
                  onMouseLeave={this.onHoverEnd}>
                    <Link to="/biography">Biography</Link>
                    <div className="topLine" />
                </li>
                <li
                  className={myAccountClass}
                  onMouseEnter={this.onNavHover}
                  onMouseLeave={this.onHoverEnd}>
                    <Link to="/my-account">My Account</Link>
                    <div className="topLine" />
                </li>
                <li 
                  className={contactClass}
                  onMouseEnter={this.onNavHover}
                  onMouseLeave={this.onHoverEnd}>
                    <Link to="/contact">Contact</Link>
                    <div className="topLine" />
                </li>
                <li className="current" style={this.state.currentStyles} />
            </ul>
        );
    }
}

export default Navigation;