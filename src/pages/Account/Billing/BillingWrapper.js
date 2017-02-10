import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Billing from './Billing';

// Action
import { onLogout } from '../../../actions/user';
import { getAddress, setBillingAddress } from '../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { forwardTo } from '../../../actions/handler';

const mapStateToProps = ((state) => (
  {
    emailAddress: state.user.emailAddress,
    loggedIn: state.user.loggedIn,
    billing: state.address.billing,
    addresses: state.address.addresses,
    messages: state.page.messages,
    isError: state.page.isError,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogout: () => dispatch(onLogout()),
    setBillingAddress: (data) => dispatch(setBillingAddress(data)),
    getAddress: () => dispatch(getAddress()),
    resetMessages: () => dispatch(resetMessages()),
  }
));

class BillingWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    billing: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      address: null,
    };
  }

  componentWillMount = () => {
    if (!this.props.loggedIn) {
      forwardTo('my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (!this.props.billing.isLoaded || !this.props.addresses.isLoaded) {
      this.props.getAddress();
    }
  };

  componentDidMount = () => {
    const billingLoaded = this.props.billing.isLoaded;
    const addressesLoaded = this.props.addresses.isLoaded;
    if (billingLoaded && addressesLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { isLoaded, isEmpty } = nextProps.billing;
    if (isLoaded) {
      if (isEmpty) {
        forwardTo('my-account/address/billing');
      } else {
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 250);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  };

  onSubmit = () => {
    const address = {
      default_bill_address: this.state.address,
    };
    this.props.setBillingAddress(address);
  };

  onSelect = (val) => {
    this.setState({
      address: val,
    });
    console.log(this.state.address);
  };

  onCancel = () => {
    forwardTo('my-account/dashboard');
  };

  onCreate = () => {
    forwardTo('my-account/address/billing');
  };

  render() {
    if (this.props.billing.isLoaded && this.props.addresses.isLoaded) {
      return (
        <Billing
          loggedIn={this.props.loggedIn}
          onLogout={this.props.onLogout}
          address={this.props.billing.address.id}
          addresses={this.props.addresses.addresses}
          messages={this.props.messages}
          isError={this.props.isError}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          onSelect={this.onSelect}
          onCreate={this.onCreate}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingWrapper);
