import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Shipping from './Shipping';

// Action
import { onLogout } from '../../../actions/user';
import { getAddress, setDefaultAddress } from '../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';
import { forwardTo } from '../../../actions/handler';

const mapStateToProps = ((state) => (
  {
    emailAddress: state.user.emailAddress,
    loggedIn: state.user.loggedIn,
    shipping: state.address.shipping,
    addresses: state.address.addresses,
    messages: state.page.messages,
    isError: state.page.isError
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogout: () => dispatch(onLogout()),
    setDefaultAddress: (data, message) => dispatch(setDefaultAddress(data, message)),
    getAddress: () => dispatch(getAddress()),
    resetMessages: () => dispatch(resetMessages())
  }
));

class ShippingWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    shipping: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    setDefaultAddress: PropTypes.func.isRequired,
    route: PropTypes.object
  };

  componentWillMount = () => {
    if (!this.props.loggedIn) {
      forwardTo('my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
    if (!this.props.shipping.isLoaded || !this.props.addresses.isLoaded) {
      this.props.getAddress();
    }
    if (this.props.shipping.isLoaded &&
        this.props.shipping.isEmpty &&
        this.props.addresses.isLoaded &&
        this.props.addresses.isEmpty) {
      forwardTo('my-account/address/create/shipping');
    }
  };

  componentDidMount = () => {
    const shippingLoaded = this.props.shipping.isLoaded;
    const addressesLoaded = this.props.addresses.isLoaded;
    if (shippingLoaded && addressesLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.shipping.isLoaded && nextProps.addresses.isLoaded) {
      if (nextProps.shipping.isEmpty && nextProps.addresses.isEmpty) {
        forwardTo('my-account/address/create/shipping');
      } else {
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 250);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  onSubmit = (id) => {
    const address = {
      default_ship_address: { id }
    };
    const message = 'Shipping Address updated successfully.';
    this.props.setDefaultAddress(address, message);
  };

  onCancel = () => {
    forwardTo('my-account/dashboard');
  };

  onCreate = () => {
    forwardTo('my-account/address/create/shipping');
  };

  render() {
    if (this.props.shipping.isLoaded && this.props.addresses.isLoaded) {
      return (
        <Shipping
          loggedIn={this.props.loggedIn}
          onLogout={this.props.onLogout}
          address={this.props.shipping.address.id}
          addresses={this.props.addresses.addresses}
          messages={this.props.messages}
          isError={this.props.isError}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          onCreate={this.onCreate}
          breadcrumbs={this.props.route.breadcrumbs}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingWrapper);
