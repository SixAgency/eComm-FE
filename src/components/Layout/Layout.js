import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LayoutContent from './LayoutContent';
import { getCart } from '../../actions/order';
import { checkLogin } from '../../actions/user';
import { toggleMobileNavigation, toggleLoader } from '../../actions/page';
import { checkoutNext } from '../../actions/checkout';
import { getProduct } from '../../actions/catalog';
import { forwardTo } from '../../actions/handler';
import { checkCartState } from '../../utils/utils';

const mapStateToProps = ((state) => (
  {
    showModal: state.page.showModal,
    modalContent: state.page.modalContent,
    headerProps: state.page.headerProps,
    showLoader: state.page.showLoader,
    cartItems: state.cart.cartItems,
    isCartPending: state.cart.isCartPending,
    showMobileNav: state.page.showMobileNav
  })
);
const mapDispatchToProps = ((dispatch) => (
  {
    getCart: (isNew) => dispatch(getCart(isNew)),
    checkLogin: () => dispatch(checkLogin()),
    toggleMobileNavigation: (value) => dispatch(toggleMobileNavigation(value)),
    checkoutNext: (fn) => dispatch(checkoutNext(fn)),
    toggleLoader: (toggle, image) => dispatch(toggleLoader(toggle, image)),
    getProduct: (slug) => dispatch(getProduct(slug))
  }
));

class Layout extends Component {

  static propTypes = {
    getCart: PropTypes.func.isRequired,
    headerProps: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    isCartPending: PropTypes.bool.isRequired,
    checkLogin: PropTypes.func.isRequired,
    checkoutNext: PropTypes.func.isRequired,
    showLoader: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    modalContent: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    showMobileNav: PropTypes.bool.isRequired,
    toggleMobileNavigation: PropTypes.func.isRequired,
    location: PropTypes.object,
    toggleLoader: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    this.props.checkLogin();
    if (!this.props.isCartPending && !this.props.cartItems.isLoaded) {
      this.props.getCart(false);
    }
  };

  componentWillUpdate = (nexProps) => {
    if (nexProps.location.pathname !== this.props.location.pathname) {
      this.props.toggleMobileNavigation(false);
    }
  };

  /**
   * Send next request if the order is in cart state
   * else we are good - redirecting to correct step
   */
  proceedToCheckout = (event) => {
    event.preventDefault();
    const state = checkCartState(this.props);
    if (state !== 'cart') {
      forwardTo(state);
    } else {
      this.props.checkoutNext(() => (forwardTo('checkout/shipping')));
    }
  };

  mobileNavOpen = (event) => {
    event.preventDefault();
    this.props.toggleMobileNavigation(true);
  };

  mobileNavClose = (event) => {
    event.preventDefault();
    this.props.toggleMobileNavigation(false);
  };

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
        proceedToCheckout={this.proceedToCheckout}
        layoutStyles={{ opacity: 1 }}
        showLoader={this.props.showLoader}
        showModal={this.props.showModal}
        modalContent={this.props.modalContent}
        toggleLoader={this.props.toggleLoader}
        getProduct={this.props.getProduct}
      >{this.props.children}</LayoutContent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
