import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Profile from './Profile';

// Utils
import { scrollToTop } from '../../../utils/utils';

// Action
import { onLogout, getProfile, updateProfile, checkUser } from '../../../actions/user';
import { setHeaderProps, toggleLoader } from '../../../actions/page';
import { forwardTo } from '../../../actions/handler';

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
    getProfile: () => dispatch(getProfile()),
    updateProfile: (data) => dispatch(updateProfile(data)),
    checkUser: (callback, redirect) => dispatch(checkUser(callback, redirect))
  }
));


class ProfileWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    route: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    checkUser: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    scrollToTop(500);
    this.props.checkUser(() => {
      this.props.getProfile();
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }, 'my-account');
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  };

  onUpdateProfile = (data) => {
    scrollToTop(500);
    this.props.updateProfile(data);
  };

  render() {
    return (
      <Profile
        profile={this.props.profile}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onUpdateProfile={this.onUpdateProfile}
        breadcrumbs={this.props.route.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
        forwardTo={forwardTo}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);

