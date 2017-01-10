import React, { PropTypes } from 'react';
import fetch from '../../../core/fetch';
import Shipping from './Shipping';

/* @TODO - Refactor - Use Redux */
class ShippingWrapper extends React.Component {
  static propTypes = {
    client: PropTypes.bool,
    logged: PropTypes.bool.isRequired,
    shipping: PropTypes.object,
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


  onSubmit = () => {
    console.log('submit');
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
      <Shipping
        loggedIn={this.props.logged}
        onSubmit={this.onSubmit}
        onLogout={this.onLogout}
        shippingAddress={this.props.shipping}
      />
    );
  }
}

export default ShippingWrapper;
