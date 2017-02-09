import React, { PropTypes } from 'react';
import ViewOrder from './ViewOrder';

class ViewOrderWrapper extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ViewOrder order={this.props.order.order} />
    );
  }
}

export default ViewOrderWrapper;

