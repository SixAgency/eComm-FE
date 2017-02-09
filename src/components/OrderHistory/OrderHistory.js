import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderHistory.css';
import OrderRow from './OrderRow';

class OrderHistory extends Component {
  static propTypes = {
    orders: PropTypes.object.isRequired,
  }

  render() {
    const { orders } = this.props.orders;
    if (!orders.isLoaded || orders.isEmpty) {
      return null;
    }
    return (
      <table className={s.shoptable}>
        <thead>
          <tr>
            <th>
              <span className={s.nobr}>
                Order
              </span>
            </th>
            <th>
              <span className={s.nobr}>
                Date
              </span>
            </th>
            <th>
              <span className={s.nobr}>
                Status
              </span>
            </th>
            <th>
              <span className={s.nobr}>
                Total
              </span>
            </th>
            <th>
              <span>&nbsp;</span>
            </th>
          </tr>
        </thead>
        <tbody>
          { orders.orders.orders.map((item, index) => (
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
