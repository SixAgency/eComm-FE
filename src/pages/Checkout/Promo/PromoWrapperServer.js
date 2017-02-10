import React, { PropTypes } from 'react';
import Promo from './Promo';

class PromoWrapper extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    getCart: () => (true),
    onLogout: () => (true),
    applyPromoCode: () => (true),
    messages: [],
    isError: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'promo',
      showCouponFields: false,
      className: 'hide',
    };
  }

  onProceed: () => (true);

  getContentTabs = () => {
    const contentTabs = [
      {
        name: 'Billing Address',
        title: 'Billing Address',
        cname: 'billing',
        id: 'billing',
      },
      {
        name: 'Shipping Address',
        title: 'Shipping Address',
        cname: 'shipping',
        id: 'shipping',
      },
      {
        name: 'Apply Promotional Code',
        title: 'Apply Promotional Code',
        cname: 'promocode',
        id: 'promo',
      },
      {
        name: 'Review Order',
        title: 'Review Order',
        cname: 'review',
        id: 'review',
      },
    ];

    return contentTabs;
  };

  clickTab = (e) => {
    e.preventDefault();
    this.setState({
      content: e.target.id,
    });
  };

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: !this.state.showCouponFields ? 'show' : 'hide',
    });
  };

  render() {
    const contentTabs = this.getContentTabs();
    return (
      <Promo
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.className}
        clickTab={this.clickTab}
        content={this.state.content}
        applyPromoCode={this.props.applyPromoCode}
        contentTabs={contentTabs}
        onProceed={this.onProceed}
      />
    );
  }
}

export default PromoWrapper;

