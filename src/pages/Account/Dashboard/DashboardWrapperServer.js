import React, { PropTypes } from 'react';
import Dashboard from './Dashboard';

class DashboardWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onLogout: () => (true),
    getAddress: () => (true),
    setHeaderProps: () => (true),
  }

  render() {
    const addresses = {
      shippAddress: this.props.shipping.address,
      billAddress: this.props.billing.address,
    }
    return (
      <Dashboard
        userName={this.props.userName}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        addresses={addresses}
      />
    );
  }
}

export default DashboardWrapper;
