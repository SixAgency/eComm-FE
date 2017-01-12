import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Account from './Account';
// Action
import { onLogin, onRegister } from '../../../actions/user';
import setHeaderProps from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    onLogin: (data) => dispatch(onLogin(data)),
    onRegister: (data) => dispatch(onRegister(data)),
  }
));
class AccountWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'blogin',
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
  }

  clickTab = (event) => {
    event.preventDefault();
    this.setState({
      content: event.target.id,
    });
  }

  render() {
    const contentTabs = [
      {
        name: 'Login',
        title: 'Login',
        cname: 'login',
        id: 'blogin',
      },
      {
        name: 'Register',
        title: 'Register',
        cname: 'register',
        id: 'bregister',
      },
    ];
    return (
      <Account
        contentTabs={contentTabs}
        loggedIn={this.props.loggedIn}
        content={this.state.content}
        clickTab={this.clickTab}
        onLogin={this.props.onLogin}
        onRegister={this.props.onLogin}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountWrapper);
