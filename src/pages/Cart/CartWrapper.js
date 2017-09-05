import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Cart from './Cart';

// Actions
import {
  setHeaderProps,
  resetMessages,
  toggleLoader,
  setMessage
} from '../../actions/page';
import { forwardTo } from '../../actions/handler';
import {
  removeItem,
  updateCart,
  updateQuantity,
  applyPromoCode,
  removePromoCode,
  calculateShipping,
  getCart
} from '../../actions/order';
import { checkoutNext } from '../../actions/checkout';
import { onLogout, onLogin } from '../../actions/user';
import { checkCartState } from '../../utils/utils';

import { checkQuantitiesCart } from '../../helpers/quantity';

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    isCartPending: state.cart.isCartPending,
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
    isPagePending: state.page.isPending,
    isFetched: (
      !state.page.isPending &&
      !state.cart.isCartPending &&
      state.cart.cartItems.isLoaded
    )
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle, image) => dispatch(toggleLoader(toggle, image)),
    removeItem: (item) => dispatch(removeItem(item)),
    onLogout: () => dispatch(onLogout()),
    onLogin: (data) => dispatch(onLogin(data)),
    resetMessages: () => dispatch(resetMessages()),
    updateCart: (cart, callback) => dispatch(updateCart(cart, callback)),
    updateQuantity: (cart) => dispatch(updateQuantity(cart)),
    applyPromoCode: (cart, callback) => dispatch(applyPromoCode(cart, callback)),
    removePromoCode: () => dispatch(removePromoCode()),
    checkoutNext: (fn) => dispatch(checkoutNext(fn)),
    calculateShipping: (data, cartUpdate) => dispatch(calculateShipping(data, cartUpdate)),
    getCart: (data) => dispatch(getCart(data)),
    setMessage: (message) => dispatch(setMessage(message))
  }
));

class CartWrapper extends BasePageComponent {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    isCartPending: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    updateCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    removePromoCode: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    checkoutNext: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    route: PropTypes.object,
    calculateShipping: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    isFetched: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showGiftCardForm: false,
      shippingState: '',
      shippingZip: ''
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/'
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    if (this.props.isFetched) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isFetched) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    } else {
      this.props.toggleLoader(true);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  updateQuantity = (updatedCartItems) => {
    const updatedCart = { ...this.props.cartItems.cart, line_items: updatedCartItems };
    this.props.updateQuantity({ ...this.props.cartItems, cart: updatedCart });
    this.setState({ showGiftCardForm: false });
  };

  updateShippingState = (val) => {
    this.setState({ shippingState: val });
  }

  updateShippingZip = (val) => {
    this.setState({ shippingZip: val });
  }

  calculateShipping = (cartUpdate) => {
    const { shippingZip, shippingState } = this.state;
    if (shippingZip && shippingState) {
      this.props.calculateShipping({
        shipments_attributes: {
          zipcode: shippingZip,
          state_id: shippingState,
          country_id: '232'
        }
      }, cartUpdate);
    }
  }

  /**
   * Send next request if the order is in cart state
   * else we are good - redirecting to correct step
   */
  proceedToCheckout = () => {
    const state = checkCartState(this.props);
    if (state !== 'cart') {
      forwardTo(state);
    } else {
      this.props.checkoutNext(() => (forwardTo('checkout/shipping')));
    }
  };

  onUpdateCart = () => {
    const { cart } = this.props.cartItems;
    const { line_items } = cart;
    const messages = checkQuantitiesCart(line_items);
    if (messages.length > 0) {
      this.props.resetMessages();
      window.scrollTo(0, 0);
      this.props.setMessage({ isError: true, messages });
    } else {
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
      this.props.updateCart(data, () => {
        this.calculateShipping(true);
      });
      this.setState({ showGiftCardForm: false });
    }
  };

  showShippingCalculator = () => {
    const { cartItems } = this.props;
    return (['cart', 'address'].includes(cartItems.cart.state));
  };

  render() {
    if (this.props.isFetched) {
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
          removePromoCode={this.props.removePromoCode}
          proceedToCheckout={this.proceedToCheckout}
          breadcrumbs={this.props.route.breadcrumbs}
          toggleLoader={this.props.toggleLoader}
          calculateShipping={this.calculateShipping}
          getCart={this.props.getCart}
          setMessage={this.props.setMessage}
          showShippingCalculator={this.showShippingCalculator()}
          shippingState={this.state.shippingState}
          shippingZip={this.state.shippingZip}
          updateShippingState={this.updateShippingState}
          updateShippingZip={this.updateShippingZip}
          forwardTo={forwardTo}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWrapper);
