import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import ViewOrder from './ViewOrder';

import { onLogout } from '../../../actions/user';
import { setHeaderProps, toggleLoader, resetMessages } from '../../../actions/page';
import { getOrder } from '../../../actions/order';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    order: state.orders.order
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    resetMessages: () => dispatch(resetMessages()),
    getOrder: (number) => dispatch(getOrder(number)),
    onLogout: () => dispatch(onLogout())
  }
));

class ViewOrderWrapper extends BasePageComponent {
  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    getOrder: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    resetMessages: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object
  };

  componentWillMount = () => {
    const { guest_token } = this.props.location.query;
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
    if (!this.props.order.isLoaded) {
      this.props.getOrder(
        {
          number: this.props.params.number,
          guest_token
        }
      );
    } else if (this.props.order.order.number !== this.props.params.number) {
      this.props.getOrder({
        number: this.props.params.number,
        guest_token
      });
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.order.isLoaded &&
      (this.props.params.number === nextProps.order.order.number)) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillUnmount = () => {
    this.props.resetMessages();
    this.props.toggleLoader(true);
  };

  onLogout = (event) => {
    event.preventDefault();
    this.props.onLogout();
  };

  render() {
    const {
      loggedIn,
      order,
      route
    } = this.props;
    if (!order.isLoaded) {
      return null;
    }
    const breadcrumbs = route.breadcrumbs;
    breadcrumbs[1].label = `${breadcrumbs[1].label}${order.order.id}`;
    return (
      <ViewOrder
        loggedIn={loggedIn}
        onLogout={this.onLogout}
        order={order.order}
        breadcrumbs={breadcrumbs}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderWrapper);
