import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// Components
import BasePageComponent from '../../BasePageComponent';
import ManageAddresses from './ManageAddresses';
// Actions
import { toggleLoader, setHeaderProps, resetMessages } from '../../../actions/page';
import { onLogout } from '../../../actions/user';
import { getAddress,
  deleteAddress,
  setDefaultShipping,
  setDefaultBilling,
  editAddress } from '../../../actions/address';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    addresses: state.address.addresses,
    billing: state.address.billing,
    shipping: state.address.shipping
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    getAddress: () => dispatch(getAddress()),
    onLogout: () => dispatch(onLogout()),
    deleteAddress: (id) => dispatch(deleteAddress(id)),
    setDefaultShipping: (data, message) => dispatch(setDefaultShipping(data, message)),
    setDefaultBilling: (data, message) => dispatch(setDefaultBilling(data, message)),
    resetMessages: () => dispatch(resetMessages()),
    editAddress: (data) => dispatch(editAddress(data))
  }
));

class ManageAddressesWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    addresses: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    setDefaultShipping: PropTypes.func.isRequired,
    setDefaultBilling: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    editAddress: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    window.scrollTo(0, 0);
    if (!this.props.loggedIn) {
      browserHistory.push('/my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
    this.props.getAddress();
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillUnmount = () => {
    this.props.resetMessages();
    this.props.toggleLoader(true);
  };

  onLogout = (event) => {
    event.preventDefault();
    this.props.onLogout();
  };

  render() {
    return (
      <ManageAddresses
        loggedIn={this.props.loggedIn}
        addresses={this.props.addresses}
        onLogout={this.onLogout}
        billing={this.props.billing}
        shipping={this.props.shipping}
        deleteAddress={this.props.deleteAddress}
        setDefaultShipping={this.props.setDefaultShipping}
        setDefaultBilling={this.props.setDefaultBilling}
        editAddress={this.props.editAddress}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddressesWrapper);
