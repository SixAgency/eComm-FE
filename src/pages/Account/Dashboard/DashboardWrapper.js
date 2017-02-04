import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BasePageComponent from '../../BasePageComponent';
import Dashboard from './Dashboard';

// Action
import { onLogout } from '../../../actions/user';
import { getAddress } from '../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    userName: state.user.userName,
    shipping: state.address.shipping,
    billing: state.address.billing,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    onLogout: () => dispatch(onLogout()),
    getAddress: () => dispatch(getAddress()),
    resetMessages: () => dispatch(resetMessages()),
  }
));

class DashboardWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    getAddress: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    if (!this.props.loggedIn) {
      console.log('step one');
      browserHistory.push('/my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (!this.props.shipping.isLoaded && !this.props.billing.isLoaded) {
      this.props.getAddress();
    }
  }

  componentDidMount = () => {
    const billingLoaded = this.props.billing.isLoaded;
    const shippingLoaded = this.props.shipping.isLoaded;
    if (billingLoaded && shippingLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const billingLoaded = nextProps.billing.isLoaded;
    const shippingLoaded = nextProps.shipping.isLoaded;
    if (billingLoaded && shippingLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  }

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  }

  onLogout = (event) => {
    event.preventDefault();
    this.props.onLogout();
  }

  render() {
    const addresses = {
      shippAddress: this.props.shipping,
      billAddress: this.props.billing,
    };

    return (
      <Dashboard
        userName={this.props.userName}
        loggedIn={this.props.loggedIn}
        onLogout={this.onLogout}
        addresses={addresses}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
