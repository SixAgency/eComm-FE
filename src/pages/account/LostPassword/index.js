import React, { PropTypes } from 'react';
import fetch from '../../../core/fetch';
import LostPassword from './LostPassword';

class LostPassWrapper extends React.Component {
  static propTypes = {
    client: PropTypes.bool,
    logged: PropTypes.bool.isRequired,
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log('submited');
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
      <LostPassword
        loggedIn={this.props.logged}
        onLogout={this.onLogout}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default LostPassWrapper;
