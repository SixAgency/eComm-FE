import React, { PropTypes } from 'react';
import Account from './Account';

class AccountWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setHeaderProps: () => (true),
    onLogin: (data) => (data),
    onRegister: (data) => (data),
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
      />
    );
  }
}

export default AccountWrapper;
