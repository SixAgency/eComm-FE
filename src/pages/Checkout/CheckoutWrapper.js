import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkout from './Checkout';
// Actions
import setHeaderProps from '../../actions/page';
import { getCart } from '../../actions/order';
import { onLogout } from '../../actions/user';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    getCart: () => dispatch(getCart()),
    onLogout: () => dispatch(onLogout()),
  }
));
const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    loggedIn: state.user.loggedIn,
  }
));
class CheckoutWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'billing',
      showCouponFields: false,
      className: 'hide',
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
      className: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }

  render() {
    console.log('client');
    return (
      <Checkout
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.className}
        clickTab={this.clickTab}
        content={this.state.content}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapper);

