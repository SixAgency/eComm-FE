import React, { PropTypes } from 'react';
import fetch from '../../../core/fetch';
import Dashboard from './Dashboard';

/* @TODO - Refactor - Use Redux */
class DashboardWrapper extends React.Component {
  static propTypes = {
    client: PropTypes.bool,
    logged: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loggedIn: this.props.logged,
  //   };
  // }

  // componentWillMount = () => {
  //   if (this.props.client) {
  //     fetch('/api/check', {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'same-origin',
  //     })
  //     .then((resp) => (resp.json()))
  //     .then((json) => {
  //       if (!json.logged) { window.location.href = '/my-account'; }
  //       this.setState({
  //         loggedIn: json.logged,
  //       });
  //     });
  //   }
  // }

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
      // this.setState({
      //   isError: true,
      //   error: data.error,
      // });
      console.log('error');
    } else {
      window.location.href = '/my-account';
    }
  }

  render() {
    const { username } = this.props;
    return (
      <Dashboard userName={username} loggedIn={this.props.logged} onLogout={this.onLogout} />
    );
  }
}

export default DashboardWrapper;
