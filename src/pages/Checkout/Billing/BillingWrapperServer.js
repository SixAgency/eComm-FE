import React, { PropTypes } from 'react';
import Checkout from '../../../components/Checkout';
import Billing from './Billing';
import { checkCartState } from '../../../utils/utils';

class BillingWrapper extends React.Component {

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
        content="billing"
        isPayPal={this.props.isPayPal}
        loggedIn={this.props.loggedIn}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
        forwardTo={() => (true)}
        onLogout={() => (true)}
        onLogin={() => (true)}
      >
        <Billing
          loggedIn={this.props.loggedIn}
          address={this.props.addresses.billing}
          email={this.getEmailAddress()}
          editMode={expectedState !== 'checkout/billing'}
          showCancel={expectedState !== 'checkout/billing'}
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

export default BillingWrapper;

