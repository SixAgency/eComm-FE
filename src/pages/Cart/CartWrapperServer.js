import React, { PropTypes, Component } from 'react';
import Cart from './Cart';

class CartWrapper extends Component {
  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    paypalObj: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  /*
    * Set default action for server side renderring.
    * All the actions comes from Redux, client side.
  */
  static defaultProps = {
    paypalObj: {},
    isError: false,
    messages: [],
  };


  render() {
    const showGiftCartForm = false;
    return (
      <Cart
        removeItem={() => (true)}
        addQuantity={() => (true)}
        subQuantity={() => (true)}
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogout={() => (true)}
        messages={this.props.messages}
        isError={this.props.isError}
        applyPromoCode={() => (true)}
        updateCart={() => (true)}
        updateQuantity={() => (true)}
        paypalObj={this.props.paypalObj}
        checkoutPayPal={() => (true)}
        proceedToCheckout={() => (true)}
        breadcrumbs={this.props.breadcrumbs}
        toggleLoader={() => (true)}
        toggleGiftCardForm={() => (true)}
        calculateShipping={() => (true)}
        showGiftCardForm={showGiftCartForm}
      />
    );
  }
}

export default CartWrapper;
