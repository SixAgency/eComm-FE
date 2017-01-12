import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Tables.css';

class CustomerDetailsTbl extends React.Component {
  render() {
    return (
      <table className={s.customerdetails}>
        <tbody>
          <tr className={s.detailsItem}>
            <td className={cx(s.customerdetailstitle, s.firstfield)}>
              Email:
            </td>
            <td className={cx(s.customerdetails, s.firstfield)}>
              whatever@whatever.com
            </td>
          </tr>
          <tr className={s.detailsItem}>
            <td className={s.customerdetailstitle}>
              Telephone:
            </td>
            <td className={s.customerdetails}>
              1232123123123
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default withStyles(s)(CustomerDetailsTbl);

