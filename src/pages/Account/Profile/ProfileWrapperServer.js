import React, { PropTypes } from 'react';
import Profile from './Profile';

class ProfileWrapper extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      profile,
      breadcrumbs
    } = this.props;
    // Only logged in users can get here, so always true
    const loggedIn = true;
    const isError = false;
    const messages = [];
    return (
      <Profile
        loggedIn={loggedIn}
        profile={profile}
        breadcrumbs={breadcrumbs}
        messages={messages}
        isError={isError}
        onLogout={() => (true)}
        onUpdateProfile={() => (true)}
        forwardTo={() => (true)}
      />
    );
  }
}

export default ProfileWrapper;
