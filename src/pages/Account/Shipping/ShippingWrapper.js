import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Shipping from './Shipping';
// Action
import { onLogout } from '../../../actions/user';
import { getAddress, addAddress } from '../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../actions/page';

const mapStateToProps = ((state) => (
  {
    emailAddress: state.user.emailAddress,
    loggedIn: state.user.loggedIn,
    shipping: state.address.shipping,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    onLogout: () => dispatch(onLogout()),
    addAddress: (data) => dispatch(addAddress(data)),
    getAddress: () => dispatch(getAddress()),
    resetMessages: () => dispatch(resetMessages()),
  }
));
class ShippingWrapper extends React.Component {
  static propTypes = {
    emailAddress: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    shipping: PropTypes.object.isRequired,
    addAddress: PropTypes.func.isRequired,
    getAddress: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    if (!this.props.loggedIn) {
      browserHistory.push('/my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (!this.props.shipping.isLoaded) {
      this.props.getAddress();
    }
  }

  componentDidMount = () => {
    const { isLoaded } = this.props.shipping;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('next');
    const { isLoaded } = nextProps.shipping;
    if (isLoaded) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  }

  onSubmit = (address) => {
    console.log(address);
    const data = {
      address,
      address_type: ['ship_address'],
    }
    this.props.addAddress(data);
  }

  render() {
    const address = this.props.shipping.address || {
      firstname: '',
      lastname: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state_id: 0,
      zipcode: '',
    };
    return (
      <Shipping
        loggedIn={this.props.loggedIn}
        onSubmit={this.onSubmit}
        onLogout={this.props.onLogout}
        emailAddress={this.props.emailAddress}
        shippingAddress={address}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingWrapper);