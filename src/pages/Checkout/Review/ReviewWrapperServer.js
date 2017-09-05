import React, { PropTypes, Component } from 'react';

import Checkout from '../../../components/Checkout';
import Review from './Review';

class ReviewWrapper extends Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isStoreCredit: PropTypes.bool.isRequired,
    canUseStoreCredit: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    isError: false,
    messages: []
  };

  render() {
    return (
      <Checkout
        state={this.props.cartItems.cart.state}
        content="review"
        loggedIn={this.props.loggedIn}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
        forwardTo={() => (true)}
        onLogout={() => (true)}
        onLogin={() => (true)}
      >
        <Review
          cartItems={this.props.cartItems}
          isStoreCredit={this.props.isStoreCredit}
          canUseStoreCredit={this.props.canUseStoreCredit}
          checkoutPayPal={() => (true)}
          checkoutSquare={() => (true)}
          confirmOrder={() => (true)}
          checkoutReset={() => (true)}
          toggleUseCredits={() => (true)}
          makeToggleCreditRequest={() => (true)}
        />
      </Checkout>
    );
  }
}

export default ReviewWrapper;

