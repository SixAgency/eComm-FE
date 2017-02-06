import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkout from './Checkout';
// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { getCart } from '../../actions/order';
import { getAddress } from '../../actions/address';
import { onLogin, onLogout } from '../../actions/user';
import { checkoutNext, checkoutNextDelivery } from '../../actions/checkout';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    getAddress: () => dispatch(getAddress()),
    checkoutNext: () => dispatch(checkoutNext()),
    checkoutNextDelivery: (data) => dispatch(checkoutNextDelivery(data)),
  }
));
const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    loggedIn: state.user.loggedIn,
    message: state.page.message,
    isError: state.page.isError,
    shipping: state.address.shipping,
    billing: state.address.billing,
  }
));
class CheckoutWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    message: PropTypes.string,
    isError: PropTypes.bool,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    checkoutNext: PropTypes.func.isRequired,
    checkoutNextDelivery: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'billing',
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide',
      message: PropTypes.string,
      isError: PropTypes.bool,
      billingAddress: {},
      shippingAddress: {},
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
    if (!this.props.shipping.isLoaded && !this.props.billing.isLoaded) {
      this.props.getAddress();
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('next');
    const { isLoaded } = nextProps.cartItems;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
      // this.props.toggleLoader(false);
    }
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  }

  nextCheckout = (address) => {
    switch (this.state.content) {
      case 'billing':
        this.setState({
          content: 'shipping',
          billingAddress: address,
        });
        break;
      case 'shipping':
        if (address) {
          this.setState({ shippingAddress: address });
        } else {
          this.setState({ shippingAddress: this.state.billingAddress });
        }
        this.setState({ content: 'promocode' }, () => {
          const data = {
            order: {
              bill_address_attributes: this.state.billingAddress,
              ship_address_attributes: this.state.shippingAddress,
            },
          };
          this.props.checkoutNextDelivery(data);
        });
        break;
      case 'promocode':
        this.setState({ content: 'review' });
        this.props.checkoutNext();
        break;
      default: // do nothing
    }
  }

  clickTab = (e) => {
    e.preventDefault();
    this.setState({
      content: e.target.id,
    });
  }

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      couponClassName: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      showLoginFields: !this.state.showLoginFields,
      loginClassName: !this.state.showLoginFields ? 'show' : 'hide',
    });
  }

  render() {
    console.log('client');
    const billing = this.props.billing;
    const shipping = this.props.shipping;
    if (!this.props.cartItems.isLoaded || !billing.isLoaded || !shipping.isLoaded) {
      return null;
    }
    return (
      <Checkout
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.couponClassName}
        handleLogin={this.handleLogin}
        loginClass={this.state.loginClassName}
        clickTab={this.clickTab}
        content={this.state.content}
        message={this.props.message}
        isError={this.props.isError}
        billingAddress={this.props.billing.address}
        shippingAddress={this.props.shipping.address}
        nextCheckout={this.nextCheckout}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapper);

