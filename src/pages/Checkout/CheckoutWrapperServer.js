import React, { PropTypes } from 'react';
import Checkout from './Checkout';

class CheckoutWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
    getCart: () => (true),
    onLogout: () => (true),
    applyPromoCode: () => (true),
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'billing',
      showCouponFields: false,
      className: 'hide',
    };
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
    console.log('server');
    return (
      <Checkout
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.className}
        clickTab={this.clickTab}
        content={this.state.content}
        applyPromoCode={this.props.applyPromoCode}
      />
    );
  }
}

export default CheckoutWrapper;

