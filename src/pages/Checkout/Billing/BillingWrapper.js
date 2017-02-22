import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';
import BasePageComponent from '../../BasePageComponent';
import Billing from './Billing';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getCart, applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { setBilling } from '../../../actions/checkout';
import { forwardTo } from '../../../actions/handler';
import { getAddress, createAddressNew } from '../../../actions/address';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    getCart: () => dispatch(getCart()),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
    getAddress: () => dispatch(getAddress()),
    setBilling: (id) => dispatch(setBilling(id)),
    createAddress: (data, message, callback) => dispatch(createAddressNew(
      data,
      message,
      callback
    ))
  }
));

const mapStateToProps = ((state) => (
  {
    billing: state.checkout.billing,
    addresses: state.address.addresses,
    loggedIn: state.user.loggedIn,
    emailAddress: state.user.emailAddress,
    messages: state.page.messages,
    isError: state.page.isError
  }
));

class BillingWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    billing: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    emailAddress: PropTypes.string.isRequired,
    getAddress: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    setBilling: PropTypes.func.isRequired
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

  componentWillMount = () => {
    if (this.props.addresses.isLoaded) {
      const content = this.props.addresses.isEmpty ? 'form' : 'list';
      this.setState({
        content,
      });
    } else {
      this.props.getAddress();
    }
    if (this.props.billing.isLoaded) {
      if (this.props.addresses.isLoaded && !this.props.billing.isSet) {
        this.setBillingFromAddresses(this.props.addresses);
      }
    } else {
      this.props.getCart();
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.addresses.isLoaded && nextProps.billing.isLoaded) {
      if (nextProps.billing.isSet) {
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 500);
      } else {
        this.setBillingFromAddresses(nextProps.addresses);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  setBillingFromAddresses = (addresses) => {
    let billingId = 0;
    const billing = addresses.addresses.filter((item) => (item.isBilling));
    if (billing.length > 0) {
      billingId = billing[0].id;
    }
    this.props.setBilling(billingId);
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

  onSubmit = (data) => {
    this.props.toggleLoader(true);
    this.props.setBilling(data);
    forwardTo('checkout/shipping');
  };

  onFormSubmit = (address) => {
    const data = {
      address
    };
    const message = 'Address created successfully.';
    this.props.createAddress(data, message, (resp) => {
      this.setState({
        content: 'list'
      });
      console.log(resp);
    });
  };

  onFormCancel = () => {
    window.scrollTo(0, 0);
    this.setState({
      content: 'list'
    });
  };

  onCreate = () => {
    window.scrollTo(0, 0);
    this.setState({
      content: 'form'
    });
  };

  render() {
    const showCancel = false;
    if (this.props.addresses.isLoaded && this.props.billing.isLoaded && this.props.billing.isSet) {
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
          isActive="billing"
          messages={this.props.messages}
          isError={this.props.isError}
          applyPromoCode={this.props.applyPromoCode}
          contentTabs={CHECKOUT_TABS}
          selectedAddress={this.props.billing.address}
          addresses={this.props.addresses.addresses}
          onSubmit={this.onSubmit}
          onFormSubmit={this.onFormSubmit}
          onCreate={this.onCreate}
          onCancel={this.onCancel}
          onFormCancel={this.onFormCancel}
          showCancel={showCancel}
          emailAddress={this.props.emailAddress}
          content={this.state.content}
          breadcrumbs={this.props.route.breadcrumbs}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingWrapper);

