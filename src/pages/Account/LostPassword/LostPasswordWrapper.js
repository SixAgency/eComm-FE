import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LostPassword from './LostPassword';
// Action
import { onLogout } from '../../../actions/user';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    message: state.page.message,
    isError: state.page.isError,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages()),
    onLogout: (data) => dispatch(onLogout(data)),
  }
));
class LostPasswordWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
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

  onSubmit = (event) => {
    event.preventDefault();
    console.log('submited');
  }

  render() {
    if (this.props.loggedIn) {
      browserHistory.push('/my-account/dashboard');
    }
    return (
      <LostPassword
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LostPasswordWrapper);
