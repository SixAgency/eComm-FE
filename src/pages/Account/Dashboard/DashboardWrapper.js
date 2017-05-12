import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { forwardTo } from '../../../actions/handler';

import BasePageComponent from '../../BasePageComponent';
import Dashboard from './Dashboard';

// Action
import { onLogout, getProfile, redeemGiftCard, getStoreCredit } from '../../../actions/user';
import { getAddresses } from '../../../actions/user_address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getAllOrders } from '../../../actions/order';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    addresses: state.user_address,
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
    getAddresses: () => dispatch(getAddresses()),
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
    getAddresses: PropTypes.func.isRequired,
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
    // Check if the user is logged in
    // set the header styles and fetch page data
    this.checkLoggedIn(this.props, () => {
      this.setHeaderStyles();
      this.fetchPageData();
    });
  };

  componentWillReceiveProps = (nextProps) => {
    const addresses = nextProps.addresses;
    const profileLoaded = nextProps.profile.isLoaded;
    const ordersLoaded = nextProps.orders.isLoaded;
    if (profileLoaded && ordersLoaded && !addresses.isFetching) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  checkLoggedIn = (props, fn) => {
    const { loggedIn } = props;
    if (loggedIn) {
      return fn();
    }
    return forwardTo('my-account');
  };

  setHeaderStyles = () => {
    const headerStyles = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(headerStyles);
  };

  fetchPageData = () => {
    this.props.getProfile();
    this.props.getAddresses();
    this.props.getStoreCredit();
    this.props.getAllOrders();
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
    if (profile.isLoaded && orders.isLoaded && !addresses.isFetching) {
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
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
