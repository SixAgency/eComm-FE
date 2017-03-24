import React, { PropTypes } from 'react';
import Profile from './Profile';

class ProfileWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array,
    profile: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  };

  static defaultProps = {
    loggedIn: true,
    messages: [],
    isError: false,
    profile: {}
  };

  onLogout = () => (true);
  onUpdateProfile = () => (true);
  resetMessages = () => (true);

  render() {
    return (
      <Profile
        loggedIn={this.props.loggedIn}
        onLogout={this.onLogout}
        profile={this.props.profile}
        onUpdateProfile={this.onUpdateProfile}
        resetMessages={this.resetMessages}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
      />
    );
  }
}

export default ProfileWrapper;
