import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Billing from './Billing';
// Action
import { onLogout } from '../../../actions/user';
import { getAddress, addAddress } from '../../../actions/address';
import setHeaderProps from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    emailAddress: state.user.emailAddress,
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
    emailAddress: PropTypes.string.isRequired,
    billing: PropTypes.object.isRequired,
    addAddress: PropTypes.func.isRequired,
    getAddress: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    if (!this.props.loggedIn) {
      browserHistory.push('/my-account');
    }
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
    const data = {
      address,
      address_type: ['bill_address'],
    }
    this.props.addAddress(data);
  }

  render() {
    const address = this.props.billing.address || {
      firstname: '',
      lastname: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state_id: 0,
      zipcode: '',
    };
    return (
      <Billing
        loggedIn={this.props.loggedIn}
        onSubmit={this.onSubmit}
        onLogout={this.props.onLogout}
        emailAddress={this.props.emailAddress}
        billingAddress={address}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingWrapper);
