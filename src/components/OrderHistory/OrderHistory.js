import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderHistory.css';
import OrderRow from './OrderRow';

class OrderHistory extends Component {
  static propTypes = {
    orders: PropTypes.object.isRequired
  };

  render() {
    return (
      <table className={s.shoptable}>
        <thead>
          <tr>
            <th className={s.nobr}>
              Order
            </th>
            <th className={s.nobr}>
              Date
            </th>
            <th className={s.nobr}>
              Status
            </th>
            <th className={s.nobr}>
              Total
            </th>
            <th>
              <span>&nbsp;</span>
            </th>
          </tr>
        </thead>
        <tbody>
          { this.props.orders.orders.map((item, index) => (
            <OrderRow
              key={index}
              order={item}
            />
            ),
          )}
        </tbody>
      </table>
    );
  }
}

export default withStyles(s)(OrderHistory);
