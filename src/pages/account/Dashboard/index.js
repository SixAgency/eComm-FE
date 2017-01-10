import React, { PropTypes } from 'react';
import fetch from '../../../core/fetch';
import Dashboard from './Dashboard';

/* @TODO - Refactor - Use Redux */
class DashboardWrapper extends React.Component {
  static propTypes = {
    client: PropTypes.bool,
    logged: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    addresses: PropTypes.object.isRequired,
  }

  onLogout = (event) => {
    event.preventDefault();
    fetch('/api/logout', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleLogout(json));
  }

  handleLogout = (data) => {
    if (data.error) {
      console.log('error');
    } else {
      window.location.href = '/my-account';
    }
  }

  render() {
    const { username } = this.props;
    console.log(this.props.addresses);
    return (
      <Dashboard
        userName={username}
        loggedIn={this.props.logged}
        onLogout={this.onLogout}
        addresses={this.props.addresses}
      />
    );
  }
}

export default DashboardWrapper;
