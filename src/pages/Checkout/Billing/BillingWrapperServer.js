import React, { PropTypes } from 'react';
import Billing from './Billing';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';

class BillingWrapper extends React.Component {

  static propTypes = {
    cartState: PropTypes.string.isRequired,
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    billing: PropTypes.object.isRequired,
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
      content: 'billing',
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide'
    };
  }

  onSubmit = () => (true);

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
    const address = this.props.billing.address || {
      firstname: '',
      lastname: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state_id: 0,
      zipcode: ''
    };
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
        billingAddress={address}
        onSubmit={this.onSubmit}
        emailAddress={this.props.emailAddress}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default BillingWrapper;

