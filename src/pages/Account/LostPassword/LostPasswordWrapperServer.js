import React, { PropTypes } from 'react';
import LostPassword from './LostPassword';

class LostPasswordWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  }

  static defaultProps = {
    onLogout: () => (true),
    resetPassword: () => (true)
  }

  onSubmit = () => (true);
  resetMessages = () => (true);

  render() {
    console.log('server');
    return (
      <LostPassword
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onSubmit={this.onSubmit}
        messages={this.props.messages}
        isError={this.props.isError}
        resetMessages={this.resetMessages}
      />
    );
  }
}

export default LostPasswordWrapper;
