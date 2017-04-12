import React, { PropTypes } from 'react';
import ResetPassword from './ResetPassword';

class ResetPasswordWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      loggedIn,
      breadcrumbs
    } = this.props;
    const isError = true;
    const messages = [];
    return (
      <ResetPassword
        loggedIn={loggedIn}
        onLogout={() => (true)}
        onSubmit={() => (true)}
        messages={messages}
        isError={isError}
        resetMessages={() => (true)}
        breadcrumbs={breadcrumbs}
      />
    );
  }
}

export default ResetPasswordWrapper;
