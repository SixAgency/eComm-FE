import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BasePageComponent from '../../../BasePageComponent';
import Password from './Password';

// Action
import { onLogout, getProfile, updatePassword } from '../../../../actions/user';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    profile: state.user.profile,
    messages: state.page.messages,
    isError: state.page.isError
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    getProfile: () => dispatch(getProfile()),
    updatePassword: (data) => dispatch(updatePassword(data))
  }
));


class PasswordWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    resetMessages: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    if (!this.props.loggedIn) {
      browserHistory.push('/my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
    if (!this.props.profile) {
      this.props.getProfile();
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
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
        resetMessages={this.props.resetMessages}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordWrapper);

