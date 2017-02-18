import React, { PropTypes } from 'react';
import Profile from './Profile';

class ProfileWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array,
    profile: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  }

  static defaultProps = {
    onLogout: () => (true),
    setHeaderProps: () => (true),
    loggedIn: true,
    updateProfile: () => (true),
    profile: {}
  }

  render() {
    return (
      <Profile
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        profile={this.props.profile}
        onUpdateProfile={this.props.updateProfile}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
      />
    );
  }
}

export default ProfileWrapper;
