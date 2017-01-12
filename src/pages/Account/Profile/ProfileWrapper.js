import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
// Action
import { onLogout } from '../../../actions/user';
import setHeaderProps from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    onLogout: () => dispatch(onLogout()),
  }
));
class ProfileWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onLogout: () => (true),
    setHeaderProps: () => (true),
  }

  render() {
    return (
      <Profile loggedIn={this.props.loggedIn} onLogout={this.props.onLogout} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);

