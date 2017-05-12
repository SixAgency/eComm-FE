import React, { PropTypes, Component } from 'react';
import Cart from './Cart';

class CartWrapper extends Component {
  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  /*
    * Set default action for server side renderring.
    * All the actions comes from Redux, client side.
  */
  static defaultProps = {
    paypalObj: {},
    isError: false,
    messages: []
  };

  showShippingCalculator = () => {
    const { cartItems } = this.props;
    return (['cart', 'address'].includes(cartItems.cart.state));
  };


  render() {
    const paypalObj = {};
    return (
      <Cart
        removeItem={() => (true)}
        addQuantity={() => (true)}
        subQuantity={() => (true)}
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogout={() => (true)}
        messages={[]}
        isError={false}
        applyPromoCode={() => (true)}
        updateCart={() => (true)}
        updateQuantity={() => (true)}
        paypalObj={paypalObj}
        checkoutPayPal={() => (true)}
        getCart={() => (true)}
        proceedToCheckout={() => (true)}
        setMessage={() => (true)}
        breadcrumbs={this.props.breadcrumbs}
        toggleLoader={() => (true)}
        calculateShipping={() => (true)}
        showShippingCalculator={this.showShippingCalculator()}
        shippingMethod="Shipping costs will be calculate once you have provided your address."
      />
    );
  }
}

export default CartWrapper;
