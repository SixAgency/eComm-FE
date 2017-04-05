import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SquarePayment from './SquarePayment';
import { toggleModal, toggleLoader } from '../../actions/page';
import { checkoutSquare } from '../../actions/payment/payment';

const mapStateToProps = ((state) => (
  { cartItems: state.cart.cartItems }
));
const mapDispatchToProps = ((dispatch) => (
  {
    toggleModal: (toggle) => dispatch(toggleModal(toggle)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    checkoutSquare: (data) => dispatch(checkoutSquare(data))
  }
));

class SquareWrapper extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    checkoutSquare: PropTypes.func.isRequired
  };

  onCancel = () => {
    this.props.toggleModal(false);
  };

  onNonceReceived = (params) => {
    // Close the payment modal
    this.props.toggleModal(false);
    // Show the loading screen
    this.props.toggleLoader(true);
    // Get the request data
    const data = this.getPaymentParams(params);
    // Call set payment actions
    this.props.checkoutSquare(data);
  };

  getPaymentParams = (params) => {
    const paymentMethodId = this.getPaymentMethodSquareId();
    const response = {
      order: {
        payments_attributes: [
          {
            payment_method_id: paymentMethodId
          }
        ]
      },
      payment_source: {}
    };
    response.payment_source[paymentMethodId] = this.getPaymentSource(params);
    return response;
  };

  getPaymentMethodSquareId = () => {
    const cart = this.props.cartItems.cart;
    const selectedMethod = cart.payment_methods.find(method => method.method_type === 'square_up');
    return selectedMethod.id;
  };

  getPaymentSource = (params) => ({
    name: this.props.cartItems.cart.bill_address.full_name,
    number: `111111111111${params.cardData.last_4}`,
    expiry: `${params.cardData.exp_month}/${(params.cardData.exp_year % 100)}`,
    verification_value: '',
    cc_type: params.cardData.card_brand,
    run_validations: '0',
    encrypted_data: params.nonce
  });

  render() {
    if (this.props.cartItems.isLoaded && this.props.cartItems.cart.state === 'payment') {
      return (
        <SquarePayment
          onCancel={this.onCancel}
          onNonceReceived={this.onNonceReceived}
          zipCode={this.props.cartItems.cart.bill_address.zipcode}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquareWrapper);
