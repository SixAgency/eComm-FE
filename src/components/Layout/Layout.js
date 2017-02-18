import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LayoutContent from './LayoutContent';
import { getCart } from '../../actions/order';
import { checkLogin } from '../../actions/user';
import { toggleMobileNavigation } from '../../actions/page';

const mapStateToProps = ((state) => (
  {
    headerProps: state.page.headerProps,
    showLoader: state.page.showLoader,
    cartItems: state.cart.cartItems,
    showMobileNav: state.page.showMobileNav
  })
);
const mapDispatchToProps = ((dispatch) => (
  {
    getCart: () => dispatch(getCart()),
    checkLogin: () => dispatch(checkLogin()),
    toggleMobileNavigation: (value) => dispatch(toggleMobileNavigation(value))
  }
));

class Layout extends Component {

  static propTypes = {
    getCart: PropTypes.func.isRequired,
    headerProps: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    checkLogin: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    showMobileNav: PropTypes.bool.isRequired,
    toggleMobileNavigation: PropTypes.func.isRequired,
    location: PropTypes.object
  };

  componentWillMount = () => {
    this.props.checkLogin();
    if (this.props.cartItems.isLoaded) {
      console.log('isLoaded');
    } else {
      this.props.getCart();
    }
  }

  componentWillUpdate = (nexProps) => {
    if (nexProps.location.pathname !== this.props.location.pathname) {
      this.props.toggleMobileNavigation(false);
    }
  }

  mobileNavOpen = (event) => {
    event.preventDefault();
    this.props.toggleMobileNavigation(true);
  }

  mobileNavClose = (event) => {
    event.preventDefault();
    this.props.toggleMobileNavigation(false);
  }

  render() {
    const { headerClass, activeSlug } = this.props.headerProps;
    return (
      <LayoutContent
        headerClass={headerClass}
        activeSlug={activeSlug}
        cartItems={this.props.cartItems}
        mobileNavOpen={this.mobileNavOpen}
        mobileNavClose={this.mobileNavClose}
        menuOpen={this.props.showMobileNav ? 'menuopen' : ''}
        layoutStyles={{ opacity: 1 }}
        showLoader={this.props.showLoader}
      >{this.props.children}</LayoutContent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
