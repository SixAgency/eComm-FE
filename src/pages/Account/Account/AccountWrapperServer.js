import React, { PropTypes } from 'react';
import Account from './Account';

class AccountWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    onLogin: (data) => (data),
    onLogout: (data) => (data),
    onRegister: (data) => (data)
  };

  clickTab = () => (true);

  render() {
    return (
      <Account
        loggedIn={this.props.loggedIn}
        content="blogin"
        clickTab={this.clickTab}
        onLogin={this.props.onLogin}
        onRegister={this.props.onRegister}
        onLogout={this.props.onLogout}
        isError={this.props.isError}
        messages={this.props.messages}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default AccountWrapper;
