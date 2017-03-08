import React, { Component, PropTypes } from 'react';
// Components
import ManageAddresses from './ManageAddresses';

class ManageAddressesWrapper extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired
  };

  static defaultProps = {
    onLogout: () => (true),
    addresses: { addresses: [] }
  }

  render() {
    return (
      <ManageAddresses
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        addresses={this.props.addresses}
        shipping={this.props.shipping}
        billing={this.props.billing}
      />
    );
  }
}

export default ManageAddressesWrapper;
