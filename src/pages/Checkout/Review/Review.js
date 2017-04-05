import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Review.css';
// Forms and inputs
import ReviewOrder from '../../../components/Forms/Checkout/ReviewOrder';

class Review extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    checkoutSquare: PropTypes.func.isRequired,
    confirmOrder: PropTypes.func.isRequired
  };

  render() {
    return (<ReviewOrder
      cartItems={this.props.cartItems}
      isPayPal={this.props.isPayPal}
      checkoutPayPal={this.props.checkoutPayPal}
      checkoutSquare={this.props.checkoutSquare}
      confirmOrder={this.props.confirmOrder}
    />);
  }
}

export default withStyles(s)(Review);
