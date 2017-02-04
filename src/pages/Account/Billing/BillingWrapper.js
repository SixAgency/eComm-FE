import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BasePageComponent from '../../BasePageComponent';
import Billing from './Billing';

// Action
import { onLogout } from '../../../actions/user';
import { getAddress, createOrEditAddress } from '../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';

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
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogout: () => dispatch(onLogout()),
    createOrEditAddress: (data) => dispatch(createOrEditAddress(data)),
    getAddress: () => dispatch(getAddress()),
    resetMessages: () => dispatch(resetMessages()),
  }
));

class BillingWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    emailAddress: PropTypes.string.isRequired,
    billing: PropTypes.object.isRequired,
    createOrEditAddress: PropTypes.func.isRequired,
    getAddress: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
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

  componentDidMount = () => {
    const { isLoaded } = this.props.billing;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('next');
    const { isLoaded } = nextProps.billing;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  }

  onSubmit = (address) => {
    const data = {
      address,
      address_type: 'bill_address',
    };
    this.props.createOrEditAddress(data);
  }

  render() {
    const address = this.props.billing.address || {
      id: 0,
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
