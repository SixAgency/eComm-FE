import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { CHECKOUT_TABS } from '../../../constants/AppConsts';
import BasePageComponent from '../../BasePageComponent';
import Shipping from './Shipping';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { getCart, applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { setShipping, checkoutAddresses } from '../../../actions/checkout';
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
    setShipping: (id) => dispatch(setShipping(id)),
    checkoutAddresses: (data) => dispatch(checkoutAddresses(data)),
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
    shipping: state.checkout.shipping,
    addresses: state.address.addresses,
    loggedIn: state.user.loggedIn,
    emailAddress: state.user.emailAddress,
    messages: state.page.messages,
    isPayPal: state.checkout.isPayPal,
    isError: state.page.isError,
    isPending: state.page.isPending
  }
));

class ShippingWrapper extends BasePageComponent {

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
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    emailAddress: PropTypes.string.isRequired,
    getAddress: PropTypes.func.isRequired,
    setShipping: PropTypes.func.isRequired,
    checkoutAddresses: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    route: PropTypes.object
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
        content
      });
    } else {
      this.props.getAddress();
    }
    if (!this.props.billing.isLoaded || !this.props.shipping.isLoaded) {
      this.props.getCart();
    }
    if (this.props.billing.isLoaded && !this.props.billing.isSet) {
      forwardTo('checkout/billing');
    }
    if (this.props.shipping.isLoaded) {
      if (this.props.addresses.isLoaded && !this.props.shipping.isSet) {
        this.setShippingFromAddresses(this.props.addresses);
      }
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
    console.log(nextProps);
    if (nextProps.addresses.isLoaded && nextProps.shipping.isLoaded && nextProps.billing.isLoaded) {
      if (!nextProps.billing.isSet) {
        forwardTo('checkout/billing');
      } else if (nextProps.shipping.isSet) {
          if (!nextProps.isPending) {
            setTimeout(() => {
              this.props.toggleLoader(false);
            }, 500);
          }
      } else {
        this.setShippingFromAddresses(nextProps.addresses);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  setShippingFromAddresses = (addresses) => {
    let shippingId = 0;
    const shipping = addresses.addresses.filter((item) => (item.isShipping));
    if (shipping.length > 0) {
      shippingId = shipping[0].id;
    }
    this.props.setShipping(shippingId);
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

  onSubmit = (shipping) => {
    const data = {
      addresses: this.props.addresses.addresses,
      billing: this.props.billing.address,
      isPayPal: this.props.isPayPal,
      shipping
    };
    this.props.setShipping(shipping);
    this.props.checkoutAddresses(data);
  };

  onFormSubmit = (address) => {
    const data = {
      address
    };
    const message = 'Address created successfully.';
    this.props.createAddress(data, message, (newAddress) => {
      this.setState({
        content: 'list'
      });
      this.props.setShipping(newAddress.id);
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
    if (this.props.addresses.isLoaded &&
      this.props.shipping.isLoaded &&
      this.props.shipping.isSet) {
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
          isActive="shipping"
          messages={this.props.messages}
          isError={this.props.isError}
          applyPromoCode={this.props.applyPromoCode}
          contentTabs={CHECKOUT_TABS}
          selectedAddress={this.props.shipping.address}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShippingWrapper);

