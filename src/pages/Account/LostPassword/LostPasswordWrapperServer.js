import React, { PropTypes } from 'react';
import LostPassword from './LostPassword';

class LostPasswordWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onLogout: () => (true),
  }

  onSubmit = () => (true)

  render() {
    console.log('server');
    return (
      <LostPassword
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default LostPasswordWrapper;
