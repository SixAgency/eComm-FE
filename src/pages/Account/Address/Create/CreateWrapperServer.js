import React, { PropTypes } from 'react';
import Create from './Create';

class CreateWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    emailAddress: PropTypes.string.isRequired,
    messages: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    onLogout: () => (true),
    messages: [],
    isError: false,
  };

  onSubmit = () => (true);
  onCancel = () => (true);

  render() {
    const address = {
      firstname: '',
      lastname: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state_id: 0,
      zipcode: '',
    };
    return (
      <Create
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        emailAddress={this.props.emailAddress}
        messages={this.props.messages}
        isError={this.props.isError}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        address={address}
      />
    );
  }
}

export default CreateWrapper;
