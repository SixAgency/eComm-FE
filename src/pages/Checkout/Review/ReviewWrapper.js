import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Checkout from '../../../components/Checkout';
import Review from './Review';

// Actions
import { setHeaderProps, resetMessages, toggleLoader, toggleModal } from '../../../actions/page';
import { applyPromoCode } from '../../../actions/order';
import { onLogin, onLogout, getStoreCredit, applyStoreCredit } from '../../../actions/user';
import { completePayPal } from '../../../actions/checkout';
import { forwardTo } from '../../../actions/handler';
import { confirmOrder, checkoutReset } from '../../../actions/payment/payment';
import { checkCartState } from '../../../utils/utils';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    toggleModal: (toggle) => dispatch(toggleModal(toggle)),
    onLogin: (data) => dispatch(onLogin(data)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart) => dispatch(applyPromoCode(cart)),
    completePayPal: () => dispatch(completePayPal()),
    confirmOrder: () => (dispatch(confirmOrder())),
    checkoutReset: () => dispatch(checkoutReset()),
    getStoreCredit: () => dispatch(getStoreCredit()),
    applyStoreCredit: (data) => dispatch(applyStoreCredit(data))
  }
));

const mapStateToProps = ((state) => (
  {
    cartItems: state.cart.cartItems,
    isCartPending: state.cart.isCartPending,
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
    isPayPal: state.checkout.isPayPal,
    isPending: state.page.isPending,
    creditInfo: state.user.creditInfo
  }
));

class ReviewWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    completePayPal: PropTypes.func.isRequired,
    isPending: PropTypes.bool.isRequired,
    isCartPending: PropTypes.bool.isRequired,
    route: PropTypes.object,
    getStoreCredit: PropTypes.func.isRequired,
    creditInfo: PropTypes.object.isRequired,
    applyStoreCredit: PropTypes.func.isRequired,
    checkoutReset: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      useCredits: false
    };
  }

  componentWillMount = () => {
    // Set the header styles
    this.setHeaderStyles();
    // This actions should happen only if the cart
    // is already loaded
    if (this.props.cartItems.isLoaded) {
      const expectedState = checkCartState(this.props);
      if (['checkout/promo', 'checkout/review'].includes(expectedState)) {
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 500);
      } else {
        forwardTo(expectedState);
      }
    }
    if (!this.props.creditInfo.isLoaded) {
      this.props.getStoreCredit();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.isCartPending && !nextProps.isPending && nextProps.cartItems.isLoaded) {
      const expectedState = checkCartState(nextProps);
      if (['checkout/promo', 'checkout/review'].includes(expectedState)) {
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

  checkoutPayPal = (e) => {
    e.preventDefault();
    this.props.toggleLoader(true);
    this.props.completePayPal();
  };

  checkoutSquare = (e) => {
    e.preventDefault();
    this.props.toggleModal(true);
  };

  confirmOrder = (e) => {
    e.preventDefault();
    this.props.confirmOrder();
  };

  toggleUseCredits = () => {
    this.setState({ useCredits: !this.state.useCredits });
    this.props.applyStoreCredit({
      apply_store_credit: true
    });
  };

  render() {
    if (this.props.cartItems.isLoaded) {
      return (
        <Checkout
          state={this.props.cartItems.cart.state}
          content="review"
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
          <Review
            cartItems={this.props.cartItems}
            isPayPal={this.props.isPayPal}
            checkoutPayPal={this.checkoutPayPal}
            checkoutSquare={this.checkoutSquare}
            confirmOrder={this.confirmOrder}
            creditInfo={this.props.creditInfo}
            toggleUseCredits={this.toggleUseCredits}
            useCredits={this.state.useCredits}
            applyStoreCredit={this.props.applyStoreCredit}
            checkoutReset={this.props.checkoutReset}
          />
        </Checkout>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewWrapper);

