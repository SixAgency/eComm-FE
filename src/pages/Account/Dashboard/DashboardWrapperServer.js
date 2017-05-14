import React, { PropTypes } from 'react';
import Dashboard from './Dashboard';

class DashboardWrapper extends React.Component {
  static propTypes = {
    addresses: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    creditInfo: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      profile,
      addresses,
      orders,
      breadcrumbs,
      creditInfo
    } = this.props;
    /* Only logged in users can land here */
    const loggedIn = true;
    const isError = false;
    const messages = [];
    return (
      <Dashboard
        loggedIn={loggedIn}
        profile={profile.profile}
        addresses={addresses}
        orders={orders}
        creditInfo={creditInfo}
        breadcrumbs={breadcrumbs}
        messages={messages}
        isError={isError}
        onLogout={() => (true)}
        forwardTo={() => (true)}
        onRedeemGiftCard={() => (true)}
        getStoreCredits={() => (true)}
      />
    );
  }
}

export default DashboardWrapper;
