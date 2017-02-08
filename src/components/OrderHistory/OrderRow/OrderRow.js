import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderRow.css';

class OrderRow extends Component {
  render() {
    return (
      <tr className={s.order}>
        <td className={s.ordernumber}>
          <a
            href=""
            className={s.orderlink}
          >
            #1027
          </a>
        </td>
        <td className={s.orderdate}>
          <time>
            January 4, 2017
          </time>
        </td>
        <td className={s.orderstatus}>
          Processing
        </td>
        <td className={s.ordertotal}>
          <span className={s.amount}> $18.99 </span>
          for 8 items
        </td>
        <td className={s.viewlinkwrpr}>
          <a
            href=""
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
