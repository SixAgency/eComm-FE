import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Cart from './Cart';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { getCart, removeItem, updateCart, updateQuantity, applyPromoCode } from '../../actions/order';
import { getPayPalToken, checkoutPayPal, checkoutNext } from '../../actions/checkout';
import { onLogout, onLogin } from '../../actions/user';

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    loggedIn: state.user.loggedIn,
    paypalObj: state.checkout.paypal,
    messages: state.page.messages,
    isError: state.cart.isError
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    removeItem: (item) => dispatch(removeItem(item)),
    onLogout: () => dispatch(onLogout()),
    onLogin: (data) => dispatch(onLogin(data)),
    resetMessages: () => dispatch(resetMessages()),
    updateCart: (cart) => dispatch(updateCart(cart)),
    updateQuantity: (cart) => dispatch(updateQuantity(cart)),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
    getPayPalToken: (cart) => dispatch(getPayPalToken(cart)),
    checkoutPayPal: (data) => dispatch(checkoutPayPal(data)),
    checkoutNext: (state) => dispatch(checkoutNext(state))
  }
));

class CartWrapper extends BasePageComponent {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    updateCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    paypalObj: PropTypes.object.isRequired,
    getPayPalToken: PropTypes.func.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    checkoutNext: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    route: PropTypes.object
  };

  static defaultProps = {
    paypalObj: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide'
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/'
    };
    this.props.setHeaderProps(props);
    if (!this.props.cartItems.isLoaded) {
      this.props.getCart();
    }
    if (!this.props.paypalObj.isLoaded) {
      this.props.getPayPalToken();
    }
  };

  componentDidMount = () => {
    const cartLoaded = this.props.cartItems.isLoaded;
    const payPalLoaded = this.props.paypalObj.isLoaded;
    if (cartLoaded && payPalLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const cartLoaded = nextProps.cartItems.isLoaded;
    const payPalLoaded = nextProps.paypalObj.isLoaded;
    if (cartLoaded && payPalLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
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

  updateQuantity = (updatedCartItems) => {
    const updatedCart = { ...this.props.cartItems.cart, line_items: updatedCartItems };
    this.props.updateQuantity({ ...this.props.cartItems, cart: updatedCart });
  };

  onUpdateCart = () => {
    const { cart } = this.props.cartItems;
    const { line_items } = cart;
    const items = {};
    line_items.forEach((item, index) => {
      items[index] = {
        id: item.id,
        quantity: item.quantity
      };
    });
    const data = {
      id: cart.id,
      order: {
        line_items: items
      }
    };
    this.props.updateCart(data);
  };

  updateQuantity = (updatedCartItems) => {
    const updatedCart = { ...this.props.cartItems.cart, line_items: updatedCartItems };
    this.props.updateQuantity({ ...this.props.cartItems, cart: updatedCart });
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log('here');
    this.setState({
      showLoginFields: !this.state.showLoginFields,
      loginClassName: !this.state.showLoginFields ? 'show' : 'hide',
    });
  }

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      couponClassName: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }

  render() {
    return (
      <Cart
        removeItem={this.props.removeItem}
        updateQuantity={this.updateQuantity}
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        handleGiftCard={this.handleGiftCard}
        couponClass={this.state.couponClassName}
        handleLogin={this.handleLogin}
        loginClass={this.state.loginClassName}
        onLogout={this.props.onLogout}
        onLogin={this.props.onLogin}
        messages={this.props.messages}
        isError={this.props.isError}
        updateCart={this.onUpdateCart}
        applyPromoCode={this.props.applyPromoCode}
        paypalObj={this.props.paypalObj}
        checkoutPayPal={this.props.checkoutPayPal}
        checkoutNext={this.props.checkoutNext}
        breadcrumbs={this.props.route.breadcrumbs}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWrapper);
