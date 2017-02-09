import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import ViewOrder from './ViewOrder';

import { onLogout } from '../../../actions/user';
import { setHeaderProps, toggleLoader } from '../../../actions/page';
import { getOrder } from '../../../actions/order';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    order: state.orders.order,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    getOrder: (number) => dispatch(getOrder(number)),
    onLogout: () => dispatch(onLogout()),
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
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account',
    };
    this.props.setHeaderProps(props);
    if (!this.props.order.isLoaded) {
      this.props.getOrder(this.props.params.number);
    } else if (this.props.order.order.number !== this.props.params.number) {
      this.props.getOrder(this.props.params.number);
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  handleLogout = (data) => {
    if (data.error) {
      console.log('error');
    } else {
      window.location.href = '/my-account';
    }
  }

  render() {
    // console.log('ORDER', this.props.order);
    if (!this.props.order.isLoaded) {
      return null;
    }
    return (
      <ViewOrder
        loggedIn={this.props.loggedIn}
        onLogout={this.props.onLogout}
        order={this.props.order.order}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderWrapper);
