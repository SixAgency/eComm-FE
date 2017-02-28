import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// Components
import BasePageComponent from '../../BasePageComponent';
import EditAddresses from './EditAddresses';
// Actions
import { toggleLoader, setHeaderProps } from '../../../actions/page';
import { onLogout } from '../../../actions/user';
import { getAddress } from '../../../actions/address';

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
    onLogout: () => dispatch(onLogout()),
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    getAddress: () => dispatch(getAddress())
  }
));

class EditAddressesWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    getAddress: PropTypes.func.isRequired
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
    this.props.toggleLoader(true);
  };

  onLogout = (event) => {
    event.preventDefault();
    this.props.onLogout();
  };

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    addresses: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired
  };

  render() {
    console.log('WRAPPER ADDRESSES', this.props.addresses);
    return (
      <EditAddresses
        onLogout={this.onLogout}
        loggedIn={this.props.loggedIn}
        addresses={this.props.addresses}
        shipping={this.props.shipping}
        billing={this.props.billing}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAddressesWrapper);
