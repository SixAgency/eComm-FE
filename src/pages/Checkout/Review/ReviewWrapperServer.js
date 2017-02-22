import React, { PropTypes } from 'react';
import Review from './Review';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';

class ReviewWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    completePayPal: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    setHeaderProps: () => (true),
    getCart: () => (true),
    onLogout: () => (true),
    onLogin: () => (true),
    applyPromoCode: () => (true),
    completePayPal: () => (true),
    isPayPal: false,
    messages: [],
    isError: false
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'review',
      showCouponFields: false,
      className: 'hide'
    };
  }

  clickTab = (e) => {
    e.preventDefault();
    this.setState({
      content: e.target.id
    });
  };

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: !this.state.showCouponFields ? 'show' : 'hide'
    });
  };

  render() {
    const contentTabs = this.getContentTabs();
    return (
      <Review
        cartItems={this.props.cartItems}
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
        contentTabs={contentTabs}
        isPayPal={this.props.isPayPal}
        checkoutPayPal={this.props.completePayPal}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default ReviewWrapper;

