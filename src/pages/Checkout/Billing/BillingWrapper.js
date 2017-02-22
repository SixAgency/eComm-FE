import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';
import BasePageComponent from '../../BasePageComponent';
import Billing from './Billing';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getCart, applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { getCheckoutBilling, setCheckoutBilling } from '../../../actions/checkout';
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
    getCheckoutBilling: (loggedIn, cart) => dispatch(getCheckoutBilling(loggedIn, cart)),
    setCheckoutBilling: (address) => dispatch(setCheckoutBilling(address))
  }
));

const mapStateToProps = ((state) => (
  {
    cartState: state.checkout.cartState,
    cartItems: state.cart.cartItems,
    billing: state.checkout.billing,
    loggedIn: state.user.loggedIn,
    emailAddress: state.user.emailAddress,
    messages: state.page.messages,
    isError: state.page.isError
  }
));

class BillingWrapper extends BasePageComponent {

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
    billing: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    emailAddress: PropTypes.string.isRequired,
    getCheckoutBilling: PropTypes.func.isRequired,
    setCheckoutBilling: PropTypes.func.isRequired,
    route: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'billing',
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
    if (!this.props.billing.isLoaded && this.props.cartItems.isLoaded) {
      const loggedIn = this.props.loggedIn;
      const { cart } = this.props.cartItems;
      this.props.getCheckoutBilling(loggedIn, cart);
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    const billingLoaded = nextProps.billing.isLoaded;
    const cartLoaded = nextProps.cartItems.isLoaded;
    if (!billingLoaded && cartLoaded) {
      const loggedIn = this.props.loggedIn;
      const { cart } = nextProps.cartItems;
      this.props.getCheckoutBilling(loggedIn, cart);
    }
    if (cartLoaded && billingLoaded) {
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

  onSubmit = (data) => {
    this.props.setCheckoutBilling(data);
  };

  render() {
    if (!this.props.billing.isLoaded) {
      return null;
    }
    return (
      <Billing
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
        billingAddress={this.props.billing.address}
        onSubmit={this.onSubmit}
        emailAddress={this.props.emailAddress}
        breadcrumbs={this.props.route.breadcrumbs}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingWrapper);

