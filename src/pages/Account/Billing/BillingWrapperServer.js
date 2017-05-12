import React, { PropTypes } from 'react';
import Billing from './Billing';

class BillingWrapper extends React.Component {
  static propTypes = {
    addresses: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const mockTrue = true;
    const mockFalse = false;
    const mockFunc = () => (true);
    return (
      <Billing
        address={this.props.addresses.billing}
        loggedIn={mockTrue}
        onLogout={mockFunc}
        messages={[]}
        isError={mockFalse}
        breadcrumbs={this.props.breadcrumbs}
        onSubmit={mockFunc}
        onCancel={mockFunc}
        onFieldChange={mockFunc}
      />
    );
  }
}

export default BillingWrapper;
