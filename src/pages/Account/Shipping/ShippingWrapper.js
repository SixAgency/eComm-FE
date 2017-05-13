import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import Shipping from './Shipping';

// Utils
import { scrollToTop } from '../../../utils/utils';

// Action
import { checkUser, onLogout } from '../../../actions/user';
import { getAddresses, setAddresses } from '../../../actions/user_address';
import { setHeaderProps, setMessage, resetMessages, toggleLoader } from '../../../actions/page';
import { forwardTo } from '../../../actions/handler';

class ShippingWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    addresses: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    errors: PropTypes.array.isRequired,
    getInitialData: PropTypes.func.isRequired,
    setAddresses: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    route: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { ...props.addresses.shipping };
  }

  componentWillMount = () => {
    scrollToTop(500);
    const headerProps = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(headerProps);
  };

  componentDidMount = () => {
    this.props.getInitialData();
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.addresses.isFetching) {
      this.props.toggleLoader(true);
    } else if (nextProps.addresses.isFetched) {
      if (!nextProps.isError) {
        this.setState(nextProps.addresses.shipping);
      }
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
  };

  onSubmit = (event) => {
    event.preventDefault();
    scrollToTop(500);
    const { billing } = this.props.addresses;
    const addressTypes = ['ship_address'];
    if (billing.id === 0) {
      addressTypes.push('bill_address');
    }
    this.props.resetMessages();
    this.props.setAddresses({
      address: this.state,
      addressTypes,
      messages: ['Shipping address updated.']
    });
  };

  onCancel = () => {
    this.props.resetMessages();
    forwardTo('my-account/dashboard');
  };

  onFieldChange = (key, value) => {
    const obj = {};
    if (key === 'state') {
      obj[key] = parseInt(value, 10);
    } else {
      obj[key] = value;
    }
    this.setState(obj);
  };

  getErrorMessage = (props) => {
    const { messages, errors } = props;
    return [...messages, ...errors];
  };

  render() {
    return (
      <Shipping
        address={this.state}
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        messages={this.getErrorMessage(this.props)}
        isError={this.props.isError}
        breadcrumbs={this.props.route.breadcrumbs}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onFieldChange={this.onFieldChange}
        forwardTo={forwardTo}
      />
    );
  }
}
const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    addresses: state.user_address,
    messages: state.page.messages,
    errors: state.user_address.messages,
    isError: (state.page.isError || state.user_address.isError)
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    onLogout: () => dispatch(onLogout()),
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages()),
    setMessage: (props) => dispatch(setMessage(props)),
    setAddresses: (props) => dispatch(setAddresses(props)),
    getInitialData: () => {
      dispatch(checkUser(() => dispatch(getAddresses()), 'my-account'));
    }
  }
));
export default connect(mapStateToProps, mapDispatchToProps)(ShippingWrapper);
