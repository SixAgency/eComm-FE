import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Review from './Review';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getCart, applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { getAddress } from '../../../actions/address';
import { completePayPal } from '../../../actions/checkout';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
    getAddress: () => dispatch(getAddress()),
    completePayPal: () => dispatch(completePayPal()),
  }
));

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
    shipping: state.address.shipping,
    billing: state.address.billing,
    addresses: state.address.addresses,
    isPayPal: state.checkout.isPayPal,
  }
));

class ReviewWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    addressess: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    completePayPal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'review',
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide',
      message: PropTypes.string,
      isError: PropTypes.bool,
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (!this.props.cartItems.isLoaded) {
      this.props.getCart();
    }
    const billing = this.props.billing;
    const shipping = this.props.shipping;
    const addresses = this.props.addresses;
    if (!shipping.isLoaded && !billing.isLoaded && !addresses.isLoaded) {
      this.props.getAddress();
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    const { isLoaded } = nextProps.cartItems;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  };

  getContentTabs = () => {
    const contentTabs = [
      {
        name: 'Billing Address',
        title: 'Billing Address',
        cname: 'billing',
        id: 'billing',
      },
      {
        name: 'Shipping Address',
        title: 'Shipping Address',
        cname: 'shipping',
        id: 'shipping',
      },
      {
        name: 'Apply Promotional Code',
        title: 'Apply Promotional Code',
        cname: 'promocode',
        id: 'promo',
      },
      {
        name: 'Review Order',
        title: 'Review Order',
        cname: 'review',
        id: 'review',
      },
    ];

    return contentTabs;
  };

  nextTab = () => {
    switch (this.state.content) {
      case 'billing':
        this.setState({ content: 'shipping' });
        break;
      case 'shipping':
        this.setState({ content: 'promocode' });
        break;
      case 'promocode':
        this.setState({ content: 'review' });
        break;
      default: // do nothing
    }
  }

  clickTab = (e) => {
    e.preventDefault();
    this.setState({
      content: e.target.id,
    });
  };

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      couponClassName: !this.state.showCouponFields ? 'show' : 'hide',
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      showLoginFields: !this.state.showLoginFields,
      loginClassName: !this.state.showLoginFields ? 'show' : 'hide',
    });
  };

  render() {
    if (!this.props.cartItems.isLoaded) {
      return null;
    }
    const addresses = this.props.addresses;
    if (!this.props.billing.isLoaded && !this.props.shipping.isLoaded && !addresses.isLoaded) {
      return null;
    }
    const contentTabs = this.getContentTabs();
    return (
      <Review
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.couponClassName}
        handleLogin={this.handleLogin}
        loginClass={this.state.loginClassName}
        clickTab={this.clickTab}
        nextTab={this.nextTab}
        content={this.state.content}
        messages={this.props.messages}
        isError={this.props.isError}
        applyPromoCode={this.props.applyPromoCode}
        billingAddress={this.props.billing.address}
        shippingAddress={this.props.shipping.address}
        addresses={this.props.addresses.addresses}
        contentTabs={contentTabs}
        isPayPal={this.props.isPayPal}
        checkoutPayPal={this.props.completePayPal}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewWrapper);

