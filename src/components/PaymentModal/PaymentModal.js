import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ModalContent from './ModalContent';
import { toggleModal, toggleLoader } from '../../actions/page';
import { checkoutStripe } from '../../actions/payment/payment';

const mapStateToProps = ((state) => (
  { cartItems: state.cart.cartItems }
));
const mapDispatchToProps = ((dispatch) => (
  {
    toggleModal: (toggle) => dispatch(toggleModal(toggle)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    checkoutStripe: (data) => dispatch(checkoutStripe(data))
  }
));

class PaymentModal extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    checkoutStripe: PropTypes.func.isRequired
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
    this.props.checkoutStripe(data);
  };

  getPaymentParams = (params) => {
    const paymentMethodId = this.getPaymentMethodStripeId();
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

  getPaymentMethodStripeId = () => {
    const { cart } = this.props.cartItems;
    const selectedMethod = cart.payment_methods.find(method => method.method_type === 'stripe');
    return selectedMethod.id;
  };

  getPaymentSource = (params) => ({
    gateway_payment_profile_id: params.id,
    last_digits: params.card.last4,
    month: params.card.exp_month,
    year: params.card.exp_year,
    cc_type: params.card.brand,
    name: params.card.name
  });

  render() {
    if (this.props.cartItems.isLoaded && this.props.cartItems.cart.state === 'payment') {
      return (
        <ModalContent
          onCancel={this.onCancel}
          onNonceReceived={this.onNonceReceived}
          bill_address={this.props.cartItems.cart.bill_address}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
