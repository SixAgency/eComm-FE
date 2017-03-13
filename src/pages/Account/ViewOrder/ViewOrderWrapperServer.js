import React, { PropTypes } from 'react';
import ViewOrder from './ViewOrder';

class ViewOrderWrapper extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  static defaultProps = {
    onLogout: () => (true)
  };

  render() {
    return (
      <ViewOrder
        order={this.props.order.order}
        onLogout={this.props.onLogout}
        loggedIn={this.props.loggedIn}
      />
    );
  }
}

export default ViewOrderWrapper;

