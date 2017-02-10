import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BasePageComponent from '../../../BasePageComponent';
import CreateAddress from './Create';

// Action
import { onLogout } from '../../../../actions/user';
import { createAddressNew } from '../../../../actions/address';
import { setHeaderProps, resetMessages, toggleLoader } from '../../../../actions/page';

const mapStateToProps = ((state) => (
  {
    emailAddress: state.user.emailAddress,
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    onLogout: () => dispatch(onLogout()),
    createAddress: (address) => dispatch(createAddressNew(address)),
    resetMessages: () => dispatch(resetMessages()),
  }
));

class CreateAddressWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    emailAddress: PropTypes.string.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  componentWillMount = () => {
    if (!this.props.loggedIn) {
      browserHistory.push('/my-account');
    }
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    const isError = nextProps.isError;
    if (isError) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    // this.props.resetMessages();
  };

  onSubmit = (address) => {
    this.props.createAddress(address);
  };

  onCancel = () => {
    browserHistory.goBack();
  };

  render() {
    const address = {
      id: 0,
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
      <CreateAddress
        loggedIn={this.props.loggedIn}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onLogout={this.props.onLogout}
        emailAddress={this.props.emailAddress}
        address={address}
        messages={this.props.messages}
        isError={this.props.isError}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAddressWrapper);
