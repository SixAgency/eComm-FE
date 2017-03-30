import React, { PropTypes } from 'react';
import ResetPassword from './ResetPassword';

class ResetPasswordWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired
  }

  static defaultProps = {
  }

  onSubmit = () => (true);
  resetMessages = () => (true);

  render() {
    console.log('server');
    return (
      <ResetPassword
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onSubmit={this.onSubmit}
        messages={this.props.messages}
        resetMessages={this.resetMessages}
        params={this.props.params}
      />
    );
  }
}

export default ResetPasswordWrapper;
