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
    emailAddress: PropTypes.string.isRequired,
    messages: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
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
    const address = this.props.shipping.address || {
      firstname: '',
      lastname: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state_id: 0,
      zipcode: '',
    };
    return (
      <Shipping
        loggedIn={this.props.loggedIn}
        onSubmit={this.onSubmit}
        onLogout={this.props.onLogout}
        shippingAddress={address}
        emailAddress={this.props.emailAddress}
        messages={this.props.messages}
        isError={this.props.isError}
      />
    );
  }
}

export default ShippinggWrapper;
