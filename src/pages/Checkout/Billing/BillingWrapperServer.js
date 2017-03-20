import React, { PropTypes } from 'react';
import Billing from './Billing';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';

class BillingWrapper extends React.Component {

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
      content: 'list',
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

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      showLoginFields: !this.state.showLoginFields,
      loginClassName: !this.state.showLoginFields ? 'show' : 'hide'
    });
  };

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: !this.state.showCouponFields ? 'show' : 'hide'
    });
  };

  clickTab = (e) => {
    e.preventDefault();
    this.setState({
      content: e.target.id
    });
  };

  render() {
    const showCancel = false;
    return (
      <Billing
        loggedIn={this.props.loggedIn}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.couponClassName}
        handleLogin={this.handleLogin}
        loginClass={this.state.loginClassName}
        clickTab={this.clickTab}
        content={this.state.content}
        messages={this.props.messages}
        isError={this.props.isError}
        applyPromoCode={this.props.applyPromoCode}
        contentTabs={CHECKOUT_TABS}
        isActive="billing"
        selectedAddress={this.props.selectedAddress}
        addresses={this.props.addresses.addresses}
        onSubmit={this.onSubmit}
        onFormCancel={this.onFormCancel}
        onFormSubmit={this.onFormSubmit}
        onCreate={this.onCreate}
        showCancel={showCancel}
        emailAddress={this.props.emailAddress}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default BillingWrapper;

