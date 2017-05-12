import React, { PropTypes } from 'react';
import Checkout from '../../../components/Checkout';
import Promo from './Promo';

class PromoWrapper extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    messages: [],
    isError: false
  };

  render() {
    return (
      <Checkout
        state={this.props.cartItems.cart.state}
        content="promo"
        isPayPal={this.props.isPayPal}
        loggedIn={this.props.loggedIn}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
        forwardTo={() => (true)}
        onLogout={() => (true)}
        onLogin={() => (true)}
        applyPromoCode={() => (true)}
      >
        <Promo
          applyPromoCode={() => (true)}
          onProceed={() => (true)}
          setMessage={() => (true)}
          cartItems={this.props.cartItems}
          getCart={() => (true)}
        />
      </Checkout>
    );
  }
}

export default PromoWrapper;

