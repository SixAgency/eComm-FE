import React, { PropTypes } from 'react';
import fetch from '../../../core/fetch';
import Billing from './Billing';

/* @TODO - Refactor - Use Redux */
class BillingWrapper extends React.Component {
  static propTypes = {
    client: PropTypes.bool,
    logged: PropTypes.bool.isRequired,
    billing: PropTypes.object,
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


  onSubmit = (address) => {
    console.log(address);
  }

  handleLogout = (data) => {
    if (data.error) {
      console.log('error');
    } else {
      window.location.href = '/my-account';
    }
  }

  render() {
    return (
      <Billing
        loggedIn={this.props.logged}
        onSubmit={this.onSubmit}
        onLogout={this.onLogout}
        billingAddress={this.props.billing}
      />
    );
  }
}

export default BillingWrapper;