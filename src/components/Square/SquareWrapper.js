import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SquarePayment from './SquarePayment';
import { toggleModal } from '../../actions/page';
import { checkoutSquare } from '../../actions/payment/payment';

const mapStateToProps = ((state) => (
  { cartItems: state.cart.cartItems }
));
const mapDispatchToProps = ((dispatch) => (
  {
    toggleModal: () => dispatch(toggleModal()),
    checkoutSquare: (data) => dispatch(checkoutSquare(data))
  }
));

class SquareWrapper extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    checkoutSquare: PropTypes.func.isRequired
  };

  onCancel = () => {
    this.props.toggleModal(false);
  };

  onNonceReceived = (params) => {
    console.log(params);
  };

  render() {
    return (
      <SquarePayment
        onCancel={this.onCancel}
        onNonceReceived={this.onNonceReceived}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquareWrapper);
