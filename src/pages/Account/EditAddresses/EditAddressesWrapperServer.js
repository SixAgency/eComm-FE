import React, { PropTypes } from 'react';
import EditAddresses from './EditAddresses';

class EditAddressesWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    setAddresses: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    billing: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired
  };

  static defaultProps = {
    onLogout: () => (true),
    setAddresses: () => (true),
    deleteAddress: () => (true),
    shipping: {},
    billing: {},
    addresses: { addresses: [] }
  };

  render() {
    return (
      <EditAddresses
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        addresses={this.props.addresses}
        setAddresses={this.props.setAddresses}
        deleteAddress={this.props.deleteAddress}
        shipping={this.props.shipping}
        billing={this.props.billing}
      />
    );
  }
}

export default EditAddressesWrapper;

