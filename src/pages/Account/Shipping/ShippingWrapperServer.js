import React, { PropTypes } from 'react';
import Shipping from './Shipping';

class ShippingWrapper extends React.Component {
  static propTypes = {
    addresses: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const mockTrue = true;
    const mockFalse = false;
    const mockFunc = () => (true);
    return (
      <Shipping
        address={this.props.addresses.shipping}
        loggedIn={mockTrue}
        onLogout={mockFunc}
        messages={[]}
        isError={mockFalse}
        breadcrumbs={this.props.breadcrumbs}
        onSubmit={mockFunc}
        onCancel={mockFunc}
        onFieldChange={mockFunc}
        forwardTo={mockFunc}
      />
    );
  }
}

export default ShippingWrapper;
