import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderHistory.css';
import OrderRow from './OrderRow';

class OrderHistory extends Component {
  render() {
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
          <OrderRow />
        </tbody>
      </table>
    );
  }
}

export default withStyles(s)(OrderHistory);
