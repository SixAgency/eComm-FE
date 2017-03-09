import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash.isempty';

import BasePageComponent from '../../BasePageComponent';
import Dashboard from './Dashboard';

// Action
import { onLogout, getProfile } from '../../../actions/user';
import { getAddress } from '../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getAllOrders } from '../../../actions/order';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    userName: state.user.userName,
    shipping: state.address.shipping,
    billing: state.address.billing,
    orders: state.orders.orders,
    messages: state.page.messages,
    isError: state.page.isError,
    profile: state.user.profile
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    onLogout: () => dispatch(onLogout()),
    getAddress: () => dispatch(getAddress()),
    resetMessages: () => dispatch(resetMessages()),
    getAllOrders: () => dispatch(getAllOrders()),
    getProfile: () => dispatch(getProfile())
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
    getAllOrders: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    resetMessages: PropTypes.func.isRequired,
    route: PropTypes.object,
    profile: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    window.scrollTo(0, 0);
    if (!this.props.loggedIn) {
      browserHistory.push('/my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
    if (!this.props.shipping.isLoaded && !this.props.billing.isLoaded) {
      this.props.getAddress();
    }
    if (!this.props.orders.isLoaded) {
      this.props.getAllOrders();
    }
    if (isEmpty(this.props.profile)) {
      this.props.getProfile();
    }
  };

  componentDidMount = () => {
    const billingLoaded = this.props.billing.isLoaded;
    const shippingLoaded = this.props.shipping.isLoaded;
    if (billingLoaded && shippingLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const billingLoaded = nextProps.billing.isLoaded;
    const shippingLoaded = nextProps.shipping.isLoaded;
    if (billingLoaded && shippingLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  onLogout = (event) => {
    event.preventDefault();
    this.props.onLogout();
  };

  render() {
    const addresses = {
      shippAddress: this.props.shipping,
      billAddress: this.props.billing
    };
    const orders = this.props.orders;
    return (
      <Dashboard
        userName={this.props.userName}
        loggedIn={this.props.loggedIn}
        onLogout={this.onLogout}
        addresses={addresses}
        orders={orders}
        messages={this.props.messages}
        isError={this.props.isError}
        breadcrumbs={this.props.route.breadcrumbs}
        profile={this.props.profile}
        resetMessages={this.props.resetMessages}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
