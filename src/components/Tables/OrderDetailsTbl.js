import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import accounting from 'accounting';
import cx from 'classnames';
import filterShipments from '../../helpers/shipping';

import s from './Tables.css';

class OrderDetailsTbl extends PureComponent {
  static propTypes = {
    order: PropTypes.object.isRequired
  };

  getPaymentName = (payment) => {
    if (payment.source_type === 'Spree::CreditCard') {
      if (payment.source.cc_type === 'visa') {
        return `Visa ${payment.source.last_digits}`;
      } else if (payment.source.cc_type === 'american_express') {
        return `American Express ${payment.source.last_digits}`;
      }
      return `${payment.source.cc_type} ${payment.source.last_digits}`;
    }
    return payment.payment_method.name;
  };

  getBulkDiscount = (item) => {
    const discount = item.adjustments.find((adj) => (adj.label.indexOf('BULK') !== -1));
    if (discount) {
      return `(You save ${accounting.formatMoney(-discount.amount)})`;
    }
    return '';
  };

  getPriceWithDiscount = (item) => {
    const discount = item.adjustments.find((adj) => (adj.label.indexOf('BULK') !== -1));
    if (discount) {
      return (item.price * item.quantity) + parseFloat(discount.amount);
    }
    return item.price * item.quantity;
  };

  getItemTotal = () => {
    const { order } = this.props;
    const total = parseFloat(order.item_total) - parseFloat(order.additional_tax_total);
    return total + parseFloat(order.adjustment_total);
  };

  render() {
    const { order } = this.props;
    const products = order.line_items;
    const {
      payments,
      shipments
    } = order;
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
                    {accounting.formatMoney(this.getPriceWithDiscount(item))}
                    <span className={s.save}>
                      {this.getBulkDiscount(item)}
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
                {accounting.formatMoney(this.getItemTotal())}
              </td>
            </tr>
            {shipments.length &&
              <tr className={s.orderItem}>
                <td className={cx(s.orderdetailstitle, s.tdbig)}>
                  {filterShipments(shipments).length !== 0 && 'Shipping:'}
                </td>
                <td className={s.orderdetails}>
                  <table cellSpacing={0} cellPadding={0}>
                    <tbody>
                      {filterShipments(shipments).map((shipment, key) => (
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
            <tr className={s.orderItem}>
              <td className={cx(s.orderdetailstitle, s.tdbig)}>
                Tax:
              </td>
              <td className={s.orderdetails}>
                {accounting.formatMoney(order.tax_total)}
              </td>
            </tr>
            {/* adjustments.map((adjust, key) => (
              <tr key={key} className={s.orderItem}>
                <td className={cx(s.orderdetailstitle, s.tdbig)}>
                  {adjust.label}
                </td>
                <td className={s.orderdetails}>
                  {accounting.formatMoney(adjust.amount)}
                </td>
              </tr>
              )
            ) */}
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
