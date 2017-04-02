import React, { PropTypes } from 'react';
import Review from './Review';

class ReviewWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    completePayPal: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired
  };

  static defaultProps = {
    setHeaderProps: () => (true),
    onLogout: () => (true),
    onLogin: () => (true),
    applyPromoCode: () => (true),
    completePayPal: () => (true),
    isPayPal: false,
    messages: [],
    isError: false,
    shipping: {},
    billing: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'review',
      showCouponFields: false,
      className: 'hide'
    };
  }

  getContentTabs = () => {
    const contentTabs = [
      {
        name: 'Billing Address',
        title: 'Billing Address',
        cname: 'billing',
        id: 'billing'
      },
      {
        name: 'Shipping Address',
        title: 'Shipping Address',
        cname: 'shipping',
        id: 'shipping'
      },
      {
        name: 'Apply Promotional Code',
        title: 'Apply Promotional Code',
        cname: 'promocode',
        id: 'promo'
      },
      {
        name: 'Review Order',
        title: 'Review Order',
        cname: 'review',
        id: 'review'
      }
    ];

    return contentTabs;
  };

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

  confirmOrder = () => (true);

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
        confirmOrder={this.confirmOrder}
        breadcrumbs={this.props.breadcrumbs}
      />
    );
  }
}

export default ReviewWrapper;

