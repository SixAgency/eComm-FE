import React, { Component, PropTypes } from 'react';
// Components
import ManageAddresses from './ManageAddresses';

class ManageAddressesWrapper extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    setDefaultShipping: PropTypes.func.isRequired,
    setDefaultBilling: PropTypes.func.isRequired,
    editAddress: PropTypes.func.isRequired
  };

  static defaultProps = {
    onLogout: () => (true),
    addresses: { addresses: [] },
    deleteAddress: () => (true),
    setDefaultShipping: () => (true),
    setDefaultBilling: () => (true),
    editAddress: () => (true)
  }

  render() {
    return (
      <ManageAddresses
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        addresses={this.props.addresses}
        shipping={this.props.shipping}
        billing={this.props.billing}
        deleteAddress={this.props.deleteAddress}
        setDefaultShipping={this.props.setDefaultShipping}
        setDefaultBilling={this.props.setDefaultBilling}
        editAddress={this.props.editAddress}
      />
    );
  }
}

export default ManageAddressesWrapper;
