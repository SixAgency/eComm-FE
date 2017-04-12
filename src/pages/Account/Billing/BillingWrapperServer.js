import React, { PropTypes } from 'react';
import Billing from './Billing';

class BillingWrapper extends React.Component {
  static propTypes = {
    addresses: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      addresses,
      breadcrumbs
    } = this.props;
    const loggedIn = true;
    const isError = true;
    const messages = [];
    return (
      <Billing
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

export default BillingWrapper;
