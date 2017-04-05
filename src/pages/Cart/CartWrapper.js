import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Cart from './Cart';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { forwardTo } from '../../actions/handler';
import {
  removeItem,
  updateCart,
  updateQuantity,
  applyPromoCode,
  calculateShipping
} from '../../actions/order';
import { getPayPalToken, checkoutPayPal, checkoutNext } from '../../actions/checkout';
import { onLogout, onLogin } from '../../actions/user';
import { checkCartState } from '../../utils/utils';

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    isPayPal: state.checkout.isPayPal,
    isCartPending: state.cart.isCartPending,
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
    removeItem: (item) => dispatch(removeItem(item)),
    onLogout: () => dispatch(onLogout()),
    onLogin: (data) => dispatch(onLogin(data)),
    resetMessages: () => dispatch(resetMessages()),
    updateCart: (cart) => dispatch(updateCart(cart)),
    updateQuantity: (cart) => dispatch(updateQuantity(cart)),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
    getPayPalToken: (cart) => dispatch(getPayPalToken(cart)),
    checkoutPayPal: (data) => dispatch(checkoutPayPal(data)),
    checkoutNext: (fn) => dispatch(checkoutNext(fn)),
    calculateShipping: (data) => dispatch(calculateShipping(data))
  }
));

class CartWrapper extends BasePageComponent {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    isCartPending: PropTypes.bool.isRequired,
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
    route: PropTypes.object,
    calculateShipping: PropTypes.func.isRequired
  };

  static defaultProps = {
    paypalObj: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      showGiftCardForm: false
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/'
    };
    this.props.setHeaderProps(props);
    if (!this.props.paypalObj.isLoaded) {
      this.props.getPayPalToken();
    }
  };

  componentDidMount = () => {
    const isCartPending = this.props.isCartPending;
    const cartLoaded = this.props.cartItems.isLoaded;
    const payPalLoaded = this.props.paypalObj.isLoaded;
    if (!isCartPending && cartLoaded && payPalLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const isCartPending = nextProps.isCartPending;
    const cartLoaded = nextProps.cartItems.isLoaded;
    const payPalLoaded = nextProps.paypalObj.isLoaded;
    if (!isCartPending && cartLoaded && payPalLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  /**
   * Gift cart handler
   * @param event
   */
  toggleGiftCardForm = (event) => {
    event.preventDefault();
    this.setState({ showGiftCardForm: !this.state.showGiftCardForm });
  };

  updateQuantity = (updatedCartItems) => {
    const updatedCart = { ...this.props.cartItems.cart, line_items: updatedCartItems };
    this.props.updateQuantity({ ...this.props.cartItems, cart: updatedCart });
  };

  /**
   * Send next request if the order is in cart state
   * else we are good - redirecting to correct step
   */
  proceedToCheckout = () => {
    const state = checkCartState(this.props);
    if (state !== 'cart') {
      forwardTo(state);
    } else {
      this.props.checkoutNext(
        forwardTo('checkout/billing')
      );
    }
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

  render() {
    return (
      <Cart
        removeItem={this.props.removeItem}
        updateQuantity={this.updateQuantity}
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        messages={this.props.messages}
        isError={this.props.isError}
        updateCart={this.onUpdateCart}
        applyPromoCode={this.props.applyPromoCode}
        showGiftCardForm={this.state.showGiftCardForm}
        toggleGiftCardForm={this.toggleGiftCardForm}
        paypalObj={this.props.paypalObj}
        checkoutPayPal={this.props.checkoutPayPal}
        proceedToCheckout={this.proceedToCheckout}
        breadcrumbs={this.props.route.breadcrumbs}
        toggleLoader={this.props.toggleLoader}
        calculateShipping={this.props.calculateShipping}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWrapper);
