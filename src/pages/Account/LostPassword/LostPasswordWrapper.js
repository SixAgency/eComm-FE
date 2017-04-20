import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BasePageComponent from '../../BasePageComponent';
import LostPassword from './LostPassword';

// Action
import { onLogout, resetPassword } from '../../../actions/user';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages()),
    onLogout: (data) => dispatch(onLogout(data)),
    resetPassword: (data) => dispatch(resetPassword(data))
  }
));

class LostPasswordWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    route: PropTypes.object
  };

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillUnmount = () => {
    console.log('remove');
    this.props.resetMessages();
    this.props.toggleLoader(true);
  };

  onSubmit = (data) => {
    const user = {
      spree_user: {
        email: data.authfield
      }
    };
    this.props.resetPassword(user);
  };

  render() {
    if (this.props.loggedIn) {
      browserHistory.push('/my-account/dashboard');
    }
    return (
      <LostPassword
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onSubmit={this.onSubmit}
        messages={this.props.messages}
        isError={this.props.isError}
        breadcrumbs={this.props.route.breadcrumbs}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LostPasswordWrapper);
