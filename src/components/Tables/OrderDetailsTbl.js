import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import accounting from 'accounting';
import cx from 'classnames';

import s from './Tables.css';

class OrderDetailsTbl extends PureComponent {
  static propTypes = {
    order: PropTypes.object.isRequired
  };

  getPaymentName = (payment) => {
    if (payment.payment_method.name.toLowerCase() === 'square') {
      return `${payment.source.cc_type} ${payment.source.last_digits}`;
    }
    return payment.payment_method.name;
  };

  render() {
    const { order } = this.props;
    const products = order.line_items;
    // const shipment = order.shipments[0];
    const {
      item_total,
      payments,
      adjustments,
      shipments
    } = order;
    const itemTotal = parseFloat(item_total);
    const completedPayments = payments.filter((payment) => payment.state === 'completed');
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
                Item Total:
              </td>
              <td className={s.orderdetails}>
                {accounting.formatMoney(itemTotal)}
              </td>
            </tr>
            {shipments.length &&
              <tr className={s.orderItem}>
                <td className={cx(s.orderdetailstitle, s.tdbig)}>
                  Shipping:
                </td>
                <td className={s.orderdetails}>
                  <table cellSpacing={0} cellPadding={0}>
                    <tbody>
                      {shipments.map((shipment, key) => (
                        <tr key={key}>
                          <td>
                            {shipment.selected_shipping_rate &&
                              `${accounting.formatMoney(shipment.selected_shipping_rate.cost)}
                               via ${shipment.selected_shipping_rate.name}`
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            }
            {adjustments.map((adjust, key) => (
              <tr key={key} className={s.orderItem}>
                <td className={cx(s.orderdetailstitle, s.tdbig)}>
                  {adjust.label}
                </td>
                <td className={s.orderdetails}>
                  {accounting.formatMoney(adjust.amount)}
                </td>
              </tr>
              )
            )}
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Total:
              </td>
              <td className={s.orderdetails}>
                {order.display_total}
              </td>
            </tr>
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Payment{completedPayments.length > 1 ? 's' : ''}:
              </td>
              <td className={s.orderdetails}>
                <table cellSpacing={0} cellPadding={0}>
                  <tbody>
                    {completedPayments.map((payment, key) => (
                      <tr key={key}>
                        <td>
                          {this.getPaymentName(payment)}: {accounting.formatMoney(payment.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(OrderDetailsTbl);
