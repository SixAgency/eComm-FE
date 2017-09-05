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
        content="billing"
        loggedIn={this.props.loggedIn}
        breadcrumbs={this.props.breadcrumbs}
        messages={this.props.messages}
        isError={this.props.isError}
        forwardTo={() => (true)}
        onLogout={() => (true)}
        onLogin={() => (true)}
      >
        <Billing
          editMode={expectedState !== 'checkout/billing'}
          showForm={expectedState !== 'checkout/billing'}
          address={this.props.addresses.billing}
          onSubmit={() => (true)}
          onFieldChange={() => (true)}
          onCancel={() => (true)}
          toggleContent={() => (true)}
          showCancel={expectedState !== 'checkout/billing'}
        />
      </Checkout>
    );
  }
}

export default BillingWrapper;

