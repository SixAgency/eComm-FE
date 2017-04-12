import React, { Component, PropTypes } from 'react';
import ManageAddresses from './ManageAddresses';

class ManageAddressesWrapper extends Component {

  static propTypes = {
    addresses: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      addresses,
      breadcrumbs
    } = this.props;
    // Only logged in users can get here - so it's always true
    const loggedIn = true;
    const isError = false;
    const messages = [];
    return (
      <ManageAddresses
        addresses={addresses.addresses}
        billing={addresses.billing}
        shipping={addresses.shipping}
        breadcrumbs={breadcrumbs}
        loggedIn={loggedIn}
        isError={isError}
        messages={messages}
        onLogout={() => (true)}
        deleteAddress={() => (true)}
        setDefaultShipping={() => (true)}
        setDefaultBilling={() => (true)}
        editAddress={() => (true)}
        onSubmit={() => (true)}
      />
    );
  }
}

export default ManageAddressesWrapper;
