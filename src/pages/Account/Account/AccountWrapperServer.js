import React, { PropTypes } from 'react';
import Account from './Account';

class AccountWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
    onLogin: (data) => (data),
    onLogout: (data) => (data),
    onRegister: (data) => (data),
    message: '',
    isError: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'blogin',
    };
  }

  clickTab = (event) => {
    event.preventDefault();
    this.setState({
      content: event.target.id,
    });
  }

  render() {
    console.log('server');
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
        loggedIn={this.props.loggedIn}
        content={this.state.content}
        clickTab={this.clickTab}
        onLogin={this.props.onLogin}
        onRegister={this.props.onLogin}
        isError={this.props.isError}
        message={this.props.message}
      />
    );
  }
}

export default AccountWrapper;
