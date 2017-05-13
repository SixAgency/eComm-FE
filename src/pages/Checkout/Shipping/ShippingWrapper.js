import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Checkout from '../../../components/Checkout';
import Shipping from './Shipping';

// Actions
import { setHeaderProps, resetMessages, toggleLoader, setPending } from '../../../actions/page';
import { onLogin, onLogout } from '../../../actions/user';
import { forwardTo } from '../../../actions/handler';
import { checkCartState } from '../../../utils/utils';
import { getAddresses } from '../../../actions/user_address';
import { getCart } from '../../../actions/order';
import { mapAddressFeedToState } from '../../../helpers/feed';
import { testPasswordStrength } from '../../../helpers/validators';
import { setCheckoutAddress, editOrderAddress, registerAndSetAddress } from '../../../actions/checkout';

class ShippingWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    cartItems: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    isPending: PropTypes.bool.isRequired,
    setPending: PropTypes.func.isRequired,
    setCheckoutAddress: PropTypes.func.isRequired,
    editOrderAddress: PropTypes.func.isRequired,
    registerAndSetAddress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      email: '',
      address: props.addresses.shipping,
      password: '',
      passwordValid: true,
      showRegister: false
    };
  }

  componentWillMount = () => {
    // Set the header styles
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    this.props.fetchData();
  };

  componentWillReceiveProps = (nextProps) => {
    console.log('itt', nextProps);
    if (!nextProps.isPending) {
      const expectedState = checkCartState(nextProps);
      if (expectedState !== 'cart' && !nextProps.isPayPal) {
        if (!nextProps.isError) {
          this.setState(this.updateState(nextProps, expectedState));
        }
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 500);
      } else {
        console.log('here', nextProps);
        forwardTo(expectedState);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  getEmailAddress = (props) => {
    const { cartItems } = props;
    return cartItems.cart.email || '';
  };

  updateState = (props, expextedState) => {
    if (expextedState !== 'checkout/shipping') {
      return {
        editMode: true,
        email: this.getEmailAddress(props),
        address: mapAddressFeedToState(props.cartItems.cart.ship_address),
        password: '',
        passwordValid: true,
        showRegister: false
      };
    }
    return {
      editMode: false,
      email: this.getEmailAddress(props),
      address: props.addresses.shipping,
      password: '',
      passwordValid: true,
      showRegister: false
    };
  };

  onRegisterCheck = () => {
    if (!this.state.showRegister) {
      this.setState({ password: '', passwordValid: false });
    } else {
      this.setState({ passwordValid: true });
    }
    this.setState({ showRegister: !this.state.showRegister });
  };

  onPasswordChange = (key, value) => {
    this.setState({
      password: value,
      passwordValid: !testPasswordStrength(value).isError
    });
  };

  getBillingAddress = (address) => {
    const { billing } = this.props.addresses;
    if (billing.id) {
      return billing;
    }
    return address;
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { showRegister, editMode } = this.state;
    // not editing
    if (!editMode) {
      // not with register
      if (this.props.loggedIn || !showRegister) {
        this.props.setCheckoutAddress({
          email: this.state.email,
          shipping: this.state.address,
          billing: this.getBillingAddress(this.state.address)
        });
      } else {
        // with registration
        const checkoutAddressFields = {
          email: this.state.email,
          shipping: this.state.address,
          billing: this.getBillingAddress(this.state.address)
        };
        const registrationFields = { email: this.state.email, password: this.state.password };
        this.props.registerAndSetAddress({ registrationFields, checkoutAddressFields });
      }
    } else {
      const expectedState = checkCartState(this.props);
      this.props.editOrderAddress({
        id: this.state.address.id,
        address: this.state.address
      }, () => { this.props.setPending(false); forwardTo(expectedState); });
    }
  };

  onCancel = (event) => {
    const expectedState = checkCartState(this.props);
    event.preventDefault();
    forwardTo(expectedState);
  };

  onFieldChange = (key, value) => {
    const obj = {};
    if (key === 'state') {
      obj[key] = parseInt(value, 10);
    } else {
      obj[key] = value;
    }
    if (key === 'email') {
      this.setState(obj);
    } else {
      const address = { ...this.state.address, ...obj };
      this.setState({ address });
    }
  };

  onLogin = (data) => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
    this.props.onLogin(data, true);
  };

  render() {
    if (this.props.cartItems.isLoaded && this.props.addresses.isFetched) {
      const expectedState = checkCartState(this.props);
      return (
        <Checkout
          state={this.props.cartItems.cart.state}
          content="shipping"
          isPayPal={this.props.isPayPal}
          loggedIn={this.props.loggedIn}
          breadcrumbs={this.props.route.breadcrumbs}
          messages={this.props.messages}
          isError={this.props.isError}
          forwardTo={forwardTo}
          onLogout={this.props.onLogout}
          onLogin={this.onLogin}
        >
          <Shipping
            {...this.state}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            onFieldChange={this.onFieldChange}
            onPassChange={this.onPasswordChange}
            onRegisterCheck={this.onRegisterCheck}
            showCancel={expectedState !== 'checkout/shipping'}
            loggedIn={this.props.loggedIn}
          />
        </Checkout>
      );
    }
    return null;
  }
}

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogin: (data, checkout) => dispatch(onLogin(data, checkout)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    setPending: (toggle) => dispatch(setPending(toggle)),
    getAddresses: () => dispatch(getAddresses()),
    fetchData: () => {
      dispatch(getCart(false));
      dispatch(getAddresses());
    },
    registerAndSetAddress: (data) => dispatch(registerAndSetAddress(data)),
    setCheckoutAddress: (data) => dispatch(setCheckoutAddress(data)),
    editOrderAddress: (data, fn) => dispatch(editOrderAddress(data, fn))
  }
));

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
    isPayPal: state.checkout.isPayPal,
    isPending: (
      state.page.isPending ||
      state.cart.isCartPending ||
      state.user_address.isFetching
    ),
    cartItems: state.cart.cartItems,
    addresses: state.user_address
  }
));

export default connect(mapStateToProps, mapDispatchToProps)(ShippingWrapper);

