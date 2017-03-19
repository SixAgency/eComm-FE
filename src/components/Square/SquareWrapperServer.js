import React from 'react';
import SquarePayment from './SquarePayment';

class SquareWrapper extends React.Component {

  static defaultProps = {
    cartItems: { isLoaded: false, isEmpty: true, cart: {} }
  };

  onCancel = () => (true);
  onNonceReceived = () => (true);

  render() {
    return (
      <SquarePayment
        onCancel={this.onCancel}
        onNonceReceived={this.onNonceReceived}
      />
    );
  }
}

export default SquareWrapper;
