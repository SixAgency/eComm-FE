import "./normalize.css";
import "../styles/common.scss";

import React from "react";
import Header from "./header";
import Footer from "./footer/Footer";
import Preloader from "./preloader/Preloader";
import MobileNav from "./mobile/MobileNav";
import { connect } from  "react-redux";
import cx from "classnames";


const mapStateToProps = ((state) => {
    return { navOpened: state.navOpened };
});
class Layout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
        location: React.PropTypes.object.isRequired,
        navOpened: React.PropTypes.bool.isRequired
    }
    render() {
        return (
            <div>
                <div className={cx('layout', {'opened': this.props.navOpened})}>
                    <Preloader />
                    <Header location={this.props.location} />
                    {this.props.children}
                    <Footer />
                </div>
                <MobileNav location={this.props.location} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Layout);