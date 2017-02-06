import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Checkout from './Checkout';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { getCart, applyPromoCode } from '../../actions/order';
import { onLogin, onLogout } from '../../actions/user';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
  }
));

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    loggedIn: state.user.loggedIn,
    message: state.page.message,
    isError: state.page.isError,
  }
));

class CheckoutWrapper extends BasePageComponent {

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
    applyPromoCode: PropTypes.func.isRequired,
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
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (this.props.cartItems.isLoaded) {
      console.log(this.props.cartItems);
    } else {
      this.props.getCart();
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
        applyPromoCode={this.props.applyPromoCode}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapper);

