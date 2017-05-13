import React, { PropTypes } from 'react';
import Password from './Password';

class PasswordWrapper extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      profile,
      breadcrumbs
    } = this.props;
    // Only loggedIn users can get here - so always true
    const loggedIn = true;
    const isError = true;
    const messages = [];
    return (
      <Password
        profile={profile}
        breadcrumbs={breadcrumbs}
        isError={isError}
        messages={messages}
        loggedIn={loggedIn}
        onLogout={() => (true)}
        onUpdatePassword={() => (true)}
        forwardTo={() => (true)}
      />
    );
  }
}

export default PasswordWrapper;
