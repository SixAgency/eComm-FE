import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Components
import BasePageComponent from '../../BasePageComponent';
import ResetPassword from './ResetPassword';

// Action
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
    resetMessages: () => dispatch(resetMessages())
  }
));

class ResetPasswordWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.resetMessages();
    this.props.toggleLoader(true);
  }

  onSubmit = (data) => {
    const user = {
      spree_user: {
        reset_password_token: this.props.params.param,
        password: data
      }
    };
    console.log('SUBMITED', user);
  }

  render() {
    if (this.props.loggedIn) {
      browserHistory.push('/my-account/dashboard');
    }
    return (
      <ResetPassword
        loggedIn={this.props.loggedIn}
        messages={this.props.messages}
        isError={this.props.isError}
        onSubmit={this.onSubmit}
        params={this.props.params}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordWrapper);
