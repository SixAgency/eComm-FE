import React, { PropTypes, Component } from 'react';
import Cart from './Cart';

class CartWrapper extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addQuantity: PropTypes.func.isRequired,
    subQuantity: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    updateCartItem: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  /*
    * Set default action for server side renderring.
    * All the actions comes from Redux, client side.
  */
  static defaultProps = {
    onLogout: () => (true),
    removeItem: () => (true),
    addQuantity: () => (true),
    subQuantity: () => (true),
    updateCartItem: () => (true),
    isError: false,
    message: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      showCouponFields: false,
      className: 'hide',
    };
  }

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }


  render() {
    return (
      <Cart
        removeItem={this.props.removeItem}
        addQuantity={this.props.addQuantity}
        subQuantity={this.props.subQuantity}
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        couponClass={this.state.className}
        onLogout={this.props.onLogout}
        handleGiftCard={this.handleGiftCard}
        message={this.props.message}
        isError={this.props.isError}
        updateCartItem={this.props.updateCartItem}
      />
    );
  }
}

export default CartWrapper;
