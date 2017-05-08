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
  editAddress,
  createAddressNew } from '../../../actions/address';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    emailAddress: state.user.profile.email,
    addresses: state.address.addresses,
    billing: state.address.billing,
    shipping: state.address.shipping,
    isError: state.page.isError,
    messages: state.page.messages
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
    editAddress: (data, message, callback) => dispatch(editAddress(
      data,
      message,
      callback
    )),
    createAddress: (data, message, callback) => dispatch(createAddressNew(
      data,
      message,
      callback
    ))
  }
));

class ManageAddressesWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    emailAddress: PropTypes.string.isRequired,
    addresses: PropTypes.object.isRequired,
    getAddress: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    setDefaultShipping: PropTypes.func.isRequired,
    setDefaultBilling: PropTypes.func.isRequired,
    editAddress: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    route: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      display: 'list'
    };
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
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillUnmount = () => {
    this.props.resetMessages();
    this.props.toggleLoader(true);
  };

  handleDisplay = (content) => {
    this.setState({ display: content });
  };

  onLogout = (event) => {
    event.preventDefault();
    this.props.onLogout();
  };

  onFormSubmit = (address) => {
    const data = {
      address
    };
    const message = 'Address updated successfully';
    this.props.editAddress(data, message, () => {
      this.setState({ display: 'list' });
    });
  };

  render() {
    return (
      <ManageAddresses
        loggedIn={this.props.loggedIn}
        emailAddress={this.props.emailAddress}
        addresses={this.props.addresses}
        onLogout={this.onLogout}
        billing={this.props.billing}
        shipping={this.props.shipping}
        deleteAddress={this.props.deleteAddress}
        setDefaultShipping={this.props.setDefaultShipping}
        setDefaultBilling={this.props.setDefaultBilling}
        editAddress={this.props.editAddress}
        onSubmit={this.onFormSubmit}
        display={this.state.display}
        handleDisplay={this.handleDisplay}
        messages={this.props.messages}
        isError={this.props.isError}
        resetMessages={this.props.resetMessages}
        breadcrumbs={this.props.route.breadcrumbs}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddressesWrapper);
