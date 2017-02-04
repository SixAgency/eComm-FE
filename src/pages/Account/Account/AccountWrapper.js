import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BasePageComponent from '../../BasePageComponent';
import Account from './Account';

// Action
import { onLogin, onRegister, onLogout } from '../../../actions/user';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogin: (data) => dispatch(onLogin(data)),
    onRegister: (data) => dispatch(onRegister(data)),
    resetMessages: () => dispatch(resetMessages()),
    onLogout: (data) => dispatch(onLogout(data)),
  }
));

class AccountWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    resetMessages: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'blogin',
    };
  }

  componentWillMount = () => {
    console.log('logged', this.props.loggedIn);
    if (this.props.loggedIn) {
      browserHistory.push('/my-account/dashboard');
    } else {
      const props = {
        headerClass: 'colored',
        activeSlug: '/my-account',
      };
      this.props.setHeaderProps(props);
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    console.log('next', nextProps);
    if (nextProps.loggedIn) {
      browserHistory.push('/my-account/dashboard');
    }
  };

  componentWillUnmount = () => {
    this.props.resetMessages();
    this.props.toggleLoader(true);
  };

  clickTab = (event) => {
    event.preventDefault();
    this.setState({
      content: event.target.id,
    });
  };

  render() {
    return (
      <Account
        loggedIn={this.props.loggedIn}
        content={this.state.content}
        clickTab={this.clickTab}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        onRegister={this.props.onRegister}
        messages={this.props.messages}
        isError={this.props.isError}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountWrapper);
