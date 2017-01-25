import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';
// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { getCart, removeItem, updateCart, updateQuantity } from '../../actions/order';
import { onLogout, onLogin } from '../../actions/user';

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    loggedIn: state.user.loggedIn,
    message: state.cart.message,
    isError: state.cart.isError,
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
  }
));
class CartWrapper extends Component {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    updateCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide',
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
    if (this.props.cartItems.isLoaded) {
      console.log(this.props.cartItems);
    } else {
      this.props.getCart();
    }
  }

  componentDidMount = () => {
    const { isLoaded } = this.props.cartItems;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
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

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      couponClassName: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log('here');
    this.setState({
      showLoginFields: !this.state.showLoginFields,
      loginClassName: !this.state.showLoginFields ? 'show' : 'hide',
    });
  }

  updateQuantity = (updatedCartItems) => {
    const updatedCart = { ...this.props.cartItems.cart, line_items: updatedCartItems };
    this.props.updateQuantity({ ...this.props.cartItems, cart: updatedCart });
  }

  onUpdateCart = () => {
    const { cart } = this.props.cartItems;
    const { line_items } = cart;
    const items = {};
    line_items.forEach((item, index) => {
      items[index] = {
        id: item.id,
        quantity: item.quantity,
      };
    });
    const data = {
      id: cart.id,
      order: {
        line_items: items,
      },
    };
    this.props.updateCart(data);
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
        message={this.props.message}
        isError={this.props.isError}
        updateCart={this.onUpdateCart}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWrapper);
