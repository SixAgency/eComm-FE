import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Billing from './Billing';
// Action
import { onLogout } from '../../../actions/user';
import { getAddress, addAddress } from '../../../actions/address';
import setHeaderProps from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    billing: state.address.billing,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    onLogout: () => dispatch(onLogout()),
    addAddress: (data) => dispatch(addAddress(data)),
    getAddress: () => dispatch(getAddress()),
  }
));
class BillingWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    billing: PropTypes.object.isRequired,
    addAddress: PropTypes.func.isRequired,
    getAddress: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (!this.props.billing.isLoaded) {
      this.props.getAddress();
    }
  }

  onSubmit = (address) => {
    this.props.addAddress(address);
  }

  render() {
    return (
      <Billing
        loggedIn={this.props.loggedIn}
        onSubmit={this.onSubmit}
        onLogout={this.props.onLogout}
        billingAddress={this.props.billing.address}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingWrapper);
