import React, { PropTypes } from 'react';
import fetch from '../../../core/fetch';
import Account from './Account';

/* @TODO - Refactor - Use Redux */
class AccountWrapper extends React.Component {
  static propTypes = {
    client: PropTypes.bool,
    logged: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'blogin',
      // loggedIn: this.props.logged,
    };
  }

  // componentWillMount = () => {
  //   if (this.props.client) {
  //     fetch('/api/check', {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'same-origin',
  //     })
  //     .then((resp) => (resp.json()))
  //     .then((json) => {
  //       if (json.logged) { window.location.href = '/my-account/dashboard'; }
  //       this.setState({
  //         loggedIn: json.logged,
  //       });
  //     });
  //   }
  // }

  onRegister = (data) => {
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleAuth(json));
  }

  onLogin = (data) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleAuth(json));
  }

  handleAuth = (data) => {
    if (data.error) {
      this.setState({
        isError: true,
        error: data.error,
      });
    } else {
      window.location.href = '/my-account/dashboard';
    }
  }

  clickTab = (event) => {
    event.preventDefault();
    this.setState({
      content: event.target.id,
    });
  }

  render() {
    const contentTabs = [
      {
        name: 'Login',
        title: 'Login',
        cname: 'login',
        id: 'blogin',
      },
      {
        name: 'Register',
        title: 'Register',
        cname: 'register',
        id: 'bregister',
      },
    ];
    return (
      <Account
        contentTabs={contentTabs}
        loggedIn={this.props.logged}
        content={this.state.content}
        clickTab={this.clickTab}
        onLogin={this.onLogin}
        onRegister={this.onRegister}
      />
    );
  }
}

export default AccountWrapper;
