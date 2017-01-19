import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Tables.css';

class OrderDetailsTbl extends React.Component {
  render() {
    return (
      <div className={s.tablewrprOrder}>
        <table className={cx(s.table, s.tableOrder)}>
          <thead>
            <tr>
              <th className={cx(s.tableheads, s.tdbig)}>PRODUCT</th>
              <th className={cx(s.tableheads, s.tdsmall)}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: Map those in a sepparate component */}
            <tr className={s.orderItem}>
              <td className={s.productname}>
                <a href="">ks Color Head</a>
                <strong className={s.productqty}>× 1</strong>
              </td>
              <td className={s.producttotal}>
                <span className={s.amount}>
                  $79.00
                </span>
              </td>
            </tr>
            <tr className={s.orderItem}>
              <td className={s.productname}>
                <a href="">ks Color Head</a>
                <strong className={s.productqty}>× 1</strong>
              </td>
              <td className={s.producttotal}>
                <span className={s.amount}>
                  $79.00
                </span>
              </td>
            </tr>
            {/* end mapping */}
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Subtotal:
              </td>
              <td className={s.orderdetails}>
                $97.00
              </td>
            </tr>
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Shipping
              </td>
              <td className={s.orderdetails}>
                $15.81 via Ground (UPS), Flat Rate
              </td>
            </tr>
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                New York State Tax:
              </td>
              <td className={s.orderdetails}>
                $8.61
              </td>
            </tr>
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Payment Method:
              </td>
              <td className={s.orderdetails}>
                PayPal Express Checkout
              </td>
            </tr>
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Total:
              </td>
              <td className={s.orderdetails}>
                $121.42
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(OrderDetailsTbl);
