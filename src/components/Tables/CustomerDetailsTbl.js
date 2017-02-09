import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Tables.css';

class CustomerDetailsTbl extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  }

  render() {
    const order = this.props.order;
    return (
      <table className={s.customerdetails}>
        <tbody>
          <tr className={s.detailsItem}>
            <td className={cx(s.customerdetailstitle, s.firstfield)}>
              Email:
            </td>
            <td className={cx(s.customerdetails, s.firstfield)}>
              {order.email}
            </td>
          </tr>
          <tr className={s.detailsItem}>
            <td className={s.customerdetailstitle}>
              Telephone:
            </td>
            <td className={s.customerdetails}>
              {order.bill_address.phone}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default withStyles(s)(CustomerDetailsTbl);
