import React, { PropTypes } from 'react';
import Password from './Password';

class PasswordWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    updatePassword: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  }

  static defaultProps = {
    onLogout: () => (true),
    loggedIn: true,
    updatePassword: () => (true),
    profile: {}
  }

  render() {
    return (
      <Password
        profile={this.props.profile}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onUpdatePassword={this.props.updatePassword}
        messages={this.props.messages}
        isError={this.props.isError}
      />
    );
  }
}

export default PasswordWrapper;
