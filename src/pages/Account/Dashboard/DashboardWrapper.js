import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Dashboard from './Dashboard';

// Utils
import { scrollToTop } from '../../../utils/utils';

// Action
import { onLogout, getProfile, redeemGiftCard, getStoreCredit, checkUser } from '../../../actions/user';
import { getAddresses } from '../../../actions/user_address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getAllOrders } from '../../../actions/order';
import { forwardTo } from '../../../actions/handler';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    addresses: state.user_address,
    orders: state.orders.orders,
    messages: state.page.messages,
    isError: state.page.isError,
    profile: state.user.profile,
    isFetched: (
      !state.page.isPending &&
      state.user_address.isFetched &&
      state.orders.orders.isLoaded &&
      state.user.profile.isLoaded &&
      state.user.creditInfo.isLoaded
    ),
    creditInfo: state.user.creditInfo
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    onRedeemGiftCard: (code) => dispatch(redeemGiftCard(code)),
    getInitialData: () => {
      dispatch(checkUser(() => {
        dispatch(getAddresses());
        dispatch(getProfile());
        dispatch(getAllOrders());
        dispatch(getStoreCredit());
      }), 'my-account');
    }
  }
));

class DashboardWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    resetMessages: PropTypes.func.isRequired,
    route: PropTypes.object,
    profile: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    onRedeemGiftCard: PropTypes.func.isRequired,
    creditInfo: PropTypes.object.isRequired,
    isFetched: PropTypes.bool.isRequired
  };

  componentWillMount = () => {
    scrollToTop(500);
    const headerProps = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(headerProps);
  };

  componentDidMount = () => {
    this.props.getInitialData();
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isFetched) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    } else {
      this.props.toggleLoader(true);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
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
    if (this.props.isFetched) {
      return (
        <Dashboard
          loggedIn={loggedIn}
          onLogout={this.props.onLogout}
          addresses={addresses}
          orders={orders}
          messages={messages}
          isError={isError}
          breadcrumbs={route.breadcrumbs}
          profile={profile}
          forwardTo={forwardTo}
          onRedeemGiftCard={onRedeemGiftCard}
          creditInfo={creditInfo}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
