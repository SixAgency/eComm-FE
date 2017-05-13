import React, { PropTypes } from 'react';
import Account from './Account';

class AccountWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      loggedIn,
      breadcrumbs
    } = this.props;
    const isError = false;
    const messages = [];
    return (
      <Account
        loggedIn={loggedIn}
        activeTab="blogin"
        clickTab={() => (true)}
        onLogin={() => (true)}
        onRegister={() => (true)}
        onLogout={() => (true)}
        forwardTo={() => (true)}
        isError={isError}
        messages={messages}
        breadcrumbs={breadcrumbs}
      />
    );
  }
}

export default AccountWrapper;
