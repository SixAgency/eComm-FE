import React, { PropTypes } from 'react';
import Shipping from './Shipping';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';

class ShippingWrapper extends React.Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    selectedAddress: PropTypes.number.isRequired,
    addresses: PropTypes.object.isRequired,
    emailAddress: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    getCart: () => (true),
    onLogout: () => (true),
    onLogin: () => (true),
    applyPromoCode: () => (true),
    emailAddress: '',
    messages: [],
    isError: false
  };

  constructor(props) {
    super(props);
    this.state = {
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide'
    };
  }

  onSubmit = () => (true);
  onCreate = () => (true);
  onFormCancel = () => (true);
  onFormSubmit = () => (true);
  handleLogin = () => (true);
  handleGiftCard = () => (true);
  clickTab = () => (true);

  render() {
    const showCancel = false;
    return (
      <Shipping
        loggedIn={this.props.loggedIn}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.couponClassName}
        handleLogin={this.handleLogin}
        loginClass={this.state.loginClassName}
        clickTab={this.clickTab}
        onSubmit={this.onSubmit}
        onFormCancel={this.onFormCancel}
        onFormSubmit={this.onFormSubmit}
        onCreate={this.onCreate}
        content="list"
        messages={this.props.messages}
        isError={this.props.isError}
        applyPromoCode={this.props.applyPromoCode}
        contentTabs={CHECKOUT_TABS}
        isActive="shipping"
        selectedAddress={this.props.selectedAddress}
        addresses={this.props.addresses.addresses}
        showCancel={showCancel}
        emailAddress={this.props.emailAddress}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default ShippingWrapper;

