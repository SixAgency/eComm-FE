import React, { PropTypes } from 'react';
import Shipping from './Shipping';

class ShippinggWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    shipping: PropTypes.object.isRequired,
    addAddress: PropTypes.func.isRequired,
    getAddress: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    addAddress: (data) => (data),
    getAddress: () => (true),
    setHeaderProps: () => (true),
    onLogout: () => (true),
  }

  onSubmit = (address) => {
    this.props.addAddress(address);
  }

  render() {
    return (
      <Shipping
        loggedIn={this.props.loggedIn}
        onSubmit={this.onSubmit}
        onLogout={this.props.onLogout}
        shippingAddress={this.props.shipping.address}
      />
    );
  }
}

export default ShippinggWrapper;
