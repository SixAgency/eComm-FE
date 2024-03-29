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
    isError: false,
    messages: []
  };

  showShippingCalculator = () => {
    const { cartItems } = this.props;
    return (['cart', 'address'].includes(cartItems.cart.state));
  };


  render() {
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
        removePromoCode={() => (true)}
        updateCart={() => (true)}
        updateQuantity={() => (true)}
        getCart={() => (true)}
        proceedToCheckout={() => (true)}
        setMessage={() => (true)}
        breadcrumbs={this.props.breadcrumbs}
        toggleLoader={() => (true)}
        calculateShipping={() => (true)}
        forwardTo={() => (true)}
        showShippingCalculator={this.showShippingCalculator()}
        shippingMethod="Shipping costs will be calculate once you have provided your address."
        shippingState=""
        shippingZip=""
        updateShippingState={() => (true)}
        updateShippingZip={() => (true)}
      />
    );
  }
}

export default CartWrapper;
