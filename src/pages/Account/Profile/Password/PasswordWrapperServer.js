import React, { PropTypes } from 'react';
import Profile from '../Profile';

class PasswordWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onLogout: () => (true),
    loggedIn: true,
    updateProfile: () => (true),
    profile: {},
  }

  render() {
    return (
      <Profile
        profile={this.props.profile}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onUpdateProfile={this.props.updateProfile}
      />
    );
  }
}

export default PasswordWrapper;
