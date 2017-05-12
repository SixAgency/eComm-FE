import React, { PropTypes } from 'react';
import Checkout from '../../../components/Checkout';
import Shipping from './Shipping';
import { checkCartState } from '../../../utils/utils';

class ShippingWrapper extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    addresses: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    messages: [],
    isError: false
  };

  render() {
    const expectedState = checkCartState(this.props);
    return (
      <Checkout
        state={this.props.cartItems.cart.state}
        content="shipping"
        isPayPal={this.props.isPayPal}
        loggedIn={this.props.loggedIn}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
        forwardTo={() => (true)}
        onLogout={() => (true)}
        onLogin={() => (true)}
      >
        <Shipping
          editMode={expectedState !== 'checkout/shipping'}
          showForm={expectedState !== 'checkout/shipping'}
          address={this.props.addresses.shipping}
          onSubmit={() => (true)}
          onFieldChange={() => (true)}
          onCancel={() => (true)}
          toggleContent={() => (true)}
          showCancel={expectedState !== 'checkout/shipping'}
        />
      </Checkout>
    );
  }
}

export default ShippingWrapper;

