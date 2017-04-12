import React, { PropTypes } from 'react';
import Shipping from './Shipping';

class ShippingWrapper extends React.Component {
  static propTypes = {
    addresses: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      addresses,
      breadcrumbs
    } = this.props;
    // Only logged in users can get here - so always true
    const loggedIn = true;
    const isError = true;
    const messages = [];
    return (
      <Shipping
        addresses={addresses.addresses.addresses}
        breadcrumbs={breadcrumbs}
        messages={messages}
        isError={isError}
        loggedIn={loggedIn}
        onLogout={() => (true)}
        onSubmit={() => (true)}
        onCancel={() => (true)}
        onSelect={() => (true)}
        onCreate={() => (true)}
      />
    );
  }
}

export default ShippingWrapper;
