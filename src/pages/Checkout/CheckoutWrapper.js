import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkout from './Checkout';
// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { getCart } from '../../actions/order';
import { onLogout } from '../../actions/user';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
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
    toggleLoader: PropTypes.func.isRequired,
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

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
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

