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
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    messages: [],
    isError: false
  };

  /**
   * Returns the customer email address used in order
   * @returns {string}
   */
  getEmailAddress = () => {
    const { cartItems } = this.props;
    return cartItems.cart.email || '';
  };

  render() {
    const expectedState = checkCartState(this.props);
    const mockTrue = true;
    const mockFalse = false;
    return (
      <Checkout
        state={this.props.cartItems.cart.state}
        content="shipping"
        loggedIn={this.props.loggedIn}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
        forwardTo={() => (true)}
        onLogout={() => (true)}
        onLogin={() => (true)}
      >
        <Shipping
          loggedIn={this.props.loggedIn}
          address={this.props.addresses.shipping}
          email={this.getEmailAddress()}
          editMode={expectedState !== 'checkout/shipping'}
          showCancel={expectedState !== 'checkout/shipping'}
          password={''}
          passwordValid={mockTrue}
          showRegister={mockFalse}
          onFieldChange={() => (true)}
          onSubmit={() => (true)}
          onPassChange={() => (true)}
          onRegisterCheck={() => (true)}
          onCancel={() => (true)}
        />
      </Checkout>
    );
  }
}

export default ShippingWrapper;

