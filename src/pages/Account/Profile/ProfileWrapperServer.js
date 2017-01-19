import React, { PropTypes } from 'react';
import Profile from './Profile';

class ProfileWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onLogout: () => (true),
    setHeaderProps: () => (true),
  }

  render() {
    return (
      <Profile loggedIn={this.props.loggedIn} onLogout={this.props.onLogout} />
    );
  }
}

export default ProfileWrapper;
