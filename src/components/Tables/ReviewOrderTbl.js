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

class ReviewOrderTbl extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired,
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

  checkCartContent = (arr) => (
    arr.filter((item) => (item.variant.name !== 'E-Gift certificates'))
  );

  render() {
    const {
      cart: {
        shipments,
        adjustments,
        line_items,
        item_total,
        display_total_available_store_credit,
        total,
        state
      },
      cartItems
    } = this.props;
    const itemTotal = Number(item_total);
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
              <td className={cx(s.td, s.tdbig, s.psubtotal)}>Item Total</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.amount}>
                  {accounting.formatMoney(itemTotal)}
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
            <tr>
              <td className={cx(s.td, s.tdbig, s.ptotal2)}>Subtotal</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.amount}>
                  {accounting.formatMoney(total)}
                </span>
              </td>
            </tr>
            {this.props.useCredits &&
              <tr>
                <td className={cx(s.td, s.tdbig, s.psubtotal)}>Store Credit</td>
                <td className={cx(s.td, s.tdsmall)}>
                  <span className={s.amount}>
                    -{accounting.formatMoney(calculateApplicableCredit(this.props))}
                  </span>
                </td>
              </tr>
            }
            {this.props.useCredits &&
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
              <td className={cx(s.td, s.tdbig, s.ptotal2)}>Total</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.total}>
                  {accounting.formatMoney(calculateTotal(this.props))}
                </span>
              </td>
            </tr>
            {
              state !== 'confirm' &&
              Number(display_total_available_store_credit.slice(1)) > 0 &&
              <tr>
                <td colSpan={2} className={cx(s.td, s.tdsmall, s.creditinfo)}>
                  <label htmlFor="use_credits">
                    I have <em>{accounting.formatMoney(
                      display_total_available_store_credit.slice(1)
                    )}</em> store credit, I want to use it on this purchase
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
          </tfoot>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrderTbl);
