import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Checkout from '../../../components/Checkout';
import Billing from './Billing';

// Actions
import { setHeaderProps, resetMessages, toggleLoader, setPending } from '../../../actions/page';
import { onLogin, onLogout } from '../../../actions/user';
import { forwardTo } from '../../../actions/handler';
import { checkCartState } from '../../../utils/utils';
import { getAddresses } from '../../../actions/user_address';
import { getCart } from '../../../actions/order';
import { mapAddressFeedToState } from '../../../helpers/feed';
import { editOrderAddress, checkoutNext } from '../../../actions/checkout';

class BillingWrapper extends BasePageComponent {

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
    editOrderAddress: PropTypes.func.isRequired,
    checkoutNext: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      address: props.addresses.billing,
      showForm: false
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
    if (!nextProps.isPending) {
      const expectedState = checkCartState(nextProps);
      if (expectedState !== 'cart' && expectedState !== 'checkout/shipping' && !nextProps.isPayPal) {
        if (!nextProps.isError) {
          this.setState(this.updateState(nextProps, expectedState));
        }
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 500);
      } else {
        forwardTo(expectedState);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  getBillingAddress = () => {
    const { billing } = this.props.addresses;
    if (billing.id) {
      return billing;
    }
    return mapAddressFeedToState(this.props.cartItems.cart.bill_address);
  };

  updateState = (props, expextedState) => {
    if (expextedState !== 'checkout/billing') {
      return {
        editMode: true,
        address: mapAddressFeedToState(props.cartItems.cart.bill_address),
        showForm: true
      };
    }
    return {
      editMode: false,
      address: this.getBillingAddress(),
      showForm: false
    };
  };

  moveNext = () => {
    this.props.checkoutNext(() => forwardTo('checkout/promo'));
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { showForm, editMode } = this.state;
    // // not editing
    if (editMode) {
      const expectedState = checkCartState(this.props);
      this.props.editOrderAddress({
        id: this.state.address.id,
        address: this.state.address
      }, () => { this.props.setPending(false); forwardTo(expectedState); });
    } else {
      let address = mapAddressFeedToState(this.props.cartItems.cart.ship_address);
      if (showForm) {
        address = this.state.address;
      }
      this.props.editOrderAddress({
        id: this.props.cartItems.cart.bill_address.id,
        address
      }, this.moveNext);
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
    const address = { ...this.state.address, ...obj };
    this.setState({ address });
  };

  toggleContent = (event) => {
    const { editMode } = this.state;
    if (!editMode) {
      this.setState({
        showForm: Boolean(event.target.checked)
      });
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
          content="billing"
          isPayPal={this.props.isPayPal}
          loggedIn={this.props.loggedIn}
          breadcrumbs={this.props.route.breadcrumbs}
          messages={this.props.messages}
          isError={this.props.isError}
          forwardTo={forwardTo}
          onLogout={this.props.onLogout}
          onLogin={this.onLogin}
        >
          <Billing
            {...this.state}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            onFieldChange={this.onFieldChange}
            showCancel={expectedState !== 'checkout/billing'}
            toggleContent={this.toggleContent}
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
    checkoutNext: (fn) => dispatch(checkoutNext(fn)),
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

export default connect(mapStateToProps, mapDispatchToProps)(BillingWrapper);

