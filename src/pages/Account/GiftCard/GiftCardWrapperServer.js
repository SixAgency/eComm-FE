import React, { PropTypes } from 'react';
import GiftCard from './GiftCard';

class GiftCardWrapper extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    creditInfo: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      loggedIn,
      creditInfo,
      breadcrumbs
    } = this.props;
    const isError = true;
    const messages = [];
    return (
      <GiftCard
        loggedIn={loggedIn}
        resetMessages={() => (true)}
        toggleLoader={() => (true)}
        onLogout={() => (true)}
        onLogin={() => (true)}
        onRegister={() => (true)}
        messages={messages}
        isError={isError}
        forwardTo={() => (true)}
        getStoreCredit={() => (true)}
        redeemGiftCard={() => (true)}
        setPending={() => (true)}
        creditInfo={creditInfo}
        breadcrumbs={breadcrumbs}
      />
    );
  }
}

export default GiftCardWrapper;
