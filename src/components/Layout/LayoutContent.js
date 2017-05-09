import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import MobileNavigation from '../MobileNavigation';
import Loader from '../Loader';
import CustomModal from '../CustomModal';

class LayoutContent extends Component {

  static propTypes = {
    headerClass: PropTypes.string.isRequired,
    activeSlug: PropTypes.string.isRequired,
    cartItems: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    mobileNavOpen: PropTypes.func.isRequired,
    mobileNavClose: PropTypes.func.isRequired,
    proceedToCheckout: PropTypes.func.isRequired,
    menuOpen: PropTypes.string.isRequired,
    showLoader: PropTypes.object.isRequired,
    layoutStyles: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    modalContent: PropTypes.string.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired
  };

  showLoader = () => {
    if (this.props.showLoader.toggle) {
      return (<Loader image={this.props.showLoader.image} />);
    }
    return null;
  };

  render() {
    return (
      <div className={s.layout}>
        <div className={s.layoutwrapper} style={this.props.layoutStyles}>
          <div className={cx(s.pagewrapper, s[this.props.menuOpen])}>
            <Header
              headerClass={this.props.headerClass}
              activeSlug={this.props.activeSlug}
              cartItems={this.props.cartItems}
              menuOpen={this.props.menuOpen}
              proceedToCheckout={this.props.proceedToCheckout}
              mobileNavOpen={this.props.mobileNavOpen}
              toggleLoader={this.props.toggleLoader}
              getProduct={this.props.getProduct}
            />
            {this.props.children}
            <Footer />
          </div>
          <MobileNavigation
            menuOpen={this.props.menuOpen}
            mobileNavClose={this.props.mobileNavClose}
            activeSlug={this.props.activeSlug}
            navClass="mobilenavigation"
          />
        </div>
        <CustomModal
          modalContent={this.props.modalContent}
          showModal={this.props.showModal}
        />
        { this.showLoader() }
      </div>
    );
  }
}

export default withStyles(s)(LayoutContent);
