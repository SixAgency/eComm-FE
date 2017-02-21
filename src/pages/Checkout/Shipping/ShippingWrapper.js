import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';
import BasePageComponent from '../../BasePageComponent';
import Shipping from './Shipping';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getCart, applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { getCheckoutShipping, setCheckoutShipping, checkoutAddresses } from '../../../actions/checkout';
import { forwardTo } from '../../../actions/handler';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
    getCheckoutShipping: (loggedIn, cart) => dispatch(getCheckoutShipping(loggedIn, cart)),
    setCheckoutShipping: (address) => dispatch(setCheckoutShipping(address)),
    checkoutAddresses: (data) => dispatch(checkoutAddresses(data))
  }
));

const mapStateToProps = ((state) => (
  {
    cartState: state.checkout.cartState,
    cartItems: state.cart.cartItems,
    shipping: state.checkout.shipping,
    billing: state.checkout.billing,
    loggedIn: state.user.loggedIn,
    emailAddress: state.user.emailAddress,
    messages: state.page.messages,
    isError: state.page.isError,
    isPayPal: state.checkout.isPayPal
  }
));

class ShippingWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartState: PropTypes.string.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    shipping: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    emailAddress: PropTypes.string.isRequired,
    getCheckoutShipping: PropTypes.func.isRequired,
    setCheckoutShipping: PropTypes.func.isRequired,
    checkoutAddresses: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    route: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'shipping',
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide'
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
    if (!this.props.cartItems.isLoaded) {
      this.props.getCart();
    }
    if (!this.props.shipping.isLoaded && this.props.cartItems.isLoaded) {
      const loggedIn = this.props.loggedIn;
      const { cart } = this.props.cartItems;
      this.props.getCheckoutShipping(loggedIn, cart);
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    const shippingLoaded = nextProps.shipping.isLoaded;
    const cartLoaded = nextProps.cartItems.isLoaded;
    if (!shippingLoaded && cartLoaded) {
      const loggedIn = this.props.loggedIn;
      const { cart } = nextProps.cartItems;
      this.props.getCheckoutShipping(loggedIn, cart);
    }
    if (cartLoaded && shippingLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  };

  clickTab = (e) => {
    e.preventDefault();
    const target = e.target.id;
    forwardTo(`checkout/${target}`);
  };

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      couponClassName: !this.state.showCouponFields ? 'show' : 'hide'
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      showLoginFields: !this.state.showLoginFields,
      loginClassName: !this.state.showLoginFields ? 'show' : 'hide'
    });
  };

  getContentTabs = () => {
    const contentTabs = [
      {
        name: 'Billing Address',
        title: 'Billing Address',
        cname: 'billing',
        id: 'billing'
      },
      {
        name: 'Shipping Address',
        title: 'Shipping Address',
        cname: 'shipping',
        id: 'shipping'
      },
      {
        name: 'Apply Promotional Code',
        title: 'Apply Promotional Code',
        cname: 'promocode',
        id: 'promo'
      },
      {
        name: 'Review Order',
        title: 'Review Order',
        cname: 'review',
        id: 'review'
      }
    ];

    return contentTabs;
  };

  onSubmit = (shipping) => {
    this.props.toggleLoader(true);
    // const success = this.props.setCheckoutShipping(shipping);
    const data = {
      order: {
        bill_address_attributes: this.props.billing.address,
        ship_address_attributes: shipping
      },
      isPayPal: this.props.isPayPal
    };
    this.props.checkoutAddresses(data);
  };

  render() {
    if (!this.props.shipping.isLoaded) {
      return null;
    }
    return (
      <Shipping
        loggedIn={this.props.loggedIn}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.couponClassName}
        handleLogin={this.handleLogin}
        loginClass={this.state.loginClassName}
        clickTab={this.clickTab}
        content={this.state.content}
        messages={this.props.messages}
        isError={this.props.isError}
        applyPromoCode={this.props.applyPromoCode}
        contentTabs={CHECKOUT_TABS}
        shippingAddress={this.props.shipping.address}
        onSubmit={this.onSubmit}
        emailAddress={this.props.emailAddress}
        breadcrumbs={this.props.route.breadcrumbs}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingWrapper);

