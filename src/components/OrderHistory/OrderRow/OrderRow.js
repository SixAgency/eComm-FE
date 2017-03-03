import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import s from './OrderRow.css';
// helpers
import { getOrderStatus } from '../../../utils/utils';

class OrderRow extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired
  }

  render() {
    const order = this.props.order;
    const orderLink = `/my-account/view-order/${order.id}`;
    return (
      <tr className={s.order}>
        <td className={s.ordernumber}>
          <a
            href={orderLink}
            className={s.orderlink}
          >
            #{order.id}
          </a>
        </td>
        <td className={s.orderdate}>
          {moment(order.created_at).format('MMMM DD YYYY')}
        </td>
        <td className={s.orderstatus}>
          {getOrderStatus(order.state, order.has_refunds, order.shipment_state)}
        </td>
        <td className={s.ordertotal}>
          <span className={s.amount}> {order.display_total} </span>
          for {order.line_items.length} items
        </td>
        <td className={s.viewlinkwrpr}>
          <a
            href={orderLink}
            className={s.viewlink}
          >
            View
          </a>
        </td>
      </tr>
    );
  }
}

export default withStyles(s)(OrderRow);
