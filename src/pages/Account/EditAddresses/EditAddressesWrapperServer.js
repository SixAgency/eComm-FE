import React, { PropTypes } from 'react';
import EditAddresses from './EditAddresses';

class EditAddressesWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired
  };

  static defaultProps = {
    onLogout: () => (true)
  };

  render() {
    return (
      <EditAddresses
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        addresses={this.props.addresses}
      />
    );
  }
}

export default EditAddressesWrapper;

