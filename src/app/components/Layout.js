import "./normalize.css";
import "../styles/common.scss";

import React from "react";
import Header from "./header";
import Footer from "./footer/Footer";
import Preloader from "./preloader/Preloader";

class Layout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
        location: React.PropTypes.object.isRequired
    }
    render() {
        return (
            <div>
                <Preloader />
                <Header location={this.props.location} />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Layout;