import React, { PropTypes } from 'react';
import Dashboard from './Dashboard';

class DashboardWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array,
    profile: PropTypes.object.isRequired
  };

  static defaultProps = {
    messages: [],
    isError: false,
    profile: {}
  };

  onLogout = () => (true);
  resetMessages = () => (true);

  render() {
    const addresses = {
      shippAddress: this.props.shipping.address,
      billAddress: this.props.billing.address
    };
    const orders = this.props.orders;
    return (
      <Dashboard
        loggedIn={this.props.loggedIn}
        onLogout={this.onLogout}
        addresses={addresses}
        orders={orders}
        resetMessages={this.resetMessages}
        messages={this.props.messages}
        isError={this.props.isError}
        breadcrumbs={this.props.breadcrumbs}
        profile={this.props.profile}
      />
    );
  }
}

export default DashboardWrapper;
