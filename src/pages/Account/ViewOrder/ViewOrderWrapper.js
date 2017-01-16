import React, { PropTypes } from 'react';
import ViewOrder from './ViewOrder';

class ViewOrderWrapper extends React.Component {
  static propTypes = {
    client: PropTypes.bool,
    logged: PropTypes.bool.isRequired,
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
    return (
      <ViewOrder loggedIn={this.props.logged} onLogout={this.onLogout} />
    );
  }
}

export default ViewOrderWrapper;
