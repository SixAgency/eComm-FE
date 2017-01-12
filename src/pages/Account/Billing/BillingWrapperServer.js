import React, { PropTypes } from 'react';
import Billing from './Billing';

class BillingWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    billing: PropTypes.object.isRequired,
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
      <Billing
        loggedIn={this.props.loggedIn}
        onSubmit={this.onSubmit}
        onLogout={this.props.onLogout}
        billingAddress={this.props.billing.address}
      />
    );
  }
}

export default BillingWrapper;
