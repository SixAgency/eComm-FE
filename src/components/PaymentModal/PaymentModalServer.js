import React from 'react';
// import SquarePayment from './SquarePayment';

class PaymentModal extends React.Component {

  onCancel = () => (true);
  onNonceReceived = () => (true);

  render() {
    // Please keep uncommented until we figure out how to handle it
    // return (
    //   <SquarePayment
    //     onCancel={this.onCancel}
    //     onNonceReceived={this.onNonceReceived}
    //     zipCode=""
    //   />
    // );
    return null;
  }
}

export default PaymentModal;
