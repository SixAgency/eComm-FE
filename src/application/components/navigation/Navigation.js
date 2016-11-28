import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { onNavItemHover } from "../../actions/generalActions";
import "./navigation.scss";

const mapStateToProps = ((state) => {
    return { currentStyles: state.currentStyles };
});
const mapDispatchToProps = ((dispatch) => {
    return {
        onHover: (styles) => dispatch(onNavItemHover(styles))
    };
});
class Navigation extends React.Component {
    static propTypes = {
        onHover: React.PropTypes.func,
        location: React.PropTypes.object.isRequired,
        currentStyles: React.PropTypes.object.isRequired
    }
    onNavHover = (e) => {
        let currentStyles = {
            width: e.target.parentElement.offsetWidth,
            left: e.target.parentElement.offsetLeft,
            display: "block"

        };
        this.props.onHover(currentStyles);
        e.preventDefault;
    }
    onHoverEnd = () => {
        let currentStyles = {};
        this.node.childNodes.forEach(function(el){
            if (el.className == "active") {
                currentStyles = {
                    left: el.offsetLeft,
                    width: el.offsetWidth
                };
            }
        });
        this.props.onHover(currentStyles);
    }
    componentDidMount = () => {
        this.onHoverEnd();
    }
    render() {
        const { location } = this.props;
        const homeClass = location.pathname === "/" ? "active" : "";
        const educationClass = location.pathname.match(/^\/product/) ? "active" : "";
        const biographyClass = location.pathname.match(/^\/biography/) ? "active" : "";
        const myAccountClass = location.pathname.match(/^\/my-account/) ? "active" : "";
        const contactClass = location.pathname.match(/^\/contact/) ? "active" : "";
        return (
            <ul className="navigation" ref={c => this.node = c} >
                <li className={homeClass} onMouseEnter={this.onNavHover} onMouseLeave={this.onHoverEnd}>
                    <Link to="/">Shop</Link>
                    <div className="topLine" />
                </li>
                <li className={educationClass} onMouseEnter={this.onNavHover} onMouseLeave={this.onHoverEnd}>
                    <Link to="/product/mentoring-program-day">Education</Link>
                    <div className="topLine" />
                </li>
                <li className={biographyClass} onMouseEnter={this.onNavHover} onMouseLeave={this.onHoverEnd}>
                    <Link to="/biography">Biography</Link>
                    <div className="topLine" />
                </li>
                <li className={myAccountClass} onMouseEnter={this.onNavHover} onMouseLeave={this.onHoverEnd}>
                    <Link to="/my-account">My Account</Link>
                    <div className="topLine" />
                </li>
                <li className={contactClass} onMouseEnter={this.onNavHover} onMouseLeave={this.onHoverEnd}>
                    <Link to="/contact">Contact</Link>
                    <div className="topLine" />
                </li>
                <li className="current" style={this.props.currentStyles} />
            </ul>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);