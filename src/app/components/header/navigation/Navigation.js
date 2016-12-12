import React from "react";
import cx from "classnames";
import { Link } from "react-router";

class Navigation extends React.Component {

    static propTypes = {
        navItems: React.PropTypes.array.isRequired
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
        return(
            <ul
              className="navigation"
              ref={c => this.node = c}
            >
                {this.props.navItems.map((item) => {
                    return(
                        <li
                          key={item.id}
                          className={cx({ 'active': item.isActive })}
                          onMouseEnter={this.onNavHover}
                          onMouseLeave={this.onHoverEnd}>
                            <Link to={item.slug}>{item.title}</Link>
                            <div className="topLine" />
                        </li>
                    );
                })}
                <li className="current" style={this.state.currentStyles} />
            </ul>
        );
    }
}

export default Navigation;