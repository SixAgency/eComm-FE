import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './Tables.css';
import { STATES } from '../../constants/AppConsts';

class ReviewOrderTbl extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    creditInfo: PropTypes.object.isRequired,
    toggleUseCredits: PropTypes.func.isRequired,
    useCredits: PropTypes.bool.isRequired
  };

  getStateName = (id) => {
    const selected = STATES.find((state) => (state.id === id));
    return typeof selected !== 'undefined' ? selected.abbr : '';
  };

  getPrice = (item) => {
    if (item.adjustments.length === 1) {
      return parseFloat(item.price) + parseFloat(item.adjustments[0].amount);
    }
    return item.price;
  };

  listAddress = (data) => {
    const stateName = this.getStateName(data.state_id);
    return (
      <address className={s.optiontext}>
        <span className={s.block}>{data.firstname} {data.lastname}</span>
        <span className={s.block}>{data.company}</span>
        <span className={s.block}>{data.address1}</span>
        <span className={s.block}>{data.city}, {stateName}, {data.zipcode}</span>
      </address>
    );
  };

  render() {
    const {
      cart: {
        shipments,
        adjustments,
        line_items,
        item_total,
        order_total_after_store_credit,
        adjustment_total,
        total_applicable_store_credit
      },
      cartItems,
      creditInfo
    } = this.props;

    const subTotal = parseFloat(item_total) + parseFloat(adjustment_total);
    return (
      <div className={s.tablewrpr}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.tableheads}>PRODUCT</th>
              <th className={s.tableheads}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {line_items.map((item, index) => (
              <tr key={index}>
                <td className={cx(s.td, s.tdbig, s.pname)}>
                  {item.variant.name}&nbsp;
                  <strong className={s.qty}>× {item.quantity}</strong>
                </td>
                <td className={cx(s.td, s.tdsmall, s.ptotal)}>
                  {accounting.formatMoney(this.getPrice(item))}
                </td>
              </tr>
              ),
            )}
          </tbody>
          <tfoot className={s.infocontainer}>
            <tr>
              <td className={cx(s.td, s.tdbig, s.psubtotal)}>Subtotal</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.amount}>
                  {accounting.formatMoney(subTotal)}
                </span>
              </td>
            </tr>
            {shipments.map((ship, index) => (
              <tr key={index}>
                <td className={cx(s.td, s.tdbig, s.pshipping)}>
                  Shipping {index > 0 ? index + 1 : ''}
                </td>
                <td className={cx(s.td, s.tdsmall, s.flatrate)}>
                  {ship.shipping_rates[0].name}:
                  <span className={s.amount}>
                    {accounting.formatMoney(ship.shipping_rates[0].cost)}
                  </span>
                </td>
              </tr>
              )
            )}
            {adjustments.map((adjust, key) => (
              <tr key={key} >
                <td className={cx(s.td, s.tdbig, s.pshipping)}>
                  {adjust.label}
                </td>
                <td className={cx(s.td, s.tdsmall, s.flatrate)}>
                  {accounting.formatMoney(adjust.amount)}
                </td>
              </tr>
              )
            )}
            {this.props.useCredits &&
              <tr>
                <td className={cx(s.td, s.tdbig, s.psubtotal)}>Store Credit</td>
                <td className={cx(s.td, s.tdsmall)}>
                  <span className={s.amount}>
                    {accounting.formatMoney(total_applicable_store_credit)}
                  </span>
                </td>
              </tr>
            }
            <tr>
              <td className={cx(s.td, s.tdbig, s.ptotal2)}>Total</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.total}>
                  {accounting.formatMoney(order_total_after_store_credit)}
                </span>
              </td>
            </tr>
            {
              creditInfo.isLoaded && creditInfo.totalAmount !== 0 &&
              <tr>
                <td colSpan={2} className={cx(s.td, s.tdsmall, s.creditinfo)}>
                  <label htmlFor="use_credits">
                    I have <em>{accounting.formatMoney(creditInfo.totalAmount)}</em> store credit,
                    I want to use it on this purchase
                  </label>
                  <input
                    type="checkbox"
                    id="use_credits"
                    checked={this.props.useCredits}
                    onChange={this.props.toggleUseCredits}
                  />
                </td>
              </tr>
            }
            <tr>
              <td className={cx(s.td, s.tdbig, s.shipaddr)}>
                <span className={s.shippaddress}>Shipping address</span>
                {this.listAddress(cartItems.cart.ship_address)}
                {!this.props.isPayPal && <Link
                  className={s.changeshipping}
                  to="/checkout/shipping"
                >
                  Change
                </Link>}
              </td>
              <td className={cx(s.td, s.tdsmall, s.billaddr)}>
                <span className={s.billaddress}>Billing address</span>
                {this.listAddress(cartItems.cart.bill_address)}
                {!this.props.isPayPal && <Link
                  className={s.changebilling}
                  to="/checkout/billing"
                >
                  Change
                </Link>}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrderTbl);
