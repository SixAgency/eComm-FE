import React, { PropTypes } from 'react';
import ViewOrder from './ViewOrder';

class ViewOrderWrapper extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      order,
      breadcrumbs,
      loggedIn
    } = this.props;
    return (
      <ViewOrder
        order={order.order}
        breadcrumbs={breadcrumbs}
        loggedIn={loggedIn}
        onLogout={() => (true)}
      />
    );
  }
}

export default ViewOrderWrapper;

