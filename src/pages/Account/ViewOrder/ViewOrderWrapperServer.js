import React, { PropTypes } from 'react';
import ViewOrder from './ViewOrder';

class ViewOrderWrapper extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      order,
      breadcrumbs
    } = this.props;
    // Only logged in users can get here - so always true
    const loggedIn = true;
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

