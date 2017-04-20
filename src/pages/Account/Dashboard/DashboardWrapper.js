import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BasePageComponent from '../../BasePageComponent';
import Dashboard from './Dashboard';

// Action
import { onLogout, getProfile, redeemGiftCard, getStoreCredit } from '../../../actions/user';
import { getAddress } from '../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getAllOrders } from '../../../actions/order';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    addresses: state.address,
    orders: state.orders.orders,
    messages: state.page.messages,
    isError: state.page.isError,
    profile: state.user.profile,
    creditInfo: state.user.creditInfo
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
    getProfile: () => dispatch(getProfile()),
    onRedeemGiftCard: (code) => dispatch(redeemGiftCard(code)),
    getStoreCredit: () => dispatch(getStoreCredit())
  }
));

class DashboardWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
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
    profile: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    onRedeemGiftCard: PropTypes.func.isRequired,
    getStoreCredit: PropTypes.func.isRequired,
    creditInfo: PropTypes.object.isRequired
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
    if (!this.props.addresses.addresses.isLoaded) {
      this.props.getAddress();
    }
    if (!this.props.orders.isLoaded) {
      this.props.getAllOrders();
    }
    if (!this.props.profile.isLoaded) {
      this.props.getProfile();
    }
    this.props.getStoreCredit();
  };

  componentWillReceiveProps = (nextProps) => {
    const addressesLoaded = nextProps.addresses.addresses.isLoaded;
    const profileLoaded = nextProps.profile.isLoaded;
    const ordersLoaded = nextProps.orders.isLoaded;
    if (profileLoaded && addressesLoaded && ordersLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
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
    const {
      profile,
      addresses,
      orders,
      creditInfo,
      messages,
      isError,
      route,
      onRedeemGiftCard,
      loggedIn
    } = this.props;
    if (profile.isLoaded && orders.isLoaded && addresses.addresses.isLoaded) {
      return (
        <Dashboard
          loggedIn={loggedIn}
          onLogout={this.onLogout}
          addresses={addresses}
          orders={orders}
          messages={messages}
          isError={isError}
          breadcrumbs={route.breadcrumbs}
          profile={profile}
          resetMessages={this.props.resetMessages}
          onRedeemGiftCard={onRedeemGiftCard}
          creditInfo={creditInfo}
          getStoreCredit={this.props.getStoreCredit}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
