import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
// Action
import { onLogout } from '../../../actions/user';
import { getAddress } from '../../../actions/address';
import setHeaderProps from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    shipping: state.address.shipping,
    billing: state.address.billing,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    onLogout: () => dispatch(onLogout()),
    getAddress: () => dispatch(getAddress()),
  }
));
class DashboardWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (!this.props.shipping.isLoaded && !this.props.billing.isLoaded) {
      this.props.getAddress();
    }
  }

  render() {
    const addresses = {
      shippAddress: this.props.shipping.address,
      billAddress: this.props.billing.address,
    }
    return (
      <Dashboard
        userName={this.props.userName}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        addresses={addresses}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
