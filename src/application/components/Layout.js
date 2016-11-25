import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Preloader from "./preloader/Preloader";

class Layout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired
    }
    render() {
        return (
            <div>
                <Preloader />
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );    
    }
}

export default Layout;