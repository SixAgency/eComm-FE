import React, { PropTypes } from 'react';
import Account from './Account';

class AccountWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    breadcrumbs: PropTypes.array
  };

  onLogin = (data) => (data);
  onLogout = (data) => (data);
  onRegister = (data) => (data);
  resetMessages = () => (true);
  clickTab = () => (true);

  render() {
    return (
      <Account
        loggedIn={this.props.loggedIn}
        activeTab="blogin"
        clickTab={this.clickTab}
        onLogin={this.onLogin}
        onRegister={this.onRegister}
        onLogout={this.onLogout}
        resetMessages={this.resetMessages}
        isError={this.props.isError}
        messages={this.props.messages}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default AccountWrapper;
