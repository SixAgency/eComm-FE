import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Checkout from '../../../components/Checkout';
import Promo from './Promo';

// Actions
import { setHeaderProps, resetMessages, toggleLoader, setMessage } from '../../../actions/page';
import { applyPromoCode, getCart } from '../../../actions/order';
import { onLogin, onLogout } from '../../../actions/user';
import { forwardTo } from '../../../actions/handler';
import { checkCartState } from '../../../utils/utils';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogin: (data, checkout) => dispatch(onLogin(data, checkout)),
    onLogout: () => dispatch(onLogout()),
    resetMessages: () => dispatch(resetMessages()),
    applyPromoCode: (cart, callback) => dispatch(applyPromoCode(cart, callback)),
    getCart: () => dispatch(getCart(false)),
    setMessage: (props) => dispatch(setMessage(props))
  }
));

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
    cartItems: state.cart.cartItems,
    isCartPending: state.cart.isCartPending,
    pagePending: state.page.isPending,
    isFetched: (
      !state.page.isPending &&
      !state.cart.isCartPending &&
      state.cart.cartItems.isLoaded
    )
  }
));

class PromoWrapper extends BasePageComponent {

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
    route: PropTypes.object.isRequired,
    isCartPending: PropTypes.bool.isRequired,
    setMessage: PropTypes.func.isRequired,
    isFetched: PropTypes.bool.isRequired
  };

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
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isFetched) {
      const expectedState = checkCartState(nextProps);
      if (['checkout/promo', 'checkout/review'].includes(expectedState)) {
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 500);
      } else {
        forwardTo(expectedState);
      }
    } else {
      this.props.toggleLoader(true);
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
   * Proceed handler
   */
  onSubmit = () => {
    forwardTo('checkout/review');
  };

  onLogin = (data) => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
    this.props.onLogin(data, true);
  };

  render() {
    if (this.props.isFetched) {
      return (
        <Checkout
          state={this.props.cartItems.cart.state}
          content="promo"
          loggedIn={this.props.loggedIn}
          breadcrumbs={this.props.route.breadcrumbs}
          messages={this.props.messages}
          isError={this.props.isError}
          forwardTo={forwardTo}
          onLogout={this.props.onLogout}
          onLogin={this.onLogin}
          applyPromoCode={this.props.applyPromoCode}
        >
          <Promo
            applyPromoCode={this.props.applyPromoCode}
            onProceed={this.onSubmit}
            getCart={this.props.getCart}
            setMessage={this.props.setMessage}
            cartItems={this.props.cartItems}
          />
        </Checkout>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoWrapper);

