import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Checkout from '../../../components/Checkout';
import Billing from './Billing';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { setCheckoutAddress } from '../../../actions/checkout';
import { forwardTo } from '../../../actions/handler';
import { getAddress } from '../../../actions/address';
import { checkCartState } from '../../../utils/utils';
import { mapStateToFeed, mapFeedToState } from '../../../helpers/address';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
    onSubmit: (data) => dispatch(setCheckoutAddress(data)),
    getAddress: () => dispatch(getAddress())
  }
));

const mapStateToProps = ((state) => (
  {
    addresses: state.address.addresses,
    isAddressesFetching: state.address.isFetching,
    loggedIn: state.user.loggedIn,
    profile: state.user.profile,
    messages: state.page.messages,
    isError: state.page.isError,
    cartItems: state.cart.cartItems,
    isCartPending: state.cart.isCartPending,
    isPayPal: state.checkout.isPayPal,
    isPending: state.page.isPending
  }
));

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
    applyPromoCode: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    isAddressesFetching: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    isCartPending: PropTypes.bool.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isPending: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'list'
    };
  }

  componentWillMount = () => {
    // Set the header styles
    this.setHeaderStyles();
    // Get the addresses
    this.props.getAddress();
    // This actions should happen only if the cart
    // is already loaded
    if (this.props.cartItems.isLoaded) {
      const expectedState = checkCartState(this.props);
      // Get Addresses and set content type
      if (expectedState === 'cart' && !this.props.isPayPal) {
        forwardTo(expectedState);
      }
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.isCartPending && !nextProps.isPending) {
      const expectedState = checkCartState(nextProps);
      if (expectedState !== 'cart' && !nextProps.isPayPal) {
        if (!nextProps.isAddressesFetching && !nextProps.isError) {
          this.setState({ content: this.getBillingContent(nextProps) });
          setTimeout(() => {
            this.props.toggleLoader(false);
          }, 500);
        }
      } else {
        forwardTo(expectedState);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  /**
   * Helper Method to set the active nav item
   * and header styles
   */
  setHeaderStyles = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
  };

  /**
   * Helper method to identify
   * the content type shown
   * @param props
   * @returns {*}
   */
  getBillingContent = (props) => {
    const { loggedIn, addresses } = props;
    return (addresses.isEmpty || !loggedIn) ? 'form' : 'list';
  };

  /**
   * Get selected address from user addresses
   * @param id
   * @param email
   * @returns object
   */
  getSelectedAddress = (id, email) => {
    const { addresses } = this.props;
    const address = addresses.addresses.find((elem) => (elem.id === id));
    return mapFeedToState(address, email);
  };

  /**
   * Select from existing addresses handler
   * @param fields
   */
  onSubmit = (fields) => {
    const { content } = this.state;
    const { onSubmit } = this.props;
    let address = fields;
    if (content === 'list') {
      address = this.getSelectedAddress(fields.addressId, fields.email);
    }
    onSubmit({
      address: mapStateToFeed(address),
      email: fields.email
    });
  };

  /**
   * Switch to use a different address view
   */
  toggleContent = () => {
    const content = this.state.content === 'form' ? 'list' : 'form';
    this.setState({ content });
  };

  /**
   * Returns the customer default address
   * @returns {number}
   */
  getDefaultAddressId = () => {
    const { addresses } = this.props;
    const address = addresses.addresses.find((elem) => elem.isBilling);
    return address ? address.id : 0;
  };

  /**
   * Returns the customer email address used in order
   * @returns {string}
   */
  getEmailAddress = () => {
    const { cartItems } = this.props;
    return cartItems.cart.email || '';
  };

  /**
   * Get when the cancel button should be show
   * @returns {boolean}
   */
  getShowCancel = () => {
    const { addresses, loggedIn } = this.props;
    const { content } = this.state;
    return (content === 'form' && loggedIn && !addresses.isEmpty);
  };

  render() {
    if (this.props.cartItems.isLoaded && this.props.addresses.isLoaded) {
      const selectedAddress = this.getDefaultAddressId();
      const emailAddress = this.getEmailAddress();
      const showCancel = this.getShowCancel();
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
          onLogin={this.props.onLogin}
          applyPromoCode={this.props.applyPromoCode}
        >
          <Billing
            content={this.state.content}
            emailAddress={emailAddress}
            addresses={this.props.addresses.addresses}
            selectedAddress={selectedAddress}
            onSubmit={this.onSubmit}
            toggleContent={this.toggleContent}
            showCancel={showCancel}
          />
        </Checkout>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingWrapper);

