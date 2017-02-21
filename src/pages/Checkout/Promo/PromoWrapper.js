import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';
import BasePageComponent from '../../BasePageComponent';
import Promo from './Promo';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getCart, applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { forwardTo } from '../../../actions/handler';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart))
  }
));

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError
  }
));

class PromoWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    route: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'promo',
      showCouponFields: false,
      couponClassName: 'hide',
      showLoginFields: false,
      loginClassName: 'hide'
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
    if (!this.props.cartItems.isLoaded) {
      this.props.getCart();
    }
    if (this.props.cartItems.isEmpty) {
      browserHistory.push('/cart');
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    const { isLoaded } = nextProps.cartItems;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  };

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
    const target = e.target.id;
    forwardTo(`checkout/${target}`);
  };

  handleGiftCard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      couponClassName: !this.state.showCouponFields ? 'show' : 'hide'
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      showLoginFields: !this.state.showLoginFields,
      loginClassName: !this.state.showLoginFields ? 'show' : 'hide'
    });
  };

  onProceed = () => {
    forwardTo('checkout/review');
  };

  render() {
    return (
      <Promo
        cartItems={this.props.cartItems}
        loggedIn={this.props.loggedIn}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        handleGiftcard={this.handleGiftCard}
        couponClass={this.state.couponClassName}
        clickTab={this.clickTab}
        content={this.state.content}
        messages={this.props.messages}
        isError={this.props.isError}
        applyPromoCode={this.props.applyPromoCode}
        onProceed={this.onProceed}
        contentTabs={CHECKOUT_TABS}
        breadcrumbs={this.props.route.breadcrumbs}
        loginClass={this.state.loginClassName}
        handleLogin={this.handleLogin}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoWrapper);

