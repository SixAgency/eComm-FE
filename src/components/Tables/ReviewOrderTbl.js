import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './Tables.css';
import { STATES } from '../../constants/AppConsts';
import {
  calculateApplicableCredit,
  calculateTotal,
  calculateBalance
} from '../../utils/utils';

import getShipmentsWithoutGiftcard from '../../helpers/shipping';

class ReviewOrderTbl extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    toggleUseCredits: PropTypes.func.isRequired,
    isStoreCredit: PropTypes.bool.isRequired,
    canUseStoreCredit: PropTypes.bool.isRequired
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

  getPriceWithoutTax = (item) => {
    const tax = item.adjustments.find((adj) => (adj.source_type.indexOf('TaxRate') !== -1));
    if (tax) {
      return item.total - tax.amount;
    }
    return item.total;
  };

  getBulkDiscount = (item) => {
    const discount = item.adjustments.find((adj) => (adj.label.indexOf('BULK') !== -1));
    if (discount) {
      return `(You save ${accounting.formatMoney(-discount.amount)})`;
    }
    return '';
  };

  getItemTotal = () => {
    const cart = this.props.cart;
    let total = parseFloat(cart.item_total) + parseFloat(cart.adjustment_total);
    total -= parseFloat(cart.additional_tax_total);
    cart.adjustments.forEach((adj) => {
      if (adj.label.indexOf('Promotion') !== -1) {
        total -= parseFloat(adj.amount);
      }
    });
    return total;
  };

  checkCartContent = (arr) => (
    arr.filter((item) => (item.variant.name !== 'E-Gift certificates'))
  );

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
        state,
        display_total_available_store_credit
      },
      cartItems,
      isStoreCredit,
      canUseStoreCredit
    } = this.props;
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
                  {accounting.formatMoney(this.getPriceWithoutTax(item))}
                  <span className={s.save}>
                    {this.getBulkDiscount(item)}
                  </span>
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
                  {accounting.formatMoney(this.getItemTotal())}
                </span>
              </td>
            </tr>
            {adjustments.map((adjust, key) => (
              <tr key={key} >
                <td className={cx(s.td, s.tdbig, s.pshipping)}>
                  {adjust.label}
                </td>
                <td className={cx(s.td, s.tdsmall, s.flatrate)}>
                  -{accounting.formatMoney(-adjust.amount)}
                </td>
              </tr>
              )
            )}
            {getShipmentsWithoutGiftcard(shipments).map((ship, index) => (
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
            <tr>
              <td className={cx(s.td, s.tdbig, s.ptotal2)}>
                Tax
              </td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.amount}>
                  {accounting.formatMoney(cartItems.cart.tax_total)}
                </span>
              </td>
            </tr>
            <tr>
              <td className={cx(s.td, s.tdbig, s.ptotal2)}>Total</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.total}>
                  {accounting.formatMoney(calculateTotal(this.props))}
                </span>
              </td>
            </tr>
            {isStoreCredit &&
              <tr>
                <td className={cx(s.td, s.tdbig, s.psubtotal)}>E-Gift Card</td>
                <td className={cx(s.td, s.tdsmall)}>
                  <span className={s.amount}>
                    -{accounting.formatMoney(calculateApplicableCredit(this.props))}
                  </span>
                </td>
              </tr>
            }
            {isStoreCredit &&
              <tr>
                <td className={cx(s.td, s.tdbig, s.psubtotal)}>Remaining Balance</td>
                <td className={cx(s.td, s.tdsmall)}>
                  <span className={s.amount}>
                    {accounting.formatMoney(calculateBalance(this.props))}
                  </span>
                </td>
              </tr>
            }
            <tr>
              <td
                className={cx(
                  s.td,
                  s.tdbig,
                  s.shipaddr,
                  s[this.checkCartContent(line_items).length === 0 ? 'hide' : 'show']
                )}
              >
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
            {state !== 'confirm' && canUseStoreCredit &&
              (<tr>
                <td colSpan={2} className={cx(s.td, s.tdsmall, s.creditinfo)}>
                  <label htmlFor="use_credits">
                    Please use my E-gift card balance of <em>{accounting.formatMoney(
                    display_total_available_store_credit.slice(1)
                  )}</em> for this purchase
                  </label>
                  <input
                    type="checkbox"
                    id="use_credits"
                    checked={isStoreCredit}
                    onChange={this.props.toggleUseCredits}
                  />
                </td>
              </tr>)
            }
          </tfoot>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrderTbl);
