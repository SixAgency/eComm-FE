import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';
// Actions
import { setHeaderProps, resetMessages } from '../../actions/page';
import { getCart, removeItem } from '../../actions/order';
import { onLogout } from '../../actions/user';

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
    getCart: () => dispatch(getCart()),
    removeItem: (item) => dispatch(removeItem(item)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
  }
));
class CartWrapper extends React.Component {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCouponFields: false,
      className: 'hide',
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

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }

  addQuantity = (qty) => {
    console.log(qty);
  }

  subQuantity = (qty) => {
    console.log(qty);
  }

  render() {
    return (
      <Cart
        removeItem={this.props.removeItem}
        addQuantity={this.addQuantity}
        subQuantity={this.subQuantity}
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        couponClass={this.state.className}
        onLogout={this.props.onLogout}
        handleGiftCard={this.handleGiftCard}
        message={this.props.message}
        isError={this.props.isError}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWrapper);
