import React, { PropTypes } from 'react';
import Billing from './Billing';

class BillingWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    billing: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    onLogout: () => (true),
    messages: [],
    isError: false
  };

  onSubmit = () => (true);
  onCancel = () => (true);
  onCreate = () => (true);
  onSelect = () => (true);

  render() {
    return (
      <Billing
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        addressId={this.props.billing.address.id}
        addresses={this.props.addresses.addresses}
        messages={this.props.messages}
        isError={this.props.isError}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onSelect={this.onSelect}
        onCreate={this.onCreate}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default BillingWrapper;
