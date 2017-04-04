import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './Tables.css';

class OrderDetailsTbl extends PureComponent {
  static propTypes = {
    order: PropTypes.object.isRequired
  };

  render() {
    const { order } = this.props;
    const products = order.line_items;
    const shipment = order.shipments[0];
    const payment = order.payments[0];

    const subTotal = parseFloat(order.item_total) + parseFloat(order.adjustment_total);

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
            { products.map((item, key) => {
              const slug = `/product/${item.variant.slug}`;
              return (
                <tr className={s.orderItem} key={key}>
                  <td className={s.productname}>
                    <Link className={s.orderitem} to={slug}>{item.variant.name}</Link>
                    {item.variant.option_values &&
                      <p className={s.productvariant}>
                        {item.variant.option_values.map((option, index) => (
                          <span key={index} >{option.option_type_presentation}:&nbsp;
                            <strong>{option.presentation} </strong>
                          </span>
                        ))}
                      </p>
                    }
                    <strong className={s.productqty}>× {item.quantity}</strong>
                  </td>
                  <td className={s.producttotal}>
                    <span className={s.amount}>
                      {accounting.formatMoney(item.total)}
                    </span>
                  </td>
                </tr>
              );
            })}
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Subtotal:
              </td>
              <td className={s.orderdetails}>
                {accounting.formatMoney(subTotal)}
              </td>
            </tr>
            {shipment &&
              <tr className={s.orderItem}>
                <td className={cx(s.orderdetailstitle, s.tdbig)}>
                  Shipping:
                </td>
                <td className={s.orderdetails}>
                  {shipment.selected_shipping_rate.cost} via {shipment.selected_shipping_rate.name}
                </td>
              </tr>
            }
            {shipment && shipment.adjustments && shipment.adjustments.map((adjust) => (
              <tr className={s.orderItems}>
                <td className={cx(s.orderdetailstitle, s.tdbig)}>
                  {adjust.label}
                </td>
                <td className={s.orderdetails}>
                  {adjust.amount}
                </td>
              </tr>
            ))}
            {payment &&
              <tr className={s.orderItem}>
                <td className={cx(s.orderdetailstitle, s.tdbig)}>
                  Payment Method:
                </td>
                <td className={s.orderdetails}>
                  {payment.payment_method.name}
                </td>
              </tr>
            }
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Total:
              </td>
              <td className={s.orderdetails}>
                {order.display_total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(OrderDetailsTbl);
